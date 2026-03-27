# Backend Interview Topics Coverage

This backend intentionally implements or sketches solutions for common interview topics:

- Authentication and RBAC: JWT + equireRole middleware.
- Input validation: Zod schemas for request validation.
- Pagination, filtering, sorting: /api/v1/products query params.
- Caching: Redis or LRU cache with cacheResponse middleware.
- Rate limiting: express-rate-limit global limiter.
- Idempotency: Idempotency-Key header for order creation.
- Centralized error handling: HttpError + error middleware.
- Request correlation: x-request-id support.
- Security headers + sanitization: Helmet and mongo-sanitize.
- Logging: structured logs with pino + request logs with morgan.
- Graceful shutdown: SIGINT/SIGTERM handler.
- Health checks: GET /health.
- Async processing & messaging: Kafka events + mail consumer.
- Email workflows: welcome, vendor promo, invoice, special offer.

If you'd like deeper coverage (e.g., distributed tracing, circuit breakers, retries, or advanced caching strategies), we can extend it.
