export interface CategoryNode {
  name: string;
  image: string;
  children?: { name: string }[];
}

export interface TopSubCategory {
  name: string;
  count: number;
}

export interface TopCategory {
  name: string;
  image: string;
  count: number;
  children?: TopSubCategory[];
}

export const CATEGORY_TREE: CategoryNode[] = [
  { name: "Home & Kitchen", image: "/landing/category-kitchen.png" },
  { name: "Office Products", image: "/landing/category-office.png" },
  { name: "Pet Supplies", image: "/landing/category-pets.png" },
];

export const HOME_SUBCATEGORIES = CATEGORY_TREE.map((c) => c.name) as [
  "Home & Kitchen",
  "Office Products",
  "Pet Supplies",
];

export function categoryChildren(name: string): string[] {
  return CATEGORY_TREE.find((c) => c.name === name)?.children?.map(
    (c) => c.name,
  ) ?? [];
}

/** All category values that should match when filtering by `name`: the
 * category itself plus any of its sub-categories. */
export function expandCategory(name: string): string[] {
  return [name, ...categoryChildren(name)];
}
