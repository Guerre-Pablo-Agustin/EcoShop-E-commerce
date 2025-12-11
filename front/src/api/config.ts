// src/api/config.ts
export const API_BASE_URL = import.meta.env.VITE_API_BASE || '';

console.log("API_BASE_URL",API_BASE_URL);
console.log('🌍 Modo:', import.meta.env.MODE); // "development" o "production"
console.log('🔗 API URL:', import.meta.env.VITE_API_BASE_URL);
console.log('🔧 DEV:', import.meta.env.DEV); // true en desarrollo
console.log('📦 PROD:', import.meta.env.PROD); // true en producción