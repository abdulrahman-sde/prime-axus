import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { auth } from "../lib/auth";

const U = (id: string) =>
  `https://images.unsplash.com/${id}?w=900&q=80&auto=format&fit=crop`;

const SAMPLE_PRODUCTS = [
  {
    name: "Essential Cotton Tee",
    description:
      "Mid-weight 100% combed cotton tee with a relaxed neckline. The everyday staple that holds its shape wash after wash.",
    type: "Oversized Fit",
    category: "T-Shirts",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    price: "2800.00",
    stock: 42,
    status: "ACTIVE",
    featured: true,
    image: U("photo-1521572163474-6864f9cf17ab"),
  },
  {
    name: "Heavyweight Graphic Tee",
    description:
      "240 GSM heavyweight tee with a screen-printed graphic that won't crack or fade. Built for daily wear.",
    type: "Relaxed Fit",
    category: "T-Shirts",
    sizes: ["S", "M", "L", "XL", "XXL"],
    price: "3500.00",
    stock: 28,
    status: "ACTIVE",
    featured: true,
    image: U("photo-1503341504253-dff4815485f1"),
  },
  {
    name: "Box-Fit Slub Tee",
    description:
      "Slub-knit cotton with a boxy, cropped-for-balance silhouette. Breathes easy in the heat.",
    type: "Box Fit",
    category: "T-Shirts",
    sizes: ["S", "M", "L", "XL"],
    price: "3200.00",
    stock: 35,
    status: "ACTIVE",
    image: U("photo-1576566588028-4147f3842f27"),
  },
  {
    name: "Stripe Pocket Tee",
    description:
      "Classic crew with a chest pocket and tonal stripe trim. A quiet upgrade on the plain white tee.",
    type: "Regular Fit",
    category: "T-Shirts",
    sizes: ["S", "M", "L", "XL", "XXL"],
    price: "2900.00",
    stock: 0,
    status: "ACTIVE",
    image: U("photo-1583743814966-8936f5b7be1a"),
  },
  {
    name: "Oversized Fleece Hoodie",
    description:
      "Brushed-back fleece hoodie with dropped shoulders and a kangaroo pocket. Warm without the weight.",
    type: "Heavyweight",
    category: "Hoodies",
    sizes: ["S", "M", "L", "XL", "XXL"],
    price: "9500.00",
    stock: 24,
    status: "ACTIVE",
    featured: true,
    image: U("photo-1556821840-3a63f95609a7"),
  },
  {
    name: "Zip-Up Essential Hoodie",
    description:
      "Full-zip hoodie in mid-weight fleece with zippered hand pockets. Layers cleanly over a tee or shirt.",
    type: "Regular Fit",
    category: "Hoodies",
    sizes: ["S", "M", "L", "XL", "XXL"],
    price: "10500.00",
    stock: 18,
    status: "ACTIVE",
    image: U("photo-1578681994506-b8f463449011"),
  },
  {
    name: "Color-Block Pullover Hoodie",
    description:
      "Two-tone pullover with a tonal chest print and ribbed cuffs. Statement warmth for cooler evenings.",
    type: "Oversized Fit",
    category: "Hoodies",
    sizes: ["M", "L", "XL"],
    price: "11200.00",
    stock: 0,
    status: "DRAFT",
    image: U("photo-1571945153237-4929e783af4a"),
  },
  {
    name: "Stretch Denim Jeans",
    description:
      "Slim-fit jeans with 2% elastane for all-day movement. Dark indigo wash that fades beautifully with time.",
    type: "Slim Fit",
    category: "Jeans & Pants",
    sizes: ["S", "M", "L", "XL", "XXL"],
    price: "5500.00",
    stock: 30,
    status: "ACTIVE",
    featured: true,
    image: U("photo-1541099649105-f69ad21f3246"),
  },
  {
    name: "Straight-Fit Chino Pants",
    description:
      "Cotton-twill chinos with a clean straight leg. Dressed up or down, they just work.",
    type: "Straight Fit",
    category: "Jeans & Pants",
    sizes: ["S", "M", "L", "XL"],
    price: "4800.00",
    stock: 0,
    status: "DRAFT",
    image: U("photo-1594633312681-425c7b97ccd1"),
  },
  {
    name: "Relaxed Cargo Pants",
    description:
      "Ripstop cargo pants with five pockets and an adjustable ankle. Utility style, everyday comfort.",
    type: "Relaxed Fit",
    category: "Jeans & Pants",
    sizes: ["S", "M", "L", "XL", "XXL"],
    price: "5900.00",
    stock: 22,
    status: "ACTIVE",
    image: U("photo-1473966968600-fa801b869a1a"),
  },
  {
    name: "Retro Runner Sneakers",
    description:
      "Heritage running silhouette with a cushioned midsole and suede overlays. Walks like a dream from day one.",
    type: "Sneakers",
    category: "Shoes",
    sizes: ["40", "41", "42", "43", "44", "45"],
    price: "12500.00",
    stock: 15,
    status: "ACTIVE",
    featured: true,
    image: U("photo-1542291026-7eec264c27ff"),
  },
  {
    name: "Court-Style Leather Sneakers",
    description:
      "Clean white leather court sneaker with a gum sole. The pair that goes with everything.",
    type: "Sneakers",
    category: "Shoes",
    sizes: ["40", "41", "42", "43", "44", "45"],
    price: "14800.00",
    stock: 12,
    status: "ACTIVE",
    image: U("photo-1595950653106-6c9ebd614d3a"),
  },
  {
    name: "Slip-On Canvas Shoes",
    description:
      "Classic slip-on in washed canvas with a memory-foam insole. Effortless casual wear.",
    type: "Casual",
    category: "Shoes",
    sizes: ["39", "40", "41", "42", "43", "44"],
    price: "6800.00",
    stock: 0,
    status: "DRAFT",
    image: U("photo-1449505278894-297fdb3edbc1"),
  },
  {
    name: "Classic Oxford Shirt",
    description:
      "Button-down oxford in brushed cotton. Sharp enough for the office, soft enough for the weekend.",
    type: "Regular Fit",
    category: "Shirts",
    sizes: ["S", "M", "L", "XL"],
    price: "8500.00",
    stock: 12,
    status: "ACTIVE",
    featured: true,
    image: U("photo-1596755094514-f87e34085b2c"),
  },
  {
    name: "Linen Camp Shirt",
    description:
      "Breathable linen-blend camp collar shirt. Your best friend between June and September.",
    type: "Relaxed Fit",
    category: "Shirts",
    sizes: ["S", "M", "L", "XL", "XXL"],
    price: "7200.00",
    stock: 20,
    status: "ACTIVE",
    image: U("photo-1598033129183-c4f50c736f10"),
  },
  {
    name: "Linen Kurta",
    description:
      "Pure linen kurta with a mandarin collar and side slits. Breezy elegance for festive days.",
    type: "Festive",
    category: "Kurtas",
    sizes: ["M", "L", "XL", "XXL"],
    price: "7500.00",
    stock: 8,
    status: "ACTIVE",
    featured: true,
    image: U("photo-1445205170230-053b83016050"),
  },
  {
    name: "Cotton Shalwar Kameez",
    description:
      "Soft cotton shalwar kameez in a versatile solid tone. Classic comfort, tailored to fit.",
    type: "Classic",
    category: "Kurtas",
    sizes: ["M", "L", "XL", "XXL"],
    price: "6200.00",
    stock: 0,
    status: "DRAFT",
    image: U("photo-1434389677669-e08b4cac3105"),
  },
  {
    name: "Quilted Bomber Jacket",
    description:
      "Quilted bomber with a stand collar and ribbed trims. Light insulation for shoulder-season layering.",
    type: "Outerwear",
    category: "Jackets",
    sizes: ["S", "M", "L", "XL"],
    price: "18500.00",
    stock: 9,
    status: "ACTIVE",
    image: U("photo-1544022613-e87ca75a784a"),
  },
  {
    name: "Denim Trucker Jacket",
    description:
      "Mid-wash denim trucker jacket with chest pockets and a roomy sleeve. Ages better every year.",
    type: "Outerwear",
    category: "Jackets",
    sizes: ["S", "M", "L", "XL", "XXL"],
    price: "13900.00",
    stock: 14,
    status: "ACTIVE",
    featured: true,
    image: U("photo-1551537482-f2075a1d41f2"),
  },
  {
    name: "Crew-Neck Sweatshirt",
    description:
      "French-terry crewneck with a brushed interior. The softest layer in your rotation.",
    type: "Regular Fit",
    category: "Sweatshirts",
    sizes: ["S", "M", "L", "XL", "XXL"],
    price: "6400.00",
    stock: 26,
    status: "ACTIVE",
    image: U("photo-1578768079052-aa76e52ff62e"),
  },
  {
    name: "Quarter-Zip Performance Top",
    description:
      "Moisture-wicking quarter-zip with thumb cuffs. Moves with you from the gym to the street.",
    type: "Athletic Fit",
    category: "Sweatshirts",
    sizes: ["S", "M", "L", "XL"],
    price: "5800.00",
    stock: 0,
    status: "DRAFT",
    image: U("photo-1618354691373-d851c5c3a990"),
  },
  {
    name: "Everyday Cotton Shorts",
    description:
      "Relaxed shorts in garment-washed cotton with an elastic waist and drawcord. Built for warm days.",
    type: "Relaxed Fit",
    category: "Shorts",
    sizes: ["S", "M", "L", "XL"],
    price: "3800.00",
    stock: 33,
    status: "ACTIVE",
    image: U("photo-1591195853828-11db59a44f6b"),
  },
  {
    name: "Structured Cap",
    description:
      "Six-panel cap with a pre-curved brim and adjustable strap. Embroidered E mark on the front.",
    type: "Accessory",
    category: "Accessories",
    sizes: ["One Size"],
    price: "2200.00",
    stock: 60,
    status: "ACTIVE",
    image: U("photo-1521369909029-2afed882baee"),
  },
  {
    name: "Leather Belt",
    description:
      "Full-grain leather belt with a brushed metal buckle. Ages into a one-of-one patina.",
    type: "Accessory",
    category: "Accessories",
    sizes: ["S", "M", "L", "XL"],
    price: "3400.00",
    stock: 40,
    status: "ACTIVE",
    image: U("photo-1624222247344-550fb60583dc"),
  },
  {
    name: "Crew Socks (3-Pack)",
    description:
      "Mid-calf cotton socks in a three-pack of neutral tones. Reinforced heel and toe, cushioned sole.",
    type: "Accessory",
    category: "Accessories",
    sizes: ["M", "L"],
    price: "1900.00",
    stock: 75,
    status: "ACTIVE",
    image: U("photo-1586350977771-b3b0abd50c82"),
  },
];

async function main() {
  const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
  const prisma = new PrismaClient({ adapter });

  const email = process.env.ADMIN_EMAIL ?? "admin@maampalwasha.com";
  const password = process.env.ADMIN_PASSWORD ?? "changeme123";

  const existing = await prisma.user.findUnique({ where: { email } });

  if (!existing) {
    await auth.api.signUpEmail({
      body: { email, password, name: "Admin" },
    });
    console.log(`Admin user created: ${email}`);
  } else {
    console.log(`Admin user already exists: ${email}`);
  }

  let created = 0;
  let updated = 0;

  for (const product of SAMPLE_PRODUCTS) {
    const { name, ...data } = product;
    const status = data.status as "ACTIVE" | "DRAFT" | "ARCHIVED";
    const existing = await prisma.product.findFirst({ where: { name } });
    if (existing) {
      await prisma.product.update({
        where: { id: existing.id },
        data: { ...data, status },
      });
      updated += 1;
    } else {
      await prisma.product.create({ data: { name, ...data, status } });
      created += 1;
    }
  }

  const total = await prisma.product.count();
  console.log(
    `Seeded ${SAMPLE_PRODUCTS.length} apparel products (${created} created, ${updated} updated). Total in DB: ${total}`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => process.exit(0));
