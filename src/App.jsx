import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Register from "./Components/Register/Register";
import Dashboard from "./Components/Dashboard/Dashboard";
import Categories from "./Components/Categories/Categories";
import SubCategories from "./Components/SubCategories/SubCategories";
import Products from "./Components/Products/Products";
import Login from "./Components/Login/Login";

const router = createBrowserRouter([
  {
    path: "",
    element: <Dashboard />,
    children: [
      { index: true, element: <Categories /> },
      { path: "categories", element: <Categories /> },
      { path: "subcategories", element: <SubCategories /> },
      { path: "products", element: <Products /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Register /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
