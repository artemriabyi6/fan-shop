import { render, screen } from '@testing-library/react'
import Home from './page'

describe('Home Page', () => {
  it('renders without crashing', () => {
    render(<Home />)
    // Проста перевірка на наявність елемента
    const mainElement = screen.getByRole('main')
    expect(mainElement).toBeDefined()
  })

  it('contains welcome content', () => {
    render(<Home />)
    // Шукаємо будь-який заголовок
    const headings = screen.getAllByRole('heading')
    expect(headings.length).toBeGreaterThan(0)
  })
})