import { useSelector } from "react-redux"
import lang from "../utils/languageConstants";
import { useRef } from "react";
import useGptMovieResult from "../hooks/useGptMovieResult";


const GptSearchBar = () => {
  const langKey = useSelector(store => store.config.lang);
  const searchText = useRef(null);
  
  const getGptMovieResult = useGptMovieResult();

  const handleClick = () => {
    getGptMovieResult(searchText);
  }


  return (
    <div className="pt-[9%] flex justify-center">
        <form className="w-1/2 bg-black grid grid-cols-12" onSubmit={(e) => e.preventDefault()}>
            <input 
              ref = {searchText}
              type="text" 
              className='p-4 m-4 col-span-9' 
              placeholder={lang[langKey].gptSearchPlaceholder}
            />
            <button className='col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg'
              onClick={handleClick}>
              {lang[langKey].search}
            </button>
        </form>
    </div>
  )
}

export default GptSearchBar