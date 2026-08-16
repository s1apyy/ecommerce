# ecommerce

Витрина **Aurelia** — учебный интернет-магазин на React. Ветвление по GitFlow: `main` ← `dev` ← `feature/*`.

## Стек

- React + Vite + JavaScript, пакетный менеджер **pnpm**
- Tailwind CSS
- Zustand — корзина, промокоды, сайдбар
- TanStack Query + Axios — DummyJSON `/products` (`useInfiniteQuery`) и POST `/carts/add`
- Storybook 8 — документация UI
- Jest + React Testing Library

## Запуск

```bash
pnpm install
pnpm dev
```

| Команда | Назначение |
| --- | --- |
| `pnpm dev` | магазин |
| `pnpm test` | unit-тесты |
| `pnpm storybook` | UI на порту 6006 |
| `pnpm build` | продакшен-сборка |

npm и yarn не используем.

## Фичи

- Бесконечный скролл каталога (`useInfiniteQuery`)
- Фильтры: категория, цена, рейтинг (часть в query-string)
- Корзина с суммой позиций, скидкой и доставкой
- Симуляция заказа: `POST https://dummyjson.com/carts/add`

## Промокоды

| Код | Скидка |
| --- | --- |
| `SALE10` | −10% |
| `SALE20` | −20% |
| `WELCOME` | −$15 |
| `FREESHIP` | бесплатная доставка |

Доставка $9.99, бесплатно от $100 или по коду `FREESHIP`. Корзина сохраняется в `localStorage`.

## GitFlow

1. Фича от `dev`: `git checkout -b feature/<task> dev`
2. Merge в `dev` (`--no-ff`)
3. Релиз: merge `dev` → `main`
