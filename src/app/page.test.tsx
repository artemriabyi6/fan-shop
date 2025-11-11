import { render, screen } from '@testing-library/react'
import Header from '@/components/Header'



describe('Header Component - Simple Tests', () => {
  it('renders club name', () => {
    render(<Header />)
    expect(screen.getByText('ФК Вікторія')).toBeDefined()
  })

  it('renders navigation links', () => {
    render(<Header />)
    expect(screen.getByText('Головна')).toBeDefined()
    expect(screen.getByText('Товари')).toBeDefined()
  })

})