import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import AnimalCard from "./AnimalCard";
import AnimalList from "./AnimalList";
import "../App.css"

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [animal, setAnimal] = useState(null);
  const [noData, setNoData] = useState(null);
  const [characteristics, setCharacteristics] = useState([]);

  // const API_KEY = process.env.REACT_APP_API_KEY;
  const API_KEY = "aEiI8WiGfOJ/sPfTZoKUjg==NWausnUB0sMHIUxr";

  const handleSearch = async (event) => {
    setNoData(false)
    event.preventDefault();
    const response = await fetch(
      `https://api.api-ninjas.com/v1/animals?name=${searchQuery}`,
      {
        headers: {
          "X-Api-Key": API_KEY
        },
      }
    );
    const data = await response.json();
    // refactor to use perfect match
    if (data.length > 0) {
      console.log(data)
      setAnimal(data[0])
      setCharacteristics(data[0].characteristics);
    } else {
      setCharacteristics([])
      setNoData(true)
      setAnimal(null)
    }
  };

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
                setSearchQuery(e.target.value); 
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
      {animal && <AnimalCard className="animal-hero" key={animal.name} animal={animal.name} />}
      {noData && <h1>Animal data not found for {searchQuery}</h1>}
      <AnimalList characteristics={characteristics} dietType={characteristics.diet}/>
      <footer>Michael Lee</footer>
    </Container>
  );
}

export default App;