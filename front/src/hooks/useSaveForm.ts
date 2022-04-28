import { useEffect, useState } from "react";
import {  TxData } from "../types"

const useSaveForm = (data : TxData) : string => {
    const [result, setResult] = useState<string>("")
    
    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
    
        const fetchData = async () => {
            await fetch('http://localhost:3004/metric', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(res => { 
                if (!signal.aborted) {
                    if(res.message) setResult(res.message);
                    else setResult('Data saved successfully')
                }
            })
            .catch(err => {if (!signal.aborted) setResult(err.message)})
        }
        fetchData();

        return () => {
            abortController.abort();
          }
    }, [data])

  return result
}

export default useSaveForm