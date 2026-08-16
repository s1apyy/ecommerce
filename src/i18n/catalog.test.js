import { translateCategory, translateProductTitle } from './catalog'

describe('catalog i18n', () => {
  it('translates category slugs', () => {
    expect(translateCategory('smartphones', 'ru')).toBe('Смартфоны')
    expect(translateCategory('smartphones', 'en')).toBe('Smartphones')
  })

  it('translates product titles by id and falls back to the API title', () => {
    expect(translateProductTitle({ id: 1, title: 'Essence Mascara Lash Princess' }, 'ru')).toBe(
      'Тушь Essence Lash Princess',
    )
    expect(translateProductTitle({ id: 1, title: 'Essence Mascara Lash Princess' }, 'en')).toBe(
      'Essence Mascara Lash Princess',
    )
    expect(translateProductTitle({ id: 999, title: 'Unknown Item' }, 'ru')).toBe('Unknown Item')
  })
})
