import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getProductById, getRelatedProducts } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { ProductCard } from '@/components/product-card';
import { Badge } from '@/components/ui/badge';

type ProductPageProps = {
  params: {
    productId: string;
  };
};

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductById(params.productId);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(params.productId);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:py-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-16">
        <div>
          <Carousel className="w-full">
            <CarouselContent>
              {product.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg">
                    <Image
                      src={image.imageUrl}
                      alt={`${product.name} image ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      data-ai-hint={image.imageHint}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {product.images.length > 1 && (
              <>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </>
            )}
          </Carousel>
        </div>

        <div className="flex flex-col pt-4">
          <Badge
            variant="outline"
            className="mb-2 w-fit"
          >
            {product.category}
          </Badge>
          <h1 className="font-headline text-3xl font-bold lg:text-4xl">
            {product.name}
          </h1>
          <p className="mt-2 text-2xl text-primary">${product.price.toFixed(2)}</p>
          <Separator className="my-6" />
          <p className="text-base leading-relaxed text-muted-foreground">
            {product.description}
          </p>
          <div className="mt-6">
            <h3 className="text-sm font-medium text-foreground">
              Select Size
            </h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <Button key={size} variant="outline" size="sm">
                  {size}
                </Button>
              ))}
            </div>
          </div>
          <Button size="lg" className="mt-8 w-full font-semibold">
            Add to Cart
          </Button>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-16 sm:mt-24">
          <h2 className="font-headline text-2xl font-bold sm:text-3xl">
            You Might Also Like
          </h2>
          <Separator className="my-6" />
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
