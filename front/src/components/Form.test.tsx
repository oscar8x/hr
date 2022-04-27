import Form from './Form';
import {fireEvent, render , screen, waitFor} from '@testing-library/react';

it('Submit button is enabled after filling the form and send data ok', async () => {
    const mockSave= jest.fn()
    mockSave.mockReturnValueOnce(Promise.resolve( 'Data saved successfully'))

    render(<Form saveData={mockSave}/>)
    const nameInput = screen.getByPlaceholderText(/^name of the task$/i)
    const valueInput = screen.getByLabelText(/^value$/i)
    const timeInput = screen.getByLabelText(/^time$/i)

    fireEvent.change(nameInput, {target: {value: 'Test'}})
    fireEvent.change(valueInput, {target: {value: "100"}})
    fireEvent.change(timeInput, {target: {value: '2022-04-27T10:41'}})

    const submitButton = screen.getByText(/^submit$/i)
    expect(submitButton).not.toBeDisabled()

    fireEvent.click(submitButton)

    await waitFor(() => {
        expect(mockSave).toHaveBeenCalledTimes(1)
        expect(mockSave).toHaveBeenCalledWith({
            name: 'Test',
            value: "100",
            timestamp: '2022-04-27T10:41'
        })

        const respDiv =screen.getByTestId("rsp")
        expect(respDiv).toHaveTextContent('Data saved successfully')
        expect(respDiv).toHaveClass('response')
    })

})