"use client";

import { useState } from "react";
import { ShopProduct } from "@/types";
import { Button } from "@/components/ui/button";
import { Heart, Star } from "reicon-react";

export default function ProductCard({ product }: { product: ShopProduct }) {
  const [liked, setLiked] = useState(product.liked ?? false);

  return (
    <div className="flex flex-col gap-3 group cursor-pointer">
      <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-muted">
        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={product.image}
          alt={product.name}
        />
        <Button
          variant="secondary"
          size="icon"
          className="absolute right-3 top-3 h-8 w-8 rounded-full bg-background/80 text-foreground shadow-sm backdrop-blur-sm transition-transform hover:bg-background"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setLiked(!liked);
          }}
        >
          <Heart size={18} weight={liked ? "Filled" : "Outline"} />
        </Button>
      </div>
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-foreground">
            {product.name}
          </span>
          <span className="text-sm text-muted-foreground">
            {product.description}
          </span>
          <span className="mt-1 text-sm font-medium text-foreground">
            ${product.price}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Star size={16} weight="Filled" className="text-primary" />
          <span className="text-sm text-foreground">{product.rating}</span>
        </div>
      </div>
    </div>
  );
}
