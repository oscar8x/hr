import './error-message.css'

interface Props {
    message: string
}

const ErrorMessage = ({message} : Props ) : JSX.Element => {
    return (
        <div className="error">
            <p>{message}</p>
        </div>
    )
}

export default ErrorMessage
