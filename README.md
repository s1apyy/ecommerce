# ecommerce

Витрина **Aurelia** — учебный интернет-магазин на React.

## Стек

- React + Vite + JavaScript
- Tailwind CSS
- Zustand — корзина, промокоды, сайдбар
- TanStack Query + Axios — каталог DummyJSON (`/products`) с пагинацией и сортировкой

## Запуск

```bash
pnpm install
pnpm dev
```

Сборка: `pnpm build`. Пакетный менеджер — **pnpm** (npm/yarn не используем).

Storybook: `pnpm storybook` (порт 6006).

## Промокоды

| Код | Скидка |
| --- | --- |
| `SALE10` | −10% |
| `SALE20` | −20% |
| `WELCOME` | −$15 |
| `FREESHIP` | бесплатная доставка |

Доставка $9.99, бесплатно от $100 или по коду `FREESHIP`. Корзина сохраняется в `localStorage`.
