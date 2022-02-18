import { render, screen } from '@testing-library/react'
import userEvent from "@testing-library/user-event"

import { App } from './App'

describe('App', () => {
  it('renders App component', async () => {
    render(<App />)
    await screen.findByText(/logged in as/i)
    expect(screen.queryByText(/searches for react/i)).toBeNull()
    userEvent.type(screen.getByRole('textbox'), 'React')
    expect(screen.getByText(/searches for react/i)).toBeInTheDocument()
  })
})

describe('events', () => {
  it('checkbox click', () => {
    const handleChange = jest.fn()
    const { container } = render(<input type={'checkbox'} onChange={handleChange}/>)
    const checkbox = container.firstChild
    expect(checkbox).not.toBeChecked()
    userEvent.click(checkbox)
    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(checkbox).toBeChecked()
  })

  it('input focus', () => {
    render(<input type={'text'} data-testid={'simple-input'}/>)
    const input = screen.getByTestId('simple-input')
    expect(input).not.toHaveFocus()
    input.focus()
    expect(input).toHaveFocus()
  })
})
