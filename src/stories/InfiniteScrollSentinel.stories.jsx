import InfiniteScrollSentinel from '../components/InfiniteScrollSentinel'

const meta = {
  title: 'Catalog/InfiniteScrollSentinel',
  component: InfiniteScrollSentinel,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Sentinel бесконечного скролла: IntersectionObserver подгружает следующую страницу DummyJSON.',
      },
    },
  },
}

export default meta

export const LoadingMore = {
  args: {
    hasNextPage: true,
    isFetchingNextPage: true,
  },
}

export const HasNext = {
  args: {
    hasNextPage: true,
    isFetchingNextPage: false,
  },
}

export const End = {
  args: {
    hasNextPage: false,
    isFetchingNextPage: false,
  },
}
