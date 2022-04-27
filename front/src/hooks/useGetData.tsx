import { useEffect, useState } from "react";
import { RxData } from "../types";

interface ApiResponse {
    data?: RxData[];
    error?: string;
}

export const useGetData = (url: string) : ApiResponse=> {
  const [data, setData] = useState<RxData[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {

        try {
            if(error) setError('');
            const res = await fetch(url)
            const data : RxData[]= await res.json()
            
            if (!signal.aborted) setData(data)
        } catch (err) {
            if (!signal.aborted && err instanceof Error) setError(err.message)
        } 
    }
    fetchData();

    return () => {
        abortController.abort();
      };
  }, [url]);

  return { data,  error };
}

export default useGetData;