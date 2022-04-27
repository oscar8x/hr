import {  TxData } from "../types"

const useSaveForm = (data : TxData) : Promise<string> => {
  return fetch('http://localhost:3004/metric', {
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

export default useSaveForm