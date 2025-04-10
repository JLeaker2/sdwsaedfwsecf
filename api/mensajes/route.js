// api/mensajes/route.js (para App Router)
import { NextResponse } from 'next/server';

// Base de datos en memoria (volátil)
let mensajes = [];

export async function POST(request) {
  try {
    const { texto } = await request.json();
    
    if (!texto || typeof texto !== 'string') {
      return NextResponse.json(
        { error: 'Mensaje inválido' }, 
        { status: 400 }
      );
    }

    mensajes.push(texto);
    // Mantener solo los últimos 50 mensajes
    if (mensajes.length > 50) mensajes.shift();

    return NextResponse.json(
      { success: true, mensaje: texto },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(mensajes.reverse(), { status: 200 });
}
