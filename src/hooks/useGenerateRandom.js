import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addRandomNumber } from "../utils/movieSlice";

const useGenerateRandom = () => {
   const dispatch = useDispatch();

    const generateRandom = () => {
        const random = getRandomInt(0,19);
        dispatch(addRandomNumber(random));
    } 

    const  getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

      useEffect(() => {
        generateRandom();
      },[]);

}

export default useGenerateRandom;