import {BrowserRouter, Routes, Route} from "react-router-dom"
import HomePage from "./components/HomePage/HomePage";
import Register from "./components/users/Register/Register";
import Login from "./components/users/Login/Login";
import Navbar from "./components/Navigation/Navbar";
import AddNewCategory from "./components/Categories/AddNewCategory";

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
     <Routes>
     <Route path="/add-category" element={<AddNewCategory/>}></Route>
     <Route exact path="/" element={<HomePage />}></Route>
     <Route path="/register" element={<Register />}></Route>
     <Route path="/login" element={<Login />}></Route>
     </Routes>
    </BrowserRouter>
  );
}

export default App;
