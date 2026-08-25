"use client";

import {
  startTransition,
  useActionState,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm, useWatch, type Resolver } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import SidebarToggle from "@/components/shared/SidebarToggle";
import BrandLogo from "@/components/shared/brand-logo";
import { TextureButton } from "@/components/ui/texture-button";
import { Input } from "@/components/ui/input";
import { Camera, Globe, ImagePlus, InfoCircle, Send } from "reicon-react";
import { toast } from "sonner";
import { createProduct } from "@/features/products/actions";
import {
  CATEGORIES,
  PRODUCT_SIZES,
  productFormSchema,
  type ProductFormValues,
} from "@/lib/validations/product";

export default function AddProductPage() {
  const router = useRouter();
  const [state, formAction, actionPending] = useActionState(createProduct, {
    error: undefined,
  });
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const submittedRef = useRef(false);

  useEffect(() => {
    if (!submittedRef.current || actionPending) return;
    submittedRef.current = false;
    if (state.error) {
      toast.error(state.error);
    } else {
      toast.success("Product created");
    }
  }, [actionPending, state.error]);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: standardSchemaResolver(
      productFormSchema,
    ) as Resolver<ProductFormValues>,
    defaultValues: {
      name: "",
      description: "",
      type: "",
      sizes: [],
      stock: null,
      status: "draft",
      featured: false,
    },
  });

  const image = useWatch({ control, name: "image" });
  const pending = isSubmitting || actionPending || uploading;

  const previewUrl = useMemo(
    () => (image ? URL.createObjectURL(image) : null),
    [image],
  );

  useEffect(
    () => () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    },
    [previewUrl],
  );

  function handleImageSelect(file: File | undefined) {
    setValue("image", file, { shouldValidate: true });
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function onSubmit(values: ProductFormValues) {
    let imageUrl = "";
    if (values.image) {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", values.image);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setUploading(false);
        toast.error(body?.error ?? "Image upload failed");
        if (body?.error) setValue("image", undefined);
        return;
      }
      const body = await res.json();
      imageUrl = body.url;
      setUploading(false);
    }

    submittedRef.current = true;
    startTransition(() => {
      formAction({ ...values, imageUrl });
    });
  }

  return (
    <>
      <header className="sticky top-0 z-10 flex h-18 items-center border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-8 lg:px-10">
          <div className="flex min-w-0 items-center gap-2">
            <SidebarToggle className="-ml-2 shrink-0" />
            <h1 className="truncate text-base font-semibold sm:text-lg">
              Add New Product
            </h1>
          </div>
        </div>
      </header>

      <main className="grow mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mb-xl">
          <h1 className="text-3xl font-semibold text-foreground">
            Add New Product
          </h1>
          <p className="mt-1 text-base text-muted-foreground">
            Define your product details and add a photo for the storefront.
          </p>
        </div>

        <form
          id="add-product-form"
          // eslint-disable-next-line react-hooks/refs -- RHF handleSubmit reads refs only on submit, not during render
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-8 lg:grid-cols-12"
        >
          <div className="lg:col-span-7 space-y-4">
            <div className="mb-2 text-sm font-semibold text-foreground">
              Product Image
            </div>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className={`group relative flex aspect-4/3 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed bg-muted p-6 text-center transition-colors hover:bg-card ${
                previewUrl ? "border-border overflow-hidden" : "border-border"
              } ${errors.image ? "border-destructive" : ""}`}
            >
              {previewUrl ? (
                <Image
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  unoptimized
                  src={previewUrl}
                  alt="Product preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <>
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-background text-primary shadow-sm transition-transform duration-200 group-hover:scale-110">
                    <ImagePlus size={36} />
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    Click to upload product photo
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    JPG, PNG, or WebP up to 1MB
                  </p>
                </>
              )}
            </button>
            <input
              ref={fileInputRef}
              className="hidden"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => handleImageSelect(e.target.files?.[0])}
            />
            {previewUrl && (
              <button
                type="button"
                className="text-xs font-medium text-primary hover:underline"
                onClick={() => handleImageSelect(undefined)}
              >
                Remove image
              </button>
            )}
            {errors.image && (
              <p className="text-sm text-destructive" role="alert">
                {errors.image.message}
              </p>
            )}

            <div className="flex items-start gap-4 rounded-lg border border-border bg-card p-4">
              <InfoCircle size={20} className="shrink-0 text-primary" />
              <p className="text-sm text-muted-foreground">
                Images should be at least 1200px on the longest side and 1MB or
                smaller.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-xl">
            <div className="space-y-6 rounded-xl border border-border bg-background p-6 shadow-sm">
              <h2 className="text-sm font-semibold text-foreground">
                Product Details
              </h2>

              <div className="space-y-1.5">
                <label
                  className="text-sm font-medium text-foreground"
                  htmlFor="name"
                >
                  Product Title
                </label>
                <Input
                  id="name"
                  placeholder="e.g., Cast Iron Skillet, 26cm"
                  type="text"
                  aria-invalid={!!errors.name}
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-sm text-destructive" role="alert">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label
                  className="text-sm font-medium text-foreground"
                  htmlFor="description"
                >
                  Product Description
                </label>
                <textarea
                  id="description"
                  className="w-full rounded-lg border border-border px-4 py-2 text-sm outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="Describe the materials, dimensions, and who this product is for..."
                  rows={4}
                  {...register("description")}
                />
              </div>

              <div className="space-y-1.5">
                <label
                  className="text-sm font-medium text-foreground"
                  htmlFor="type"
                >
                  Product Type
                </label>
                <Input
                  id="type"
                  placeholder="e.g., Stainless steel"
                  type="text"
                  {...register("type")}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label
                    className="text-sm font-medium text-foreground"
                    htmlFor="price"
                  >
                    Base Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                      $
                    </span>
                    <Input
                      id="price"
                      className="pl-8"
                      placeholder="  0.00"
                      type="number"
                      min="0"
                      step="0.01"
                      aria-invalid={!!errors.price}
                      {...register("price", { valueAsNumber: true })}
                    />
                  </div>
                  {errors.price && (
                    <p className="text-sm text-destructive" role="alert">
                      {errors.price.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label
                    className="text-sm font-medium text-foreground"
                    htmlFor="stock"
                  >
                    Stock Quantity
                  </label>
                  <Input
                    id="stock"
                    placeholder="No stock"
                    type="number"
                    min="0"
                    aria-invalid={!!errors.stock}
                    {...register("stock", {
                      setValueAs: (value) =>
                        value === "" ? null : Number(value),
                    })}
                  />
                  {errors.stock && (
                    <p className="text-sm text-destructive" role="alert">
                      {errors.stock.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">
                  Category
                </label>
                <div className="flex gap-2 overflow-x-auto pt-2 pb-1 hide-scrollbar">
                  {CATEGORIES.map((cat) => (
                    <label key={cat} className="cursor-pointer mb-2">
                      <input
                        className="hidden peer"
                        type="radio"
                        value={cat}
                        {...register("category")}
                      />
                      <span className="rounded-full border border-border bg-muted px-6 py-2 text-sm capitalize whitespace-nowrap transition-all peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground">
                        {cat}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.category && (
                  <p className="text-sm text-destructive" role="alert">
                    {errors.category.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">
                  Sizes (optional)
                </label>
                <div className="flex flex-wrap gap-2 pt-2">
                  {PRODUCT_SIZES.map((size) => (
                    <label key={size} className="cursor-pointer mt-2">
                      <input
                        className="hidden peer"
                        type="checkbox"
                        value={size}
                        {...register("sizes")}
                      />
                      <span className="rounded-full border border-border bg-muted px-6  py-2 text-sm font-medium whitespace-nowrap transition-all peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground">
                        {size}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.sizes && (
                  <p className="text-sm text-destructive" role="alert">
                    {errors.sizes.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">
                  Status
                </label>
                <div className="flex flex-wrap gap-2 pt-2">
                  {[
                    { value: "active", label: "Publish" },
                    { value: "draft", label: "Save as Draft" },
                  ].map((opt) => (
                    <label key={opt.value} className="cursor-pointer">
                      <input
                        className="hidden peer"
                        type="radio"
                        value={opt.value}
                        {...register("status")}
                      />
                      <span className="rounded-full border border-border bg-muted px-6 py-2 text-sm transition-all peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground">
                        {opt.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">
                  Featured
                </label>
                <label className="flex cursor-pointer items-center gap-2 pt-2">
                  <input
                    className="hidden peer"
                    type="checkbox"
                    {...register("featured")}
                  />
                  <span className="rounded-full border border-border bg-muted px-6 py-2 text-sm transition-all peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground">
                    Show on homepage
                  </span>
                </label>
              </div>

              {state.error && (
                <p className="text-sm text-destructive" role="alert">
                  {state.error}
                </p>
              )}
            </div>
          </div>
        </form>
      </main>

      <footer className="mt-24 border-t border-border bg-background">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
          <div className="space-y-4">
            <BrandLogo variant="wordmark" className="h-6" />
            <p className="text-sm text-muted-foreground">
              A curated marketplace — hand-picked goods, sold once and sold right.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-foreground">Company</h4>
              <nav className="flex flex-col gap-1">
                {["Community", "Careers", "Sitemap"].map((link) => (
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
                {["Privacy", "Terms", "Support"].map((link) => (
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
              &copy; 2024 PrimeAxis. All rights reserved.
            </p>
            <div className="mt-4 flex gap-4">
              <Globe
                size={20}
                className="cursor-pointer text-muted-foreground hover:text-foreground"
              />
              <Camera
                size={20}
                className="cursor-pointer text-muted-foreground hover:text-foreground"
              />
              <Send
                size={20}
                className="cursor-pointer text-muted-foreground hover:text-foreground"
              />
            </div>
          </div>
        </div>
      </footer>

      <div className="sticky bottom-0 left-0 right-0 z-40 border-t border-border bg-background py-4 shadow-md">
        <div className="mx-auto flex max-w-7xl items-center justify-end px-4 sm:px-6 lg:px-8">
          <div className="flex w-full items-center gap-3 sm:w-auto">
            <TextureButton
              variant="secondary"
              className="flex-1 sm:flex-none"
              type="button"
              onClick={() => router.back()}
            >
              Discard
            </TextureButton>
            <TextureButton
              form="add-product-form"
              type="submit"
              className="flex-1 sm:flex-none"
              disabled={pending}
            >
              {uploading
                ? "Uploading..."
                : pending
                  ? "Saving..."
                  : "Save Product"}
            </TextureButton>
          </div>
        </div>
      </div>
    </>
  );
}
