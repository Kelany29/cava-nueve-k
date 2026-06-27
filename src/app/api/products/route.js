import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import jwt from "jsonwebtoken";

// ==========================================
// Módulo POST: Para subir un nuevo vino
// ==========================================
export async function POST(request) {
  try {
    // --- INICIO DEL CANDADO DE SEGURIDAD ---
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Acceso denegado. No tienes un Pase VIP (Token)." },
        { status: 401 },
      );
    }

    const token = authHeader.split(" ")[1];

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return NextResponse.json(
        { error: "Token inválido o expirado. Inicia sesión nuevamente." },
        { status: 401 },
      );
    }

    if (decodedToken.role !== "ADMIN") {
      return NextResponse.json(
        {
          error:
            "Acceso denegado. Solo los administradores pueden crear vinos.",
        },
        { status: 403 },
      );
    }
    // --- FIN DEL CANDADO DE SEGURIDAD ---

    // Si pasó toda la seguridad, capturamos los datos y guardamos el vino
    const body = await request.json();

    const newProduct = await prisma.product.create({
      data: {
        name: body.name,
        description: body.description || "",
        aroma: body.aroma || "",
        pairing: body.pairing || "",
        // Convertimos los textos a números exactos
        price: parseFloat(body.price),
        stock: parseInt(body.stock) || 0,
        imageUrl: body.imageUrl,
        category: body.category,
        strain: body.strain || "",
        winery: body.winery,
        year: parseInt(body.year) || null,
        alcoholContent: body.alcoholContent
          ? parseFloat(body.alcoholContent)
          : null,
        volume: body.volume ? parseFloat(body.volume) : null,
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    // ESTO ERA LO QUE FALTABA: El cierre del 'try' y el 'catch' del POST
    console.error("Error al crear el producto:", error);
    return NextResponse.json(
      { error: "Error interno al crear el vino" },
      { status: 500 },
    );
  }
}

// ==========================================
// Módulo GET: Para leer el catálogo
// ==========================================
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error al obtener el catálogo:", error);
    return NextResponse.json(
      { error: "Error al obtener el catálogo" },
      { status: 500 },
    );
  }
}
