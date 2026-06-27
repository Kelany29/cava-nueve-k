import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import jwt from "jsonwebtoken";

// Función auxiliar para validar el token JWT del usuario
function verifyUser(request) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) return null;

  const token = authHeader.split(" ")[1];
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
}

// ==========================================
// MÓDULO GET: Obtener el historial del usuario logueado
// ==========================================
export async function GET(request) {
  // 1. Validar identidad mediante el token
  const userPayload = verifyUser(request);
  if (!userPayload) {
    return NextResponse.json(
      { error: "Acceso denegado. Debes iniciar sesión." },
      { status: 401 },
    );
  }

  try {
    // 2. Buscar todas las órdenes que pertenezcan al ID del token
    const orders = await prisma.order.findMany({
      where: {
        userId: userPayload.id, // Filtramos estrictamente por el usuario actual
      },
      include: {
        items: {
          include: {
            product: true, // Trae también los datos del vino (nombre, imagen, etc.)
          },
        },
      },
      orderBy: {
        createdAt: "desc", // Ordena las compras de la más reciente a la más vieja
      },
    });

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("Error al obtener las órdenes:", error);
    return NextResponse.json(
      { error: "Error interno al obtener el historial de compras." },
      { status: 500 },
    );
  }
}

// ==========================================
// MÓDULO POST: Crear una nueva orden (Carrito)
// ==========================================
export async function POST(request) {
  const userPayload = verifyUser(request);
  if (!userPayload) {
    return NextResponse.json(
      { error: "Debes iniciar sesión para comprar." },
      { status: 401 },
    );
  }

  try {
    const body = await request.json();
    const { items } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "El carrito está vacío." },
        { status: 400 },
      );
    }

    let total = 0;
    const orderItemsData = [];

    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      });

      if (!product) {
        return NextResponse.json(
          { error: `El producto con ID ${item.productId} no existe.` },
          { status: 404 },
        );
      }

      total += Number(product.price) * item.quantity;

      orderItemsData.push({
        productId: product.id,
        quantity: item.quantity,
        price: product.price,
      });
    }

    const newOrder = await prisma.order.create({
      data: {
        userId: userPayload.id,
        total: total,
        items: {
          create: orderItemsData,
        },
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error("Error al crear la orden:", error);
    return NextResponse.json(
      { error: "Error interno al procesar la compra." },
      { status: 500 },
    );
  }
}
