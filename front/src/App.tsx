import {  Suspense, useState } from 'react'
import './App.css'
import Buttons from './components/Buttons';
import ErrorMessage from './components/ErrorMessage';
import Form from './components/Form';
import Chart from './components/Chart';
import { useGetData } from './hooks/useGetData';
import { API_URL } from './utils/constants';
import RightPanel from './components/RightPanel';
import useSaveForm from './hooks/useSaveForm';

const App = () :JSX.Element => {
  const [period, setPeriod] = useState('hour')
  const baseURL = `${API_URL}/metric?period=`
  const {data = [], error} = useGetData( baseURL + period)

  const handleClick = (period: string) => {
    setPeriod(period)
  }

  return (
    <>
    { error && <ErrorMessage message={error}/> }
    <div className="App">
      <Form saveData={useSaveForm}/>
      <Suspense fallback={<p>Loading...</p>}> 
          <RightPanel>
            <Buttons handleClick={handleClick} period={period}/>
            <Chart data={data}/>
          </RightPanel>
      </Suspense>
    </div>
    </>
  )
  }
export default App


