import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./DogCard.css";

const DogCard = () => {
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
        <Button variant="primary">Discover</Button>
      </Card>
    </div>
  );
};

export default DogCard;
