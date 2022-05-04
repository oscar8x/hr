import { useEffect, useState } from "react";
import { RxData } from "../types";
import { API_URL } from "../utils/constants";

interface ApiResponse {
    data?: RxData[];
    error?: string;
}

export const useGetData = (endpoint : string, updateData: boolean, setUpdateData : any) : ApiResponse=> {
  const [data, setData] = useState<RxData[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
        try {
            if(error) setError('');
            const res = await fetch(API_URL + endpoint, {signal})
            const data : RxData[]= await res.json()
            
            if (!signal.aborted) setData(data)
        } catch (err) {
            if (!signal.aborted && err instanceof Error) setError(err.message)
        } finally {
            if (!signal.aborted) setUpdateData(false)
        }
    }
    fetchData();

    return () => {
        abortController.abort();
      };
  }, [updateData]);

  return { data,  error };
}

export default useGetData;