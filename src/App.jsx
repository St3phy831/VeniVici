import DogCard from "./components/DogCard";
import BanList from "./components/BanList";
import "./App.css";

function App() {
  /*
  TODO: Will need to create state for ban_list: may be dictionary with different categories and an array of them.
  Will need to pass state and setState function to DogCard.
  */

  return (
    <div className="App">
      <DogCard></DogCard>
      <BanList></BanList>
    </div>
  );
}

export default App;
