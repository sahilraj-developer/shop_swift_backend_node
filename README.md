# ShopSwift Backend

Node.js + Express + MongoDB API built as a separate service for the ShopSwift frontend.

## What is included
- JWT auth with RBAC (dmin, endor, customer)
- Request validation with Zod
- Caching for product lists (Redis if available, otherwise LRU memory)
- Kafka event hooks for email workflows
- Email workflows (welcome, vendor login promo, order invoice, special offers)
- Rate limiting, helmet, mongo-sanitize, request IDs, idempotent order creation
- Pagination, sorting, filtering, and search for products

## Quick start
1. Create a .env from .env.example.
2. Run 
pm install inside ackend/.
3. Start MongoDB and (optional) Redis/Kafka.
4. 
pm run seed to create demo users.
5. 
pm run dev to start the API.

Default demo users (after seeding):
- dmin@shopswift.com / dmin123
- endor@shopswift.com / endor123
- customer@shopswift.com / customer123

## API overview
- GET /health
- POST /api/v1/auth/register
- POST /api/v1/auth/login
- GET /api/v1/products (supports page, limit, sort, minPrice, maxPrice, search)
- POST /api/v1/products (vendor/admin)
- GET /api/v1/orders (customer)
- POST /api/v1/orders (customer, supports Idempotency-Key header)
- POST /api/v1/marketing/special-offer (admin)

## Frontend connection
Set VITE_API_URL in the frontend to http://localhost:4000/api/v1.
