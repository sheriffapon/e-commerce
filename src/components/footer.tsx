import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Github, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-12 md:grid-cols-3">
        <div className="flex flex-col items-start gap-4">
          <Logo />
          <p className="text-sm text-muted-foreground">
            Redefine Your Style with Ready-Made Elegance.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-2">
          <div>
            <h3 className="font-headline text-sm font-semibold">Shop</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  href="/shop"
                  className="text-muted-foreground hover:text-primary"
                >
                  All
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=coats"
                  className="text-muted-foreground hover:text-primary"
                >
                  Coats
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=dresses"
                  className="text-muted-foreground hover:text-primary"
                >
                  Dresses
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=trousers"
                  className="text-muted-foreground hover:text-primary"
                >
                  Trousers
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline text-sm font-semibold">About</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/lookbook"
                  className="text-muted-foreground hover:text-primary"
                >
                  Lookbook
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-primary"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline text-sm font-semibold">Legal</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  Shipping Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container mx-auto max-w-7xl border-t px-4 py-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} PortfolioReady. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" aria-label="Twitter">
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary" />
            </Link>
            <Link href="#" aria-label="Instagram">
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary" />
            </Link>
            <Link href="#" aria-label="GitHub">
              <Github className="h-5 w-5 text-muted-foreground hover:text-primary" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
