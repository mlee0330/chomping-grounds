import React, { useState, useEffect } from "react"
import AnimalCard from "./AnimalCard"
import ReactCardFlip from "react-card-flip"
import { Button, Card } from "react-bootstrap"


function HeroCard(props){
    const [animalInfo, setAnimalInfo] = useState('')
    const [isFlipped, setIsFlipped] = useState(false)

    const handleClick = (e) => {
        e.preventDefault()
        setIsFlipped(!isFlipped)
    }

    useEffect(() => {
        let infoObj = Object.entries(props.characteristics).map(([key, value]) => {
            return (
              <div><span style={{'fontWeight':'bold'}}>{key.replaceAll('_', ' ').toUpperCase(0)}: </span>{value}</div>
            );
          });
          setAnimalInfo(infoObj)
        // setAnimalInfo(props.characteristics)
      }, [props.characteristics]);

    return (
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
            <div id="heroContainer">
                <AnimalCard {...props}>
                </AnimalCard>
                <Button id="infoButton" onClick={handleClick}>Click for more facts</Button>
            </div>
            <Card onClick={handleClick}>
                <Card.Body>
                    <Card.Title>
                    Animal Facts
                    </Card.Title>
                    <div>{animalInfo}</div>
                </Card.Body>
                <Button onClick={handleClick}>Click to flip back</Button>
            </Card>
        </ReactCardFlip>
    )
}

export default HeroCard