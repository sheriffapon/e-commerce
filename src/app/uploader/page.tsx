'use client';

import { useState, ChangeEvent, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, X } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function UploaderPage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        // 4MB limit
        alert('File is too large. Please select a file smaller than 4MB.');
        return;
      }
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleClear = () => {
    setPreview(null);
    setFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const backgroundImage = PlaceHolderImages.find(
    (img) => img.id === 'background-contact'
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
      <div className="container mx-auto max-w-4xl bg-background/80 px-4 py-12 backdrop-blur-sm sm:py-16">
        <div className="mb-12 text-center">
          <h1 className="font-headline text-4xl font-bold md:text-5xl">
            Image Uploader
          </h1>
          <p className="mt-2 text-muted-foreground">
            Select an image to see a preview.
          </p>
        </div>

        <Card className="mx-auto w-full">
          <CardHeader>
            <CardTitle>Upload your Image</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div
                className="flex cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-muted-foreground p-8 text-center"
                onClick={handleUploadClick}
              >
                <Upload className="h-10 w-10 text-muted-foreground" />
                <p className="font-medium text-muted-foreground">
                  Click to browse or drag and drop your file here
                </p>
                <p className="text-sm text-muted-foreground">
                  (Max file size: 4MB)
                </p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/gif, image/webp"
                className="hidden"
                onChange={handleFileChange}
              />

              {preview && (
                <div className="space-y-4">
                  <h3 className="font-semibold">Preview</h3>
                  <div className="relative w-full max-w-sm overflow-hidden rounded-lg border">
                    <Image
                      src={preview}
                      alt="Image preview"
                      width={400}
                      height={400}
                      className="h-auto w-full object-contain"
                    />
                  </div>
                  {fileName && (
                    <div className="flex items-center justify-between rounded-md bg-muted/50 p-3">
                      <p className="truncate text-sm font-medium">{fileName}</p>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleClear}
                        className="h-6 w-6"
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Clear file</span>
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
