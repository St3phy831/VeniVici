import { useState } from "react";
import DogCard from "./components/DogCard";
import BanList from "./components/BanList";
import "./App.css";

function App() {
  const [banList, setBanList] = useState({
    name: [],
    breed_group: [],
    life_span: [],
  });

  const updateBanList = (key, value) => {
    let newBanListItem = {};
    switch (key) {
      case "name":
        newBanListItem = { name: [...banList[key], value] };
        break;
      case "breed_group":
        newBanListItem = { breed_group: [...banList[key], value] };
        break;
      case "life_span":
        newBanListItem = { life_span: [...banList[key], value] };
        break;
      default:
        // Nothing will be updated otherwise
        console.log("Invalid option!");
    }
    const newBanList = { ...banList, ...newBanListItem };
    setBanList(newBanList);
  };

  return (
    <div className="App">
      <DogCard handleSetBanList={updateBanList}></DogCard>
      <BanList list={banList}></BanList>
    </div>
  );
}

export default App;
