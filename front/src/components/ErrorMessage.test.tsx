import {render ,screen} from '@testing-library/react';
import ErrorMessage from './ErrorMessage';

test('Testing Error Message component', async () => {
    const { container }= render(<ErrorMessage message="Error message" />)

    screen.getByText('Error message')
    expect(container.firstChild).toHaveClass('error')
})
