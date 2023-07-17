import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SecondPage from "./components/SecondPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />}/>
        <Route  path="/second" element={<SecondPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
