// api/mensajes.js
import { json } from '@vercel/remix';

// Simulamos una "base de datos" en memoria
let mensajes = [];

export async function POST(request) {
  const { texto } = await request.json();
  
  if (!texto || typeof texto !== 'string') {
    return json({ error: 'Mensaje inválido' }, { status: 400 });
  }

  mensajes.push(texto);
  // Mantener solo los últimos 50 mensajes
  if (mensajes.length > 50) {
    mensajes = mensajes.slice(-50);
  }

  return json({ success: true }, { status: 200 });
}

export async function GET() {
  return json(mensajes, { status: 200 });
}
