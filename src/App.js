import logo from "./logo.svg";
import "./App.css";
import WelcomePage from "./pages/WelocmePage/WelcomePage";
import SolveProblemPage from "./pages/SolveProblemPage/SolveProblemPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";

function App() {
  return (
    <Router>
      <MainPage></MainPage>
    </Router>
  );
}

export default App;
