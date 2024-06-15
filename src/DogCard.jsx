import { DogCardProp } from "./PropTypes/PropTypes";

function DogCard({dog, handleClick}) {
    return (
        <>
            <div onClick={() => handleClick(dog)} className={`w-[100px] h-[150px] bg-transparent cursor-pointer group perspective dog-card`}>
                <div className={`relative preserve-3d ${dog.selected || dog.completed? "my-rotate-y-180" : ""}  w-full h-full duration-1000`}>
                    <div className="absolute backface-hidden w-full h-full">
                        <img src="https://www.shutterstock.com/image-vector/letter-o-pet-logo-design-600nw-2342217833.jpg" className="w-full h-full object-cover rounded-lg shadow-md cursor-pointer transform transition duration-300 hover:scale-105" alt={dog.id} />
                    </div>
                    <div className="absolute my-rotate-y-180 backface-hidden w-full h-full dark:bg-black bg-white overflow-hidden">
                        <img src={dog.imageUrl} className="w-full h-full object-cover rounded-lg shadow-md cursor-pointer transform transition duration-300 hover:scale-105" alt={dog.id} />
                    </div>
                </div>
            </div>
        </>
    );
}

DogCard.propTypes = DogCardProp;

export default DogCard;