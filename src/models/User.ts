// src/models/User.ts

import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  nomeCompleto: {
    type: String,
    required: [true, 'O nome é obrigatório.'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'O email é obrigatório.'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  senha: {
    type: String,
    required: [true, 'A senha é obrigatória.'],
    minlength: 6,
  },
  plano: {
    type: String,
    enum: ['mensal', 'anual', null],
    default: null,
  },
  paymentStatus: {
    type: String,
    enum: ['PENDING_REVIEW', 'CONFIRMED', 'NONE'],
    default: 'NONE',
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
}, { 
  timestamps: true // Adiciona campos createdAt e updatedAt
});

// Reutiliza o modelo se já existir para evitar recompilação
export default mongoose.models.User || mongoose.model('User', UserSchema);