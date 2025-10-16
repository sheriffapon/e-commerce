import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Separator } from '@/components/ui/separator';

export default function AboutPage() {
  const portraitImage = PlaceHolderImages.find(
    (img) => img.id === 'about-portrait'
  );

  return (
    <div className="bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:py-16">
        <div className="mb-12 text-center">
          <h1 className="font-headline text-4xl font-bold md:text-5xl">
            The Story of Pero Collection
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Crafting elegance for the modern individual.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-5">
          <div className="md:col-span-3">
            <h2 className="font-headline text-3xl font-semibold">Our Mission</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              At Pero Collection, our mission is to redefine elegance through
              thoughtfully designed, ready-made clothing. We believe that style
              should be both effortless and enduring. We create timeless pieces
              that empower the wearer, blending classic silhouettes with modern
              sensibilities. Our commitment is to quality, craftsmanship, and
              sustainable practices, ensuring that every garment is not just a
              purchase, but an investment in personal style.
            </p>
            <Separator className="my-8" />
            <h2 className="font-headline text-3xl font-semibold">
              Design Philosophy
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Our design philosophy is rooted in minimalism and functionality.
              We focus on clean lines, premium fabrics, and a neutral color
              palette that allows for versatility and longevity. Each piece is
              meticulously crafted to be both beautiful and practical, designed
              to be a cherished part of your wardrobe for years to come. We draw
              inspiration from art, architecture, and the natural world to
              create collections that are both contemporary and timeless.
            </p>
          </div>
          <div className="md:col-span-2">
            {portraitImage && (
              <div className="relative h-full min-h-[400px] w-full overflow-hidden rounded-lg">
                <Image
                  src={portraitImage.imageUrl}
                  alt={portraitImage.description}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  data-ai-hint={portraitImage.imageHint}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
