import {fireEvent, render ,screen} from '@testing-library/react';
import Buttons from './Buttons';


test('Testing Error Message component', async () => {
    let period = 'hour'
    
    const handleClick = jest.fn()

    render(<Buttons handleClick={handleClick} period={period}/>)

    const minuteButton = screen.getByRole('button', {name: /minute/i})
    const hourButton = screen.getByRole('button', {name: /hour/i})
    const dayButton = screen.getByRole('button', {name: /day/i})

    fireEvent.click(minuteButton)
    expect(handleClick).toHaveBeenCalledTimes(1)
    expect(handleClick).toHaveBeenCalledWith("minute")

    expect(hourButton).toHaveClass('.active')
    expect(minuteButton).not.toHaveClass('.active')
    expect(dayButton).not.toHaveClass('.active')

})