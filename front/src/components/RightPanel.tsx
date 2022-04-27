import './right-panel.css';

interface Props {
    children : JSX.Element | JSX.Element[]
}
const RightPanel = ({ children } : Props) => {
 return (<div className="right-panel">{ children} </div>)  
}

export default RightPanel