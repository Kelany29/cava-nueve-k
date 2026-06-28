import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken:
    "APP_USR-2104807755049676-031012-0a9753d0e5deccc4b82aa9f04129bc9c-3257118096",
});

export async function POST(request) {
  console.log("🚀 EJECUTANDO EL CÓDIGO NUEVO DE MERCADO PAGO...");

  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "No autorizado." }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    let userId;

    try {
      const payloadBase64 = token.split(".")[1];
      const decodedPayload = JSON.parse(
        Buffer.from(payloadBase64, "base64").toString("utf-8"),
      );
      userId = decodedPayload.id;
    } catch (e) {
      return NextResponse.json({ error: "Sesión inválida." }, { status: 401 });
    }

    const { items } = await request.json();
    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Carrito vacío" }, { status: 400 });
    }

    const totalAmount = items.reduce(
      (sum, item) => sum + Number(item.price) * Number(item.quantity),
      0,
    );

    const newOrder = await prisma.order.create({
      data: {
        userId: userId,
        total: totalAmount.toString(),
        status: "PENDING",
        // Aquí le decimos a Prisma que llene la tabla OrderItem al mismo tiempo
        items: {
          create: items.map((item) => ({
            productId: item.id,
            quantity: Number(item.quantity),
            price: Number(item.price),
          })),
        },
      },
    });

    console.log("✅ ORDEN CREADA EN PRISMA CON ÍTEMS:", newOrder.id);

    const itemsMercadoPago = items.map((item) => ({
      id: item.id,
      title: item.name,
      quantity: Number(item.quantity),
      unit_price: Number(item.price),
      currency_id: "ARS",
    }));

    const preference = new Preference(client);

    // 🔥 AQUÍ ESTÁ EL CAMBIO: Tu dominio de producción
    const DOMINIO = "https://cava-nueve-mcslmli0c-kelany-s-projects.vercel.app";

    console.log(
      "🔗 ENVIANDO ESTAS ESTASS A MP:",
      `${DOMINIO}/checkout/success?orderId=${newOrder.id}`,
    );

    const result = await preference.create({
      body: {
        items: itemsMercadoPago,
        external_reference: newOrder.id,
        back_urls: {
          success: `${DOMINIO}/checkout/success?orderId=${newOrder.id}`,
          failure: `${DOMINIO}/checkout/failure`,
          pending: `${DOMINIO}/checkout/pending`,
        },
        auto_return: "approved",
      },
    });

    return NextResponse.json({ id: result.id, initPoint: result.init_point });
  } catch (error) {
    console.error("❌ ERROR DETALLADO DE MP:", error);
    return NextResponse.json(
      { error: "Error interno al procesar el pago" },
      { status: 500 },
    );
  }
}
