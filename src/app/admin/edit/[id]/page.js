import { prisma } from "../../../../lib/prisma";
import EditProductForm from "../../../../components/EditProductForm";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditProductPage({ params }) {
  const { id } = await params;
  const productId = isNaN(Number(id)) ? id : Number(id);

  // Buscamos el vino específico en la base de datos
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    notFound(); // Si el ID no existe, muestra pantalla 404
  }

  // Desempaquetamos los valores Decimal/Null para que el componente de cliente no falle
  const serializedProduct = {
    ...product,
    price: Number(product.price),
    stock: Number(product.stock),
    year: product.year ? Number(product.year) : "",
    alcoholContent: product.alcoholContent
      ? Number(product.alcoholContent)
      : "",
    volume: product.volume ? Number(product.volume) : "",
  };

  return <EditProductForm product={serializedProduct} />;
}
