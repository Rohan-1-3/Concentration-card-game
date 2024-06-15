import './App.css';
import { useFetchDogs } from './customHooks/useFetchDogs';
import DogCard from './DogCard';

function App() {
  const {dogs, handleClick, gameOver} = useFetchDogs(6);

  return (
    <>
      <div className='main-container flex max-w-4xl flex-wrap justify-around gap-4'>
        {gameOver ?
          (<div>Game Over</div>)
          :
          <>
          {dogs.map(dog => <DogCard key={dog.id} dog={dog} handleClick={handleClick}/>)}
          </>
        }
      </div>
    </>
  );
}

export default App;
