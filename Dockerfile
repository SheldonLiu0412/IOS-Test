FROM node:18-alpine AS base

FROM base AS deps
WORKDIR /app
COPY . .
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app ./
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
ENV HOSTNAME 0.0.0.0

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN mkdir -p .next/cache && chown -R nextjs:nodejs .next

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

RUN chown -R nextjs:nodejs .next
RUN chown -R nextjs:nodejs public

USER nextjs

EXPOSE 3005
ENV PORT 3005

CMD ["node", "server.js"] 