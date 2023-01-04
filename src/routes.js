import React from "react";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";

const Home = React.lazy(() => import("./Pages/Home"));
const Playground = React.lazy(() => import("./Pages/Playground"));
const Page404 = React.lazy(() => import("./Pages/Page404"));

const routes = [
  {
    path: "/",
    component: <Signup />,
  },
  {
    path: "/home",
    component: <Home />,
  },
  {
    path: "/login",
    component: <Login />,
  },
  {
    path: "/code/:folderId/:playgroundId",
    component: <Playground />,
  },
  {
    path: "*",
    component: <Page404 />,
  },
];

export default routes;
