# Fresh Meat Co

বাংলা-first production-ready meat & grocery commerce starter.

## প্রযুক্তি
- Next.js + TypeScript
- PostgreSQL
- Prisma
- bcrypt password hashing
- HTTP-only signed session cookie
- Zod validation
- Responsive UI

## চালানোর ধাপ

1. Node.js 20+ ইনস্টল করুন।
2. PostgreSQL database তৈরি করুন।
3. `.env.example` কপি করে `.env` বানান।
4. `DATABASE_URL` এবং একটি শক্তিশালী `AUTH_SECRET` দিন।
5. চালান:

```bash
npm install
npx prisma generate
npx prisma db push
npm run db:seed
npm run dev
```

তারপর `http://localhost:3000` খুলুন।

## গুরুত্বপূর্ণ
Seed-এর admin account শুধুমাত্র development/bootstrap-এর জন্য। Production-এ seed password সঙ্গে সঙ্গে পরিবর্তন/অক্ষম করতে হবে।

বর্তমান Phase 1-এ:
- Customer registration/login
- Product/category browsing
- Cart
- COD checkout
- Database-backed orders
- Server-side stock deduction
- Customer order history
- Basic admin dashboard
- Product/order viewing

Production deployment-এর আগে:
- Managed PostgreSQL
- Production AUTH_SECRET
- Real business phone/WhatsApp/address
- Object storage/CDN for product uploads
- Rate limiting/WAF
- Email/SMS/WhatsApp notification provider
- bKash/Nagad/payment gateway webhook verification
- Admin CRUD screens
- Automated unit/integration/e2e tests
- Monitoring/error tracking
- Privacy/terms/refund policies
- Backup and restore plan

## ব্যবসার নাম
Fresh Meat Co


## দ্বিতীয় ধাপে যোগ করা হয়েছে
- Mobile bottom navigation
- Admin product create/enable-disable foundation
- Admin order status API + live admin order list
- Delivery-zone viewing
- Settings viewing
- Health-check endpoint `/api/health`
- Server-side order validation and stock deduction
- Customer order notifications
