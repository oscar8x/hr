export interface baseData {
    name: string,
    value: number,
}

export interface RxData extends baseData {
    timePart: string
}

export interface TxData extends baseData{
    timestamp: string
}

export type Sal = {
    [key: string]: number | string
}

type errorProps = 'name' | 'value' | 'timestamp';
export type MyError = {
    [key in errorProps]: {
        touched: boolean,
        message: string
    }
}