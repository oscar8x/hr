import './buttons.css';

interface Props{
    handleClick: (period: string) => void,
    period: string
}
const Buttons = ({handleClick, period} : Props) => {

    return(
        <div className='buttons'>
            <button onClick={() => handleClick('minute') } className={period === "minute" ? '.active' : ''}>Minute</button>
            <button onClick={() => handleClick('hour')} className={period === "hour" ? '.active' : ''}>Hour</button>
            <button onClick={() => handleClick('day')} className={period === "day" ? '.active' : ''}>Day</button>
        </div>
    )
}

export default Buttons