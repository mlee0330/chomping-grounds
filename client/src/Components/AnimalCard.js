import React, { useState, useEffect } from "react"
import { Card } from "react-bootstrap"

function AnimalCard({ animal, className, fetchAnimal, setSearchQuery, characteristics}) {
  const [animalName, setAnimalName] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  // const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    try {
      const fetchAnimalImg = async (name) => {
          const pexelsData = await fetch(`https://api.pexels.com/v1/search?query=${name}&size=medium`, {
            headers: {
              Authorization: "o2251Cpmrbfp09fEWihRsXU2lMDtMHkS6tNY6rFTfM3XgvxS4TwRqTwv"
            }
          });
          const pexelData = await pexelsData.json()
          setImageUrl(pexelData.photos[Math.floor(Math.random()*10)]?.src.medium)
      };

      const name = animal[animal.length - 1] === "s" ? animal.substring(0, animal.length - 1) : animal
      setAnimalName(name)
      fetchAnimalImg(name)
    } catch (e) {
      console.log(e)
    }
  }, [animal, characteristics]);

  const handleClick = async (e) => {
    try {
      setSearchQuery(animalName)
      fetchAnimal(animalName)
    } catch (e) {console.log(e)}
  }

  return (
    <Card className="animal-card" onClick={handleClick}>
      <Card.Body>
        <Card.Title>
          {animal} 
        </Card.Title>
        {/* <div>{JSON.stringify(animalData)}</div> */}
      </Card.Body>
      <div className="img-container">
        <Card.Img variant="top" src={imageUrl} />
      </div>
      
    </Card>
  );
}

export default AnimalCard