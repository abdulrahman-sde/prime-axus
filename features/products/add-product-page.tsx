"use client";

import { SidebarTrigger } from '@/components/ui/sidebar';
import {
  Camera,
  CloudCheck,
  Globe,
  ImagePlus,
  InfoCircle,
  Send,
} from 'reicon-react';

export default function AddProductPage() {
  return (
    <>
      <header className="sticky top-0 z-10 flex h-18 items-center border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-8 lg:px-10">
          <div className="flex min-w-0 items-center gap-2">
            <SidebarTrigger className="-ml-2 shrink-0" />
            <h1 className="truncate text-base font-semibold sm:text-lg">
              Add New Product
            </h1>
          </div>
        </div>
      </header>

      <main className="grow mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mb-xl">
          <h1 className="text-3xl font-bold text-foreground">Add New Product</h1>
          <p className="mt-1 text-base text-muted-foreground">
            Define your product details and upload high-resolution photos for the storefront.
          </p>
        </div>

        <form className="grid grid-cols-1 lg:grid-cols-12 gap-xl">
          <div className="lg:col-span-7 space-y-4">
            <div className="mb-2 text-sm font-semibold text-foreground">Product Image</div>

            <div className="group flex aspect-4/3 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted p-lg text-center transition-colors hover:bg-card">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-background text-primary shadow-sm transition-transform duration-200 group-hover:scale-110">
                <ImagePlus size={36} />
              </div>
              <p className="text-sm font-medium text-foreground">Click to upload product photo</p>
              <p className="mt-1 text-xs text-muted-foreground">HEIC, PNG, or JPG up to 50MB</p>
            </div>

            <div className="flex items-start gap-4 rounded-lg border border-border bg-card p-4">
              <InfoCircle size={20} className="shrink-0 text-primary" />
              <p className="text-sm text-muted-foreground">
                Images should be at least 1200px on the longest side for sharp product pages. Our
                AI will automatically generate lower-resolution watermarked previews for the public
                gallery.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-xl">
            <div className="space-y-6 rounded-xl border border-border bg-background p-6 shadow-sm">
              <h2 className="text-sm font-semibold text-foreground">Product Details</h2>

              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground" htmlFor="title">
                  Product Title
                </label>
                <input
                  className="w-full rounded-lg border border-border px-4 py-2 text-sm outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
                  id="title"
                  placeholder="e.g., Whispers of the Nordic Coast"
                  type="text"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground" htmlFor="description">
                  Product Description
                </label>
                <textarea
                  className="w-full rounded-lg border border-border px-4 py-2 text-sm outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
                  id="description"
                  placeholder="Describe the specs, build quality, and who this gear is for..."
                  rows={4}
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground">Category</label>
                <div className="flex flex-wrap gap-2 pt-2">
                  {['Headphones', 'Cameras', 'Laptops'].map((cat) => (
                    <label key={cat} className="cursor-pointer">
                      <input
                        className="hidden peer"
                        defaultChecked={cat === 'Headphones'}
                        name="category"
                        type="radio"
                        value={cat.toLowerCase()}
                      />
                      <span className="rounded-full border border-border bg-muted px-6 py-2 text-sm transition-all peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground">
                        {cat}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground" htmlFor="price">
                  Base Price
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    $
                  </span>
                  <input
                    className="w-full rounded-lg border border-border py-2 pl-8 pr-4 text-sm outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
                    id="price"
                    placeholder="0.00"
                    type="number"
                  />
                </div>
                <p className="text-xs text-muted-foreground">LuxeFrame takes a 10% commission on all sales.</p>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 shadow-sm">
              <h2 className="mb-4 text-sm font-semibold text-foreground">Listing Privacy</h2>
              <div className="space-y-4">
                <label className="flex items-center gap-4 cursor-pointer group">
                  <input
                    className="h-5 w-5 rounded border-border text-primary focus:ring-primary"
                    type="checkbox"
                  />
                  <div>
                    <div className="text-sm font-medium text-foreground">
                      Allow Limited Editions
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Restrict sales to a limited batch of units.
                    </div>
                  </div>
                </label>
                <label className="flex items-center gap-4 cursor-pointer group">
                  <input
                    className="h-5 w-5 rounded border-border text-primary focus:ring-primary"
                    defaultChecked
                    type="checkbox"
                  />
                  <div>
                    <div className="text-sm font-medium text-foreground">Public Visibility</div>
                    <div className="text-xs text-muted-foreground">
                      Make this product discoverable in the storefront.
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </form>
      </main>

      <footer className="mt-2xl border-t border-border bg-background">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-xl px-4 py-2xl sm:px-6 md:grid-cols-3 lg:px-8">
          <div className="space-y-4">
            <span className="font-bold text-lg text-primary">LuxeFrame</span>
            <p className="text-sm text-muted-foreground">
              A curated electronics marketplace — bench-tested gear for people who buy once and buy
              right.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-foreground">Company</h4>
              <nav className="flex flex-col gap-1">
                {['Community', 'Careers', 'Sitemap'].map((link) => (
                  <a
                    key={link}
                    className="text-sm text-muted-foreground transition-opacity hover:text-foreground"
                    href="#"
                  >
                    {link}
                  </a>
                ))}
              </nav>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-foreground">Legal</h4>
              <nav className="flex flex-col gap-1">
                {['Privacy', 'Terms', 'Support'].map((link) => (
                  <a
                    key={link}
                    className="text-sm text-muted-foreground transition-opacity hover:text-foreground"
                    href="#"
                  >
                    {link}
                  </a>
                ))}
              </nav>
            </div>
          </div>
          <div className="flex flex-col items-start justify-between md:items-end">
            <p className="text-left text-sm text-muted-foreground md:text-right">
              &copy; 2024 LuxeFrame. All rights reserved.
            </p>
            <div className="mt-4 flex gap-4">
              <Globe size={20} className="cursor-pointer text-muted-foreground hover:text-foreground" />
              <Camera size={20} className="cursor-pointer text-muted-foreground hover:text-foreground" />
              <Send size={20} className="cursor-pointer text-muted-foreground hover:text-foreground" />
            </div>
          </div>
        </div>
      </footer>

      <div className="sticky bottom-0 left-0 right-0 z-40 border-t border-border bg-background py-4 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="hidden items-center gap-2 text-muted-foreground sm:flex">
            <CloudCheck size={16} />
            <span className="text-sm">All changes auto-saved</span>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              className="flex-1 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors duration-150 hover:bg-muted active:scale-95 sm:flex-none sm:px-xl"
              type="button"
            >
              Discard
            </button>
            <button
              className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-md transition-all duration-150 hover:bg-primary/90 active:scale-95 sm:flex-none sm:px-xl"
              type="submit"
            >
              Save Product
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
