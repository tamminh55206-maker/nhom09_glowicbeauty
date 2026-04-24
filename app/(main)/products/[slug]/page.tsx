import { products, getProductBySlug, getProductsByCategory } from "@/lib/data";
import { notFound } from "next/navigation";
import ProductDetailClient from "./ProductDetailClient";

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // ← thêm await ở đây
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 6);

  return (
    <ProductDetailClient product={product} relatedProducts={relatedProducts} />
  );
}
