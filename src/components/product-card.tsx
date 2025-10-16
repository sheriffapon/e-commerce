import Link from 'next/link';
import Image from 'next/image';
import { type Product } from '@/lib/products';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const firstImage = product.images[0];

  return (
    <Link href={`/shop/${product.id}`}>
      <Card className="group h-full w-full overflow-hidden rounded-lg border-0 shadow-none transition-shadow duration-300 hover:shadow-lg">
        <CardHeader className="p-0">
          <div className="relative aspect-[3/4] w-full overflow-hidden">
            {firstImage ? (
              <Image
                src={firstImage.imageUrl}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                data-ai-hint={firstImage.imageHint}
              />
            ) : (
              <div className="h-full w-full bg-muted"></div>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-3">
          <CardTitle className="mb-1 truncate text-base font-medium leading-tight">
            {product.name}
          </CardTitle>
          <CardDescription className="text-sm text-primary">
            ${product.price.toFixed(2)}
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
