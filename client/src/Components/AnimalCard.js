import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";

function AnimalCard({ animal, className }) {
  const [animalName, setAnimalName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  // const API_KEY = process.env.REACT_APP_API_KEY;
  const API_KEY = "aEiI8WiGfOJ/sPfTZoKUjg==NWausnUB0sMHIUxr";

  useEffect(() => {
    try {
      const fetchAnimalImg = async (name) => {
          const pexelsData = await fetch(`https://api.pexels.com/v1/search?query=${name}&size=small`, {
            headers: {
              Authorization: "o2251Cpmrbfp09fEWihRsXU2lMDtMHkS6tNY6rFTfM3XgvxS4TwRqTwv"
            }
          });
          const pexelData = await pexelsData.json();
          setImageUrl(pexelData.photos[0].src.medium);
      };

      const animalName = animal[animal.length - 1] === "s" ? animal.substring(0, animal.length - 1) : animal
      setAnimalName(animalName)
      fetchAnimalImg(animalName);
    } catch (e) {
      console.log(e)
    }
  }, []);

  return (
    <Card className={`animal-card ${className}`}>
      <Card.Body>
        <Card.Title>{animalName}</Card.Title>
        {/* <div>{JSON.stringify(animalData)}</div> */}
      </Card.Body>
      <div className="img-container">
        <Card.Img variant="top" src={imageUrl} />
      </div>
      
    </Card>
  );
}

export default AnimalCard;