import React from 'react'
import NavBar from './NavBar'
import ScoreBoard from './ScoreBoard'

function Home() {
  return (
    <div className="h-screen">
      <NavBar />
      <ScoreBoard />
    </div>
  )
}

export default Home