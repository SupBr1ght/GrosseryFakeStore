import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cards from "./pages/Card";
import Home from "./pages/Home";
import InfoAboutProduct from "./pages/InfoAboutProduct";
import ProductPage from "./pages/ProductsPage";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Registr from "./pages/Registr";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<InfoAboutProduct />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Profile />} />
        <Route path="/register" element={<Registr />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
