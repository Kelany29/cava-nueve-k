import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import jwt from "jsonwebtoken";

// Función auxiliar para mantener el código limpio (Pase VIP)
function verifyAdmin(request) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) return false;

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.role === "ADMIN";
  } catch (error) {
    return false;
  }
}

// Módulo PUT: Para editar/actualizar un vino
export async function PUT(request, { params }) {
  if (!verifyAdmin(request)) {
    return NextResponse.json(
      { error: "Acceso denegado. Se requiere Token de Administrador." },
      { status: 401 },
    );
  }

  try {
    const body = await request.json();
    const { id } = await params;

    // Convertimos el ID a número si corresponde para evitar conflictos con MySQL
    const productId = isNaN(Number(id)) ? id : Number(id);

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: body,
    });

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error("❌ Error en PUT:", error);
    return NextResponse.json(
      { error: "Error al actualizar el vino." },
      { status: 500 },
    );
  }
}

// Módulo DELETE: Para borrar un vino del catálogo
export async function DELETE(request, { params }) {
  if (!verifyAdmin(request)) {
    return NextResponse.json(
      { error: "Acceso denegado. Se requiere Token de Administrador." },
      { status: 401 },
    );
  }

  try {
    const { id } = await params;

    // 💡 SOLUCIÓN: Convertimos el ID a número si es un dígito puro
    const productId = isNaN(Number(id)) ? id : Number(id);

    await prisma.product.delete({
      where: { id: productId },
    });

    return NextResponse.json(
      { message: "Vino eliminado correctamente." },
      { status: 200 },
    );
  } catch (error) {
    // 💡 SOLUCIÓN: Ahora la terminal nos dirá exactamente qué pasó por detrás
    console.error("❌ Error exacto en DELETE de Prisma:", error);
    return NextResponse.json(
      { error: "Error al eliminar el vino en la base de datos." },
      { status: 500 },
    );
  }
}
