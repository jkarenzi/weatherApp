import { IoSearch } from "react-icons/io5";
import { fetchWeatherData } from "../redux/weatherSlice";
import { useAppDispatch } from "../redux/hooks";


interface IProps {
    apiKey:string,
    query:string,
    setQuery: React.Dispatch<React.SetStateAction<string>>,
}

const SearchBar = ({apiKey, query, setQuery}:IProps) => {
    const dispatch = useAppDispatch()
    return (
        <div className='flex items-center gap-2 rounded-2xl px-2 border border-black w-4/5 h-10'>
          <IoSearch color='black' size={20} onClick={() => {dispatch(fetchWeatherData({query, key:apiKey}))}} className="cursor-pointer"/>
          <input type='text' className='outline-none border-none w-4/5' placeholder='Search places...' onChange={(e) => setQuery(e.target.value)}/>
        </div>
    );
}
 
export default SearchBar;