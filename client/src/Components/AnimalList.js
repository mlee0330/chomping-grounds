import React from "react"
import AnimalCard from "./AnimalCard"

function AnimalList({characteristics, dietType, fetchAnimal, setSearchQuery}) {
  const renderAnimalCards = (charObj, diet) => {
    try{
      let animals
      if (diet === "prey") {
        if (charObj.predators) {
          animals = charObj.predators;
        } else if (charObj.predator) {
          animals = charObj.predator
        } else {
          console.log('no pred info')
          return <h2>No predator information found</h2>
        }
      } else if (diet === "predator") {
        if (charObj.prey) {
          animals = charObj.prey
        } else if (charObj.main_prey) {
          animals = charObj.main_prey
        } else {
          return <h2>No prey information found</h2>
        }
      }

      console.log(animals.split(', '), 'this is animals')
      //check for prey vs main prey, take 'prey' 'predator' as second param

      return animals.split(', ').map((animal) => (
        <AnimalCard setSearchQuery={setSearchQuery} fetchAnimal={fetchAnimal}  key={animal} animal={animal}/>
      ));
    } catch (e) {console.log(e)}
  };

  return (
    <div className="animal-list">
      {dietType === "Omnivore" && (
        <>
          <h2>Prey</h2>
          <div className="animal-cards">{renderAnimalCards(characteristics, "predator")}</div>
          <h2>Predators</h2>
          <div className="animal-cards">{renderAnimalCards(characteristics, "prey")}</div>
        </>
      )}

      {dietType === "Carnivore" && (
        <>
          <h2>Prey</h2>
          <div className="animal-cards">{renderAnimalCards(characteristics, "predator")}</div>
        </>
      )}

      {dietType === "Herbivore" && (
        <>
          <h2>Predators</h2>
          <div className="animal-cards">{renderAnimalCards(characteristics, "prey")}</div>
        </>
      )}
    </div>
  );
}

export default AnimalList