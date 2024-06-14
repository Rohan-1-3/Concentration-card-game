import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

export const useFetchDogs = (initialCount) => {
  const [count, setCount] = useState(initialCount);
  const [dogs, setDogs] = useState([]);
  const [selected, setSelected] = useState([]);
  const [point, setPoint] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(()=>{
    if(selected.length > 1){
        setSelected([]);
        setDogs(dogs.map(dog => ({ ...dog, selected: false })));
    }
  },[selected])

  useEffect(()=>{
    if(point/2 === count)
        setGameOver(true);
  },[point])

  function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }

  const handleClick = (tempDog)=>{
    // Assuming you have setSelected function from useState

    const updatedDogs = dogs.map(dog => {
        if (dog.id === tempDog.id) {
        // Update selected state outside of the map function
        setSelected(prev => [...prev, dog]);
        // Return a new object with selected property updated
        return { ...dog, selected: true };
        } else {
        return dog; // Return unchanged object
        }
    });

  let newUpdatedDogs = updatedDogs;
  if(selected.length > 0){
    newUpdatedDogs = updatedDogs.map(dog =>{
        if(dog.name === selected[0].name && tempDog.name === selected[0].name){
            setPoint(prev => prev+1);
            return {...dog, completed : true};
        }else return dog
    }
    )
  }

    setDogs(newUpdatedDogs);
  }

  useEffect(() => {
    const getDogsInfo = async () => {
      try {
        const response = await fetch(`https://dog.ceo/api/breeds/image/random/${count}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const newDogs = data.message.map((dog) => ({
          id: uuid(),
          name: dog.split("/")[4],
          imageUrl: dog,
          selected: false,
          completed: false
        }));
        const newDogs2 = data.message.map((dog) => ({
          id: uuid(),
          name: dog.split("/")[4],
          imageUrl: dog,
          selected: false,
          completed: false
        }));
        const newShuffledDogs = shuffleArray([...newDogs, ...newDogs2]);
        setDogs(newShuffledDogs);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Optionally handle error state or retry mechanism here
      }
    };

    getDogsInfo();
  }, [count]);

  return { dogs, setCount, handleClick, gameOver};
};
