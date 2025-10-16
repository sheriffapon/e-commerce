import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function LookbookPage() {
  const lookbookImages = PlaceHolderImages.filter((img) =>
    img.id.startsWith('lookbook-')
  );
  const backgroundImage = PlaceHolderImages.find(
    (img) => img.id === 'background-lookbook'
  );

  return (
    <div className="relative">
      {backgroundImage && (
        <Image
          src={backgroundImage.imageUrl}
          alt={backgroundImage.description}
          fill
          className="z-[-1] object-cover blur-sm"
          data-ai-hint={backgroundImage.imageHint}
        />
      )}
      <div className="container mx-auto max-w-7xl bg-background/80 px-4 py-8 backdrop-blur-sm sm:py-12">
        <div className="mb-8 text-center">
          <h1 className="font-headline text-4xl font-bold md:text-5xl">
            Lookbook
          </h1>
          <p className="mt-2 text-muted-foreground">
            Inspiration for your wardrobe, from our latest collection.
          </p>
        </div>

        <div className="columns-1 gap-4 sm:columns-2 md:columns-3 lg:columns-4">
          {lookbookImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative mb-4 break-inside-avoid overflow-hidden rounded-lg"
            >
              <Image
                src={image.imageUrl}
                alt={image.description}
                width={500}
                height={750}
                className="h-auto w-full transform rounded-lg object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                data-ai-hint={image.imageHint}
              />
              <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:opacity-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
