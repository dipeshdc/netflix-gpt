import LlamaAI from "llamaai";
import { API_OPTIONS } from "../utils/constants";
import {LLAMA_API} from "../utils/gptApiConstant";
import { useDispatch } from "react-redux";
import { addGptMovieResult } from "../utils/gptSlice";

const useGptMovieResult = () => {
  
    const dispatch = useDispatch();

    const searchMovieTMDB = async (movie) => {
        const data = await fetch (
          "https://api.themoviedb.org/3/search/movie?query="+
           movie+
          "&include_adult=false&language=en-US&page=1",
          API_OPTIONS
        );
        const json = await data.json();
    
        return json.results;
      }
    
      const getGptMovieResult = async (searchText) => {
        const query = `Act as a Movie Recommendation system and suggest some movies for the query ${searchText?.current?.value}. Only give me names of 5 movies, comma separated like the example result given ahead. Example: Gadar,Don,Sholay,Golmaal, Koi Mil Gaya. And don't response like here are 5 movie recommendataions. Just give name of five movies.`
  
        const llamaAPI = new LlamaAI(LLAMA_API);
        const apiRequestJson = {
          messages: [
            {
              role: 'user',
              model: 'llama-8b-chat',
              content: query
            }
          ],
          stream: false,
        };
    
        const response = await llamaAPI.run(apiRequestJson);
  
        if(!response.choices){
          //TODO: Write Error Handling
        }
        const gptMovies = response.choices[0]?.message?.content.split(",");
        console.log(response.choices?.[0]?.message?.content);
  
        const  promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
  
        const tmdbResults = await Promise.all(promiseArray);
        console.log(tmdbResults);
  
        dispatch(addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults}));
      }

      return getGptMovieResult;

}

export default useGptMovieResult