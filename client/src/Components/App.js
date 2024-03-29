import React, { useState } from "react"
import { Container, Form, Button } from "react-bootstrap"
import AnimalList from "./AnimalList"
import HeroCard from "./HeroCard"

import "bootstrap/dist/css/bootstrap.min.css"
import "../App.css"

function App() {
  const [searchQuery, setSearchQuery] = useState("")
  const [animal, setAnimal] = useState(null)
  const [noData, setNoData] = useState(false)
  const [characteristics, setCharacteristics] = useState([])

  // const API_KEY = process.env.REACT_APP_API_KEY;
  const API_KEY = "aEiI8WiGfOJ/sPfTZoKUjg==NWausnUB0sMHIUxr"

  const handleSearch = async (event) => {
    event?.preventDefault()
    fetchAnimal(searchQuery)
  }

  const fetchAnimal = async (name) => {
      setNoData(false)
      const response = await fetch(
        `https://api.api-ninjas.com/v1/animals?name=${name}`,
        {
          headers: {
            "X-Api-Key": API_KEY
          },
        }
      );
      const data = await response.json();
      // refactor to use perfect match
      // pull out state setting to separate function
      if (data.length > 0) {
        setAnimal(data[0])
        setCharacteristics(data[0].characteristics)
      } else {
        setCharacteristics([])
        setNoData(true)
        setAnimal(null)
      }
  }

  return (
    <Container>
      <h1>Welcome to the Chomping Grounds</h1>
      <div className="search-container">
      {/* add loading spinner component */}
        <Form onSubmit={handleSearch} className="search-bar">
          <Form.Control
            className="search-input"
            type="text"
            placeholder="Search for an animal"
            value={searchQuery}
            onChange={
              (e) => {
                setSearchQuery(e.target.value)
                setNoData(false)
              }
            }
          />
          <Button className="search-button" type="submit">
            Search
          </Button>
        </Form>
      </div>
      <h2>{animal?.characteristics?.diet}</h2>
      {/* {animal && <AnimalCard className="animal-hero" key={animal.name} animal={animal.name} characteristics={characteristics}/>} */}
      {animal && <HeroCard className="animal-hero" key={animal.name} animal={animal.name} characteristics={characteristics}/>}
      
      {noData && <h1>Animal data not found for {searchQuery}</h1>}
      <AnimalList setSearchQuery={setSearchQuery} fetchAnimal={fetchAnimal} characteristics={characteristics} dietType={characteristics.diet}/>
      <footer>Michael Lee</footer>
    </Container>
  );
}

export default App