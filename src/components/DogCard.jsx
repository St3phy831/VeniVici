import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./DogCard.css";

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
const QUERY = `https://api.thedogapi.com/v1/images/search?api_key=${ACCESS_KEY}&limit=5&has_breeds=true&size=small`;

const DogCard = (props) => {
  // TODO: Will need get ban_list state and function as props
  const [dogInfo, setDogInfo] = useState({
    url: "",
    name: "",
    breed_group: "",
    life_span: "",
  });

  const callAPI = async () => {
    const response = await fetch(QUERY);
    const json = await response.json();
    if (json.length === 0) {
      alert("Oops! Something went wrong with that query, let's try again!");
    }
    return json;
  };

  const updateDogInfo = async () => {
    const data = await callAPI().catch(console.error);
    const dogData = data[0];
    // TODO: Will need to filter results based on ban_list
    /* 
    TODO: Once get filtered array, if results use data to setDogInfo. 
    Otherwise, clear data and display message that no result with specifications was found.
    Can do this by adding another key-value pair in dogInfo state
    */
    setDogInfo({
      url: dogData.url,
      name: dogData.breeds[0].name,
      breed_group: dogData.breeds[0].breed_group,
      life_span: dogData.breeds[0].life_span,
    });
  };

  // TODO: Will need to create check functions to filter by each attribute of ban_list

  return (
    <div className="DogCard">
      <Card>
        <Card.Title className="cardTitle">Doggie World</Card.Title>
        <Card.Text className="cardText">
          Want to see some special doggies and make your day! Then, click the
          button below to discover a world of happiness :{")"}
          <div className="dogEmojis">
            🐶🐕🐩🐾🐶🐕🐩🐾🐶🐕🐩🐾🐶🐕🐩🐾🐶🐕🐩🐾
          </div>
        </Card.Text>
        <div className="dogInfo">
          {dogInfo.name ? (
            <Button
              variant="primary"
              className="dogInfoBtn"
              onClick={() => {
                props.handleSetBanList("name", dogInfo.name);
              }}
            >
              {dogInfo.name}
            </Button>
          ) : (
            <div> </div>
          )}
          {dogInfo.breed_group ? (
            <Button
              variant="primary"
              className="dogInfoBtn"
              onClick={() => {
                props.handleSetBanList("breed_group", dogInfo.breed_group);
              }}
            >
              {dogInfo.breed_group}
            </Button>
          ) : (
            <div> </div>
          )}
          {dogInfo.life_span ? (
            <Button
              variant="primary"
              className="dogInfoBtn"
              onClick={() => {
                props.handleSetBanList("life_span", dogInfo.life_span);
              }}
            >
              {dogInfo.life_span}
            </Button>
          ) : (
            <div> </div>
          )}
        </div>
        {dogInfo.url ? (
          <div>
            <img
              className="dogImage"
              src={dogInfo.url}
              alt="Dog image returned"
            />
          </div>
        ) : (
          <div> </div>
        )}
        <Button variant="primary" onClick={updateDogInfo}>
          Discover
        </Button>
      </Card>
    </div>
  );
};

export default DogCard;
