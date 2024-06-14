import { useEffect} from 'react';
import './App.css';
import { useFetchDogs } from './customHooks/useFetchDogs';

function App() {
  const {dogs, setCount,handleClick, gameOver} = useFetchDogs(4);

  useEffect(()=>{
    console.log(dogs)
  },[dogs])


  return (
    <>
      <div className='main-container flex max-w-6xl flex-wrap justify-around gap-4'>
        {gameOver ?
          (<div>Game Over</div>)
          :
          <>
            {dogs.map(dog => (
              <div onClick={()=>handleClick(dog)} key={dog.id} className={`${dog.selected ? "selected" : ""} ${dog.completed ? "completed" : ""}`}>
                <img className='w-60 h-60' src={dog.imageUrl} alt={dog.name.toUpperCase()}/>
              </div>
            ))}
          </>
        }
      </div>
    </>
  );
}

export default App;
