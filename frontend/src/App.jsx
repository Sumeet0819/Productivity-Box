import React from 'react'
import Weather from './components/weather/Weather'

const App = () => {
  return (
    <div className='max-w-[1200px] h-screen bg-white p-4 items-center justify-center flex'>
      <Weather />
    </div>
  )
}

export default App