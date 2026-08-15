import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("ChangeMeImmediately!123", 12);

  await prisma.user.upsert({
    where: { phone: "01700000000" },
    update: {},
    create: {
      phone: "01700000000",
      email: "admin@example.com",
      passwordHash,
      role: "ADMIN",
      profile: { create: { fullName: "Fresh Meat Co Admin" } }
    }
  });

  const categories = [
    ["গরুর মাংস", "Beef", "beef"],
    ["মুরগি", "Chicken", "chicken"],
    ["মাছ", "Fish", "fish"],
    ["খাসির মাংস", "Mutton", "mutton"],
    ["অন্যান্য", "Other", "other"]
  ];

  for (const [nameBn, nameEn, slug] of categories) {
    await prisma.category.upsert({
      where: { slug },
      update: {},
      create: { nameBn, nameEn, slug }
    });
  }

  const beef = await prisma.category.findUniqueOrThrow({ where: { slug: "beef" } });
  const chicken = await prisma.category.findUniqueOrThrow({ where: { slug: "chicken" } });

  await prisma.product.upsert({
    where: { slug: "fresh-beef" },
    update: {},
    create: {
      nameBn: "তাজা গরুর মাংস",
      nameEn: "Fresh Beef",
      slug: "fresh-beef",
      descriptionBn: "পরিষ্কার ও স্বাস্থ্যসম্মতভাবে প্রস্তুত তাজা গরুর মাংস।",
      imageUrl: "https://images.unsplash.com/photo-1603048297172-c92544798d5a?auto=format&fit=crop&w=1200&q=85",
      categoryId: beef.id,
      featured: true,
      bestSeller: true,
      variants: {
        create: [
          { labelBn: "৫০০ গ্রাম", grams: 500, price: 450, stockGrams: 25000 },
          { labelBn: "১ কেজি", grams: 1000, price: 850, stockGrams: 25000 },
          { labelBn: "২ কেজি", grams: 2000, price: 1650, stockGrams: 20000 }
        ]
      }
    }
  });

  await prisma.product.upsert({
    where: { slug: "fresh-chicken" },
    update: {},
    create: {
      nameBn: "ফ্রেশ ব্রয়লার মুরগি",
      nameEn: "Fresh Chicken",
      slug: "fresh-chicken",
      descriptionBn: "তাজা, পরিষ্কার ও দ্রুত ডেলিভারির জন্য প্রস্তুত মুরগি।",
      imageUrl: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=1200&q=85",
      categoryId: chicken.id,
      featured: true,
      bestSeller: true,
      variants: [
        { labelBn: "১ কেজি", grams: 1000, price: 320, stockGrams: 50000 },
        { labelBn: "২ কেজি", grams: 2000, price: 620, stockGrams: 40000 }
      ]
    }
  });

  const settings = {
    business_name: "Fresh Meat Co",
    phone: "01XXXXXXXXX",
    whatsapp: "01XXXXXXXXX",
    address: "বাংলাদেশ",
    opening_hours: "প্রতিদিন সকাল ৮টা – রাত ১০টা",
    minimum_order: "300",
    free_delivery_threshold: "2000"
  };

  for (const [key, value] of Object.entries(settings)) {
    await prisma.setting.upsert({ where: { key }, update: { value }, create: { key, value } });
  }

  await prisma.deliveryZone.createMany({
    data: [
      { nameBn: "এলাকা A", fee: 50, minimumOrder: 300 },
      { nameBn: "এলাকা B", fee: 80, minimumOrder: 300 },
      { nameBn: "এলাকা C", fee: 120, minimumOrder: 300 }
    ],
    skipDuplicates: true
  });
}

main().finally(() => prisma.$disconnect());
