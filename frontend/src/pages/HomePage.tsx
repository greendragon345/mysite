import React from 'react'
import Tvshows from '../Components/idk/Tvshows'
import MoviesList from '../Components/movies/MoviesList'

const HomePage = () => {
  return (
    <div>
      <h1>tvshows:</h1>
      <Tvshows />
      <br></br><br></br><br></br><br></br>
      <h1>movies:</h1>
      <MoviesList />
    </div>

  )
}

export default HomePage