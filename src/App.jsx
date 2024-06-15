import { useEffect, useState } from 'react';
import './App.css';
import { useFetchDogs } from './customHooks/useFetchDogs';
import DogCard from './DogCard';
import Timer from './Timer';

function App() {
  const {dogs, handleClick, gameOver, setCount} = useFetchDogs(1);
  const [darkMode, setDarkMode] = useState(false);

  const handleNextLevel = ()=>{
    if(dogs.length < 20){
      setCount(prev => prev + 5);
    }else
      setCount(5)
  }

  useEffect(()=>{
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
       document.documentElement.classList.add("dark");
       setDarkMode(true)
      }
  },[])

  const handleDarkMode = ()=>{
      document.documentElement.classList.toggle("dark");
      setDarkMode(prev => !prev)
  }


  return (
    <div className='main-container p-3'>
      <header className='flex justify-between'>
        <Timer stopCondition={gameOver}/>

        <label className="inline-flex items-center cursor-pointer">
          <span className="ms-3 text-2xl font-medium text-gray-900 dark:text-gray-300 mr-3">Theme</span>
          <input onClick={handleDarkMode} type="checkbox" checked={darkMode} value="" className="sr-only peer"/>
          <div className="relative w-11 h-6 bg-black peer-focus:outline-none dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-black after:content-[''] after:absolute after:top-[2px] after:start-[2px] dark:after:bg-black after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-white"></div>
        </label>
      </header>

      <div className='container flex max-w-4xl flex-wrap justify-around gap-4 m-auto my-10 text-center dark:text-white'>

        {gameOver ?
          (<div>
              <p>Congratulations. You won the game!</p>
              {dogs.length < 20 ? (
                <button
                  className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                  onClick={handleNextLevel} // Add the click handler here
                >
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Next Level
                  </span>
                </button>
              ) : (
                <button
                  className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                  onClick={handleNextLevel} // Add the click handler here
                >
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Play Again
                  </span>
                </button>
              )}
            </div>)
          :
          <>
          {dogs.map(dog => <DogCard key={dog.id} dog={dog} handleClick={handleClick}/>)}
          </>
        }
      </div>
    </div>
  );
}

export default App;
