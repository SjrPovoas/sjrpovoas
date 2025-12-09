import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rotas que exigem autenticação de USUÁRIO comum
const PROTECTED_ROUTES = ['/dashboard'];

// Rotas que exigem autenticação de ADMINISTRADOR
// Inclui rotas raiz (/admin) e páginas internas (/admin/dashboard, /admin/pagamentos)
const ADMIN_ROUTES = ['/admin', '/admin/dashboard', '/admin/pagamentos'];

/**
 * Função principal do Proxy, executada antes de cada rota correspondente no matcher.
 */
export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Lê o token do Cookie que foi definido no LoginForm com path: '/'
  const token = request.cookies.get('userToken')?.value;

  // Variáveis de checagem
  const isProtected = PROTECTED_ROUTES.some(route => path.startsWith(route));
  const isAdminRoute = ADMIN_ROUTES.some(route => path.startsWith(route));
  
  // ----------------------------------------------------------------------
  // 1. EXCEÇÃO: Páginas de LOGIN devem ser acessíveis
  // ----------------------------------------------------------------------
  const isLoginPage = path === '/login';
  const isAdminLoginPage = path === '/admin/login';
  
  if (isLoginPage || isAdminLoginPage) {
    if (token) {
        // Se o usuário está logado, redireciona para o dashboard apropriado
        const redirectTo = token.startsWith('ADMIN_JWT') ? '/admin/dashboard' : '/dashboard';
        
        console.log(`[PROXY] Já logado. Redirecionando para ${redirectTo}.`);
        return NextResponse.redirect(new URL(redirectTo, request.url));
    }
    // Permite acesso à página de login se não houver token.
    console.log(`[PROXY] Permitindo acesso a ${path}.`);
    return NextResponse.next();
  }


  // ----------------------------------------------------------------------
  // 2. REGRA: Bloquear acesso a Rotas Protegidas/Admin se NÃO houver Token
  // ----------------------------------------------------------------------
  if (isProtected || isAdminRoute) {
    if (!token) {
      // Determina para onde redirecionar com base no tipo de rota que tentou acessar
      const redirectTo = isAdminRoute ? '/admin/login' : '/login'; 
      
      console.log(`[PROXY] Token ausente. Acesso negado a ${path}. Redirecionando para ${redirectTo}.`);
      return NextResponse.redirect(new URL(redirectTo, request.url));
    }
    
    // ----------------------------------------------------------------------
    // 3. REGRA: Checagem de Autorização (Token Admin vs. Rota Admin)
    // ----------------------------------------------------------------------
    if (isAdminRoute && !token.startsWith('ADMIN_JWT')) {
        // Se o token existe, mas não é de administrador, e está tentando acessar rota admin
        console.log(`[PROXY] Acesso negado: Token comum tentando rota admin (${path}).`);
        return NextResponse.redirect(new URL('/', request.url)); // Redireciona para Home ou outra página de erro
    }
    
    // Se chegou aqui, o token é válido e tem a permissão correta para a rota.
    console.log(`[PROXY] Token OK. Permitindo acesso a ${path}.`);
    return NextResponse.next();
  }
  
  // ----------------------------------------------------------------------
  // 4. ROTAS PÚBLICAS (Qualquer outra rota que não está no matcher)
  // ----------------------------------------------------------------------
  console.log(`[PROXY] Rota pública (${path}). Permitindo acesso.`);
  return NextResponse.next();
}

/**
 * Configuração que define quais rotas o Proxy deve monitorar.
 * O /:path* garante que todas as subrotas sejam monitoradas.
 */
export const config = {
  matcher: [
    '/', 
    '/login',
    '/admin/login',
    '/dashboard/:path*', 
    '/admin/:path*'
  ],
};