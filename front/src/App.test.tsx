import {fireEvent, render , screen} from '@testing-library/react';
import App from './App';

describe('Testing App', () => {
    const AppComponent = () => render(<App />)

    beforeEach(() => {
        AppComponent()
    })
    
    it("Showing labels and buttons", async () => {
        expect(screen.getByRole('heading')).toHaveTextContent('Insert data')
        screen.getByText('Name')
        screen.getByPlaceholderText(/^name of the task$/i)
        screen.getByText('Value')
        screen.getByText('Time')
        
        const submitButton = screen.getByText(/^submit$/i)
        expect(submitButton).toBeInTheDocument()
        expect(submitButton).toBeDisabled()

        const minuteButton = screen.getByRole('button', {name: /minute/i})
        expect(minuteButton).toBeInTheDocument()
        expect(minuteButton).not.toHaveClass('.active')

        const hourButton = screen.getByRole('button', {name: /hour/i})
        expect(hourButton).toBeInTheDocument()
        expect(hourButton).toHaveClass('.active')

        const dayButton = screen.getByRole('button', {name: /day/i})
        expect(dayButton).toBeInTheDocument()
    });

    it("Button change class after clicking", async () => {
        const dayButton = screen.getByRole('button', {name: /day/i})
        fireEvent.click(dayButton)
        expect(dayButton).toHaveClass('.active')
        expect(screen.getByRole('button', {name: /minute/i})).not.toHaveClass('.active')
        expect(screen.getByRole('button', {name: /hour/i})).not.toHaveClass('.active')
    })
})
