import NavBar from "./components/NavBar";
import ScoreBoard from "./components/ScoreBoard";

function App() {
  return (
    <div style={{ width: "100%", padding: "0", margin: "0", height: "89vh" }}>
      <NavBar />
      <ScoreBoard />
    </div>
  );
}

export default App;
