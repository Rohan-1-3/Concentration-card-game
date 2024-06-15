import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

export const useFetchDogs = (initialCount) => {
  const [count, setCount] = useState(initialCount);
  const [dogs, setDogs] = useState([]);
  const [selected, setSelected] = useState([]);
  const [point, setPoint] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    if (selected.length > 1) {
      setSelected([]);

      setIsChecking(true);
      setTimeout(() => {
        setIsChecking(false);
        setDogs(dogs.map(dog => ({ ...dog, selected: false })));
        checkForCompletion();
      }, 1000);
    }
  }, [selected, dogs]);

  useEffect(() => {
    if (point === count) {
      setGameOver(true);
    }
  }, [point]);

  function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }

  const handleClick = (tempDog) => {
    if (gameOver || isChecking || tempDog.completed || tempDog.selected) {
      return;
    }

    setSelected(prevSelected => [...prevSelected, tempDog]);
    setDogs(currentDogs =>
      currentDogs.map(dog =>
        dog.id === tempDog.id ? { ...dog, selected: true } : dog
      )
    );
  };

  const checkForCompletion = () => {
    const [firstSelected, secondSelected] = selected;

    if (firstSelected.imageUrl === secondSelected.imageUrl) {
      setPoint(prev => prev + 1);
      setDogs(currentDogs =>
        currentDogs.map(dog =>
          dog.imageUrl === firstSelected.imageUrl || dog.imageUrl === secondSelected.imageUrl
            ? { ...dog, completed: true }
            : dog
        )
      );
    }
  };

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
      }
    };

    getDogsInfo();
  }, [count]);

  return { dogs, setCount, handleClick, gameOver };
};
