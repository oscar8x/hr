import React, { useEffect, useState } from "react";
import { MyError, TxData } from "../types";
import './form.css'

const INITIAL_VALUES : TxData= {
    name: '',
    value: 0,
    timestamp: ''
}

const INITIAL_ERRORS : MyError= {
    name: {touched: false, message:''},
    value: {touched: false, message:''},
    timestamp: {touched: false, message:''}
}

const Form = ( {saveData} :  {saveData : any}) => {
    const [data, setData] = useState(INITIAL_VALUES);
    const [submitDisabled, setSubmitDisabled] = useState(true);
    const [errors, setErrors] = useState<MyError>(INITIAL_ERRORS);
    const [response, setResponse] = useState('');

    useEffect(() => {
        const isValid = Object.values(errors).every(error => error.message === '' && error.touched);
        setSubmitDisabled(!isValid);
    }, [errors]);
    
    useEffect(() => {
        checkFormErrors()
    }, [data]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {    
        setErrors({...errors, [e.target.name] : {touched: true, message: ''}});      
        setData({...data, [e.target.name]: e.target.value});
    }
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const responseData = await saveData(data);
        if (responseData) setResponse(responseData);
        setData(INITIAL_VALUES);
        setErrors(INITIAL_ERRORS);
        setSubmitDisabled(true)
    }

    const checkFormErrors = () : void=> {
        const err = {
            name: data.name.length === 0 && errors.name.touched 
                    ? { ...errors.name, message:'Name is required'} 
                    : { ...errors.name, message:''},
            value: data.value <= 0  && errors.value.touched 
                    ? { ...errors.value, message:'Value must be greater than 0'} 
                    : { ...errors.value, message:''},
            timestamp: data.timestamp.length === 0  && errors.timestamp.touched
                    ? { ...errors.timestamp, message:'Time is required'} 
                    : { ...errors.timestamp, message:''},
        }

        setErrors({...err})
    }

    const showResponse = () => {
        if (response) {
            setTimeout(() => {
                setResponse('');
            }, 3000);
            return response
        }
    }

    return (
        <div className="formdiv">
            <h3>Insert data</h3>
            <form onSubmit={handleSubmit}>
                <label>
                Name
                <input type="text" name="name" value={data.name} onChange={handleChange} placeholder="Name of the task" />
                <small className="form-error">{ errors.name.message ? errors.name.message : ''}</small>
                </label>
                <label>
                Value
                <input type="number" name="value" value={data.value} onChange={handleChange} placeholder="Value of the task" />
                <small className="form-error">{ errors.value.message ? errors.value.message : ''}</small>
                </label>
                <label>
                Time
                <input type="datetime-local" name="timestamp" value={data.timestamp} onChange={handleChange}/>
                <small className="form-error">{ errors.timestamp.message ? errors.timestamp.message : ''}</small>
                </label>
                <input type="submit" value="Submit" disabled={submitDisabled}/>
            </form>
            <div id="response" data-testid="rsp" className={response ? 'response' : ''}>{showResponse()}</div>
        </div>
    )
}


export default Form;
