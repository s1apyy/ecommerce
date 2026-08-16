import Pagination from '../components/Pagination'

const meta = {
  title: 'Catalog/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  args: {
    page: 3,
    totalPages: 10,
    isFetching: false,
    onPageChange: () => {},
  },
}

export default meta

export const Middle = {}

export const FirstPage = {
  args: { page: 1, totalPages: 4 },
}

export const Fetching = {
  args: { isFetching: true },
}
