import { render, screen, fireEvent } from '@testing-library/react'
import { App } from './App'

describe('App', () => {
  it('renders App component', async () => {
    render(<App />)
    await screen.findByText(/logged in as/i)
    expect(screen.queryByText(/searches for react/i)).toBeNull()
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'React' }
    })
    expect(screen.getByText(/searches for react/i)).toBeInTheDocument()
  })
})

describe('events', () => {
  it('checkbox click', () => {
    const handleChange = jest.fn()
    const { container } = render(<input type={'checkbox'} onChange={handleChange}/>)
    const checkbox = container.firstChild
    expect(checkbox).not.toBeChecked()
    fireEvent.click(checkbox)
    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(checkbox).toBeChecked()
  })
})
