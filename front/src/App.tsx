import {  Suspense, useState } from 'react'
import './App.css'
import Buttons from './components/Buttons';
import ErrorMessage from './components/ErrorMessage';
import Form from './components/Form';
import Chart from './components/Chart';
import { useGetData } from './hooks/useGetData';
import RightPanel from './components/RightPanel';
import saveForm from './utils/saveForm';

const App = () :JSX.Element => {
  const [period, setPeriod] = useState('hour')
  const [updateData, setUpdateData] = useState(false)
  const periodEP = '/metric?period='
  const {data =[] , error} = useGetData( periodEP + period, updateData, setUpdateData)

  const handleClick = (period: string) => {
    setPeriod(period)
    setUpdateData(true)
  }

  return (
    <>
    { error && <ErrorMessage message={error}/> }
    <div className="App">
      <Form saveData={saveForm} setUpdateData= {setUpdateData}/>
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


