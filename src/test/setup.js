import '@testing-library/jest-dom'
import { usePrefsStore } from '../store/usePrefsStore'
import { useProfileStore } from '../store/useProfileStore'

class IntersectionObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserverMock,
})

beforeEach(() => {
  usePrefsStore.setState({ locale: 'ru', currency: 'USD' })
  useProfileStore.setState({ name: '', email: '', orders: [] })
})
