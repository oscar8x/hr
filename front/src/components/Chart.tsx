import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, ResponsiveContainer } from 'recharts';
import { RxData, Sal } from '../types';

interface Props {
    data: RxData[]
  }

const Chart = ({ data}  : Props ) : JSX.Element => {
  const names = Array.from(new Set(data.map(item => item.name)))
  const randomColor = () => Math.floor(Math.random()*16777215).toString(16);

  const adaptNamesToChartFormat = (data: RxData[])  => data.reduce<Sal[]>((acc, val) => {
    const exists = acc.findIndex((item : Sal) => item.timePart === val.timePart)

    if(exists !== -1) {
      acc[exists][val.name] = val.value
      return acc
    }
    
    return [...acc,{
      timePart: val.timePart,
      [val.name]: val.value
    }]
}, [])


    return (
        <ResponsiveContainer width='100%' height={350}>
          <BarChart
          data={adaptNamesToChartFormat(data)}
          margin={{
            top: 5,
            right: 5,
            left: 5,
            bottom: 5,
          }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timePart" stroke="#8884d8"/>
            <YAxis stroke="#82ca9d"/>
            <Tooltip />
            <Legend />
            {names.map(name => <Bar key={name} dataKey={name} fill={"#" + randomColor()} barSize={5}/>)}
          </BarChart>
        </ResponsiveContainer>
    )
}

export default Chart