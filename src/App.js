import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SecondPage from "./components/SecondPage";
import ThridPage from "./components/ThirdPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />}/>
        <Route  path="/second" element={<SecondPage />}/>
        <Route path="second/third" element={<ThridPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
