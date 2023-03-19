import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./DogCard.css";

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
const QUERY = `https://api.thedogapi.com/v1/images/search?api_key=${ACCESS_KEY}&limit=5&has_breeds=true&size=small`;

const DogCard = (props) => {
  const [dogInfo, setDogInfo] = useState({
    url: "",
    name: "",
    breed_group: "",
    life_span: "",
    none_found: false,
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
    // console.log(data);
    const result = data.filter(filterDogs);
    // console.log(result);
    if (result.length > 0) {
      const dogData = result[0];
      setDogInfo({
        url: dogData.url,
        name: dogData.breeds[0].name,
        breed_group: dogData.breeds[0].breed_group,
        life_span: dogData.breeds[0].life_span,
        none_found: false,
      });
    } else {
      // Didn't find appropriate response, so reset info
      setDogInfo({
        url: "",
        name: "",
        breed_group: "",
        life_span: "",
        none_found: true,
      });
    }
  };

  const filterDogs = (data) => {
    // make sure dog info conforms to user's ban list
    // console.log(data.breeds[0]);
    const breedInfo = data.breeds[0];
    const list = props.list;
    return (
      !list.name.includes(breedInfo.name) &&
      !list.breed_group.includes(breedInfo.breed_group) &&
      !list.life_span.includes(breedInfo.life_span)
    );
  };

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
          {dogInfo.none_found && (
            <p className="noResults">
              No results with those specifications were found. Try again please
              🥺
            </p>
          )}
          {dogInfo.name && (
            <Button
              variant="primary"
              className="dogInfoBtn"
              onClick={() => {
                props.handleSetBanList("name", dogInfo.name);
              }}
            >
              {dogInfo.name}
            </Button>
          )}
          {dogInfo.breed_group && (
            <Button
              variant="primary"
              className="dogInfoBtn"
              onClick={() => {
                props.handleSetBanList("breed_group", dogInfo.breed_group);
              }}
            >
              {dogInfo.breed_group}
            </Button>
          )}
          {dogInfo.life_span && (
            <Button
              variant="primary"
              className="dogInfoBtn"
              onClick={() => {
                props.handleSetBanList("life_span", dogInfo.life_span);
              }}
            >
              {dogInfo.life_span}
            </Button>
          )}
        </div>
        {dogInfo.url && (
          <div>
            <img
              className="dogImage"
              src={dogInfo.url}
              alt="Dog image returned"
            />
          </div>
        )}
        <Button variant="primary" onClick={updateDogInfo}>
          Discover
        </Button>
      </Card>
    </div>
  );
};

export default DogCard;
