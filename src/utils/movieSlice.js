import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
    name: "movies",
    initialState: {
        nowPlayingMovies: null,
        popularMovies:null,
        topRatedMovies:null,
        upcomingMovies:null,
        trailerVideo: null,
        random:null,
    },
    reducers: {
        addNowPlayingMovies: (state, action) => {
            state.nowPlayingMovies = action.payload;
        },
        addPopularMovies: (state, action) => {
            state.popularMovies = action.payload;
        },
        addTopRateMovies: (state, action) => {
            state.topRatedMovies = action.payload;
        },
        addUpcomingMovies: (state, action) => {
            state.upcomingMovies = action.payload;
        },
        addTrailerVideo: (state, action) => {
            state.trailerVideo = action.payload;
        },
        addRandomNumber: (state,action) => {
            state.random = action.payload;
        },
    },
});

export const { addNowPlayingMovies,addPopularMovies,addTopRateMovies,addUpcomingMovies ,addTrailerVideo, addRandomNumber } = moviesSlice.actions;
export default moviesSlice.reducer; 