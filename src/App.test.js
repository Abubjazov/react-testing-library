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
    // userEvent.click(checkbox, { ctrlKey: true, shiftKey: true })
    expect(checkbox).toBeChecked()
  })

  it('double click', () => {
    const onChange = jest.fn()
    const { container } = render(<input type={'checkbox'} onChange={onChange}/>)
    const checkbox = container.firstChild
    expect(checkbox).not.toBeChecked()
    userEvent.dblClick(checkbox)
    expect(onChange).toHaveBeenCalledTimes(2)
  })

  it('focus', () => {
   render(
      <div>
        <input data-testid={'element'} type={'checkbox'} />
        <input data-testid={'element'} type={'radio'} />
        <input data-testid={'element'} type={'number'} />
      </div>
    )

    const [checkbox, radio, number] = screen.getAllByTestId('element')

    userEvent.tab()
    expect(checkbox).toHaveFocus()

    userEvent.tab()
    expect(radio).toHaveFocus()

    userEvent.tab()
    expect(number).toHaveFocus()
  })
})
