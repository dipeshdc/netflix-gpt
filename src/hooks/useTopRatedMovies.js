import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTopRateMovies } from "../utils/movieSlice";
import { useEffect } from "react";



const useTopRateMovies = () => {
  // Fetch Data from TMDB API and update store
  const dispatch = useDispatch();

  const getTopRateMovies = async () => {
  const data = await fetch('https://api.themoviedb.org/3/movie/top_rated?page=1',
    API_OPTIONS
   );
   const json = await data.json();
   dispatch(addTopRateMovies(json.results));
  };

  useEffect(() => {
    getTopRateMovies();
  },[]);
};

export default useTopRateMovies;