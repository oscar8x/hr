import {  TxData } from "../types"
import { API_URL } from "./constants"

const saveForm = (data : TxData) : Promise<string> => {

    return fetch(`${API_URL}/metric`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => { 
            if(res.message) return res.message;
            return 'Data saved successfully'
    })
    .catch(err => err.message)
}

export default saveForm