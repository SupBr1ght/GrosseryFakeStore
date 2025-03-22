import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cards from "./pages/Card";
import Home from "./pages/Home";
import InfoAboutProduct from "./pages/InfoAboutProduct";
import ProductPage from "./pages/ProductsPage";
import Profile from "./pages/Profile";

function App() {
  return(
    <Router>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<InfoAboutProduct />} />
      <Route path="/cards" element={<Cards />} />
      <Route path="/product" element={<ProductPage />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </Router>
  )

}

export default App;
