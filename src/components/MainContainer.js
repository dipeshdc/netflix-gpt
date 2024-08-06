import { useSelector } from 'react-redux'
import VideoTitle from './VideoTitle';
import VideoBackground from './VideoBackground';

const MainContainer = () => {

    const movies = useSelector(store => store.movies?.nowPlayingMovies);
    if (!movies) return;

    const getRandomInteger = (min, max) => {
      min = Math.ceil(min)
      max = Math.floor(max)
    
      return Math.floor(Math.random() * (max - min)) + min
    }

    const mainMovie = movies[getRandomInteger(0,19)];
    const { original_title, overview,id } = mainMovie;

  return (
    <div>
        <VideoTitle title={original_title} overview={overview} />
        <VideoBackground movieId={id} />
    </div>
  )
}

export default MainContainer