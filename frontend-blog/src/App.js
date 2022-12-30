import {BrowserRouter , Route, Routes} from "react-router-dom"
import HomePage from "./components/HomePage/HomePage";
import Register from "./components/users/Register/Register";
import Login from "./components/users/Login/Login";
import Navbar from "./components/Navigation/Navbar";
import AddNewCategory from "./components/Categories/AddNewCategory";
import CategoryList from "./components/Categories/CategoryList";
import UpdateCategory from "./components/Categories/updateCategory";
import PrivateProtectRoute from "./components/Navigation/ProtectedRotes/PrivateProtectRoute";
import AdminRoute from "./components/Navigation/ProtectedRotes/AdminRoute";
import CreatePost from "./components/Posts/CreatePost";



function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>

     <Route 
     path="/update-category/:id" 
     element={
      <AdminRoute>
     <UpdateCategory/>
     </AdminRoute>
    }> </Route>

     <Route
     exact path="/add-category" 
     element={
      <AdminRoute>
     <AddNewCategory/>
     </AdminRoute>
     }> </Route>
    
    <Route
     exact path="/category-list" 
     element={
      <AdminRoute>
     <CategoryList/>
     </AdminRoute>
     }> </Route>

     <Route exact path="/create-post" element={<CreatePost />}></Route>
     <Route exact path="/" element={<HomePage />}></Route>
     <Route path="/register" element={<Register />}></Route>
     <Route path="/login" element={<Login />}></Route>
    
     </Routes>
    </BrowserRouter>
  );
}
export default App;
