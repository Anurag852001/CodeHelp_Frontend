import logo from "./logo.svg";
import "./App.css";
import WelcomePage from "./pages/WelocmePage/WelcomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
