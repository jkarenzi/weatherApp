import './App.css'
import { useEffect, useState } from 'react'
import { IoLocationSharp } from "react-icons/io5";
import ClipLoader from "react-spinners/ClipLoader";
import { IDay, IHour } from './types/Weather';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { fetchWeatherData } from './redux/weatherSlice';
import SearchBar from './components/SearchBar';


function App() {
  const dispatch = useAppDispatch()
  const {isLoading, current, location, forecast, days, error} = useAppSelector(state => state.weather)
  const [option, setOption] = useState<'today' | 'future'>('today')
  const [query, setQuery] = useState('Kigali')
  const apiKey = import.meta.env.VITE_API_KEY as string

  useEffect(() => {
    dispatch(fetchWeatherData({query,key:apiKey}))
  },[])


  return (
    <div className='w-full h-screen flex'>
      <div className='w-[25%] flex flex-col items-center py-8'>
        <SearchBar apiKey={apiKey} query={query} setQuery={setQuery}/>
        {current && location && !isLoading && <div className='flex flex-col items-center w-4/5 gap-4 mt-8'>
          <img src={current.condition.icon} width={150} height={150}/>
          <h2 className='text-2xl'>{current.temp_c} °C</h2>
          <h2 className='text-center'>{current.condition.text}</h2>
          <div className='flex items-center gap-4'>
            <IoLocationSharp color='black' size={20}/>
            <h2>{`${location.name}, ${location.country}`}</h2>
          </div>
        </div>}
        {isLoading && <div className='mt-12'>
          <ClipLoader size={50} color='black'/>
        </div>}
      </div>
      <div className='w-[75%] bg-[#f2f2f2] flex flex-col items-center overflow-y-auto py-8'>
        <div className='flex items-center self-start mb-8 ml-8'>
          <div className={`flex items-center justify-center px-4 py-2 ${option === 'today' && 'border-b-[2px] border-black'} cursor-pointer`} onClick={() => setOption('today')}>
            Today
          </div>
          <div className={`flex items-center justify-center px-4 py-2 ${option === 'future' && 'border-b-[2px] border-black'} cursor-pointer`} onClick={() => setOption('future')}>
            Future
          </div>
        </div>
        {isLoading && <div className='mt-12'>
          <ClipLoader size={50} color='black'/>
        </div>}
        <div className='flex flex-wrap w-[90%] gap-4'>
          {option === 'today' && forecast && !isLoading && forecast.hour.map((hour:IHour) => (
            <div className='flex flex-col items-center rounded-md bg-white w-32 h-32 gap-2 p-2'>
              <h2>{hour.time.split(" ")[1]}</h2>
              <img src={hour.condition.icon} width={50} height={50}/>
              <h2 className='text-center'>{hour.condition.text.length > 10 ? `${hour.condition.text.slice(0, 11)}...`:hour.condition.text}</h2>
            </div>
          ))}
          {option === 'future' && !isLoading && days.map((day:IDay) => (
            <div className='flex flex-col items-center rounded-md bg-white w-32 h-32 gap-2 p-2'>
              <h2>{day.date}</h2>
              <img src={day.day.condition.icon} width={50} height={50}/>
              <h2 className='text-center'>{day.day.condition.text.length > 10 ? `${day.day.condition.text.slice(0, 11)}...`:day.day.condition.text}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
