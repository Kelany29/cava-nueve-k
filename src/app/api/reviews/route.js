import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

// ==========================================
// MÓDULO GET: Para leer todas las reseñas
// ==========================================
export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      orderBy: {
        createdAt: "desc", // Las más recientes arriba
      },
    });
    return NextResponse.json(reviews, { status: 200 });
  } catch (error) {
    console.error("Error al obtener reseñas:", error);
    return NextResponse.json(
      { error: "Error al cargar los comentarios" },
      { status: 500 },
    );
  }
}

// ==========================================
// MÓDULO POST: Para que un cliente deje su opinión
// ==========================================
export async function POST(request) {
  try {
    const body = await request.json();
    const { userName, content, rating } = body;

    // Validación básica de seguridad
    if (!userName || !content || !rating) {
      return NextResponse.json(
        {
          error:
            "Faltan datos. Nombre, comentario y calificación son obligatorios.",
        },
        { status: 400 },
      );
    }

    // Guardamos la reseña en la base de datos
    const newReview = await prisma.review.create({
      data: {
        userName: userName,
        content: content,
        rating: Number(rating), // Nos aseguramos de que las estrellas sean un número
      },
    });

    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    console.error("Error al guardar la reseña:", error);
    return NextResponse.json(
      { error: "Error interno al publicar el comentario" },
      { status: 500 },
    );
  }
}
