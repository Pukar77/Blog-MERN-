import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signin from "./auth/Signin.jsx";
import Login from "./auth/login.jsx";
import Home from "./pages/Home.jsx";
import PostBlog from "./pages/PostBlog.jsx";
import { Allpost } from "./pages/Allpost.jsx";
import Profile from "./pages/Profile.jsx";
import Readblog from "./pages/Readblog.jsx";

// import Navbar from "./navbar/Navbar.jsx";

const router = createBrowserRouter([
  // {
  //  path:'/',
  //  element: <Home/>
  // }
  {
    path: "/",
    element: <App />,
  },

  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/postblog",
    element: <PostBlog />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/allpost",
    element: <Allpost />,
  },

  {
    path: "/profile",
    element: <Profile />,
  },

  {
    path: "/readblog",
    element: <Readblog />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </StrictMode>
);
