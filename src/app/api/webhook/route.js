import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { MercadoPagoConfig, Payment } from "mercadopago";

// Tu token real de Sandbox
const client = new MercadoPagoConfig({
  accessToken:
    "APP_USR-2104807755049676-031012-0a9753d0e5deccc4b82aa9f04129bc9c-3257118096",
});

export async function POST(request) {
  try {
    const url = new URL(request.url);
    const type = url.searchParams.get("type") || url.searchParams.get("topic");
    const dataId =
      url.searchParams.get("data.id") || url.searchParams.get("id");

    if (type === "payment" && dataId) {
      const payment = new Payment(client);
      const paymentInfo = await payment.get({ id: dataId });

      if (paymentInfo.status === "approved") {
        const orderId = paymentInfo.external_reference;

        // 1. Buscamos la orden completa para ver qué vinos compró el usuario
        const order = await prisma.order.findUnique({
          where: { id: orderId },
          include: { items: true },
        });

        // 2. Verificamos que la orden exista y no haya sido procesada antes
        if (order && order.status === "PENDING") {
          // A. Cambiamos el estado a PAGADO
          await prisma.order.update({
            where: { id: orderId },
            data: { status: "PAID" },
          });

          // B. 💡 EL BUCLE MAGICO: Restamos el stock de cada botella vendida
          for (const item of order.items) {
            await prisma.product.update({
              where: { id: item.productId },
              data: {
                stock: {
                  decrement: item.quantity, // Descuenta la cantidad exacta comprada
                },
              },
            });
          }

          console.log(
            `✅ ÉXITO TOTAL: Orden ${orderId} pagada. Stock descontado.`,
          );
        }
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("❌ Error procesando el webhook de MP:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
