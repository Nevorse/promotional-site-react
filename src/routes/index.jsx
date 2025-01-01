import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Services from "../pages/services";
import OurProjects from "../pages/ourProjects";
import Contact from "../pages/contact";
import App from "../layout/App";
import Index from "../pages/admin";
import Admin from "../pages/admin/Admin";
import _Collection from "../pages/admin/collection/_Collection";
import AlbumComp from "../pages/admin/album/AlbumComp";
import AboutUs from "../pages/aboutus";
import SingleAlbum from "../pages/singleAlbum";
import NotFound from "../pages/notFound";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/projects",
        element: <OurProjects />,
      },
      {
        path: "/services/:album",
        element: <SingleAlbum />,
      },
      {
        path: "/projects/:album",
        element: <SingleAlbum />,
      },
      {
        path: "/aboutus",
        element: <AboutUs />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/admin",
    element: <Index />,
    children: [
      {
        index: true,
        element: <Admin />,
      },
      {
        path: "cover",
        element: <AlbumComp />,
      },
      {
        path: "services",
        element: <_Collection />,
      },
      {
        path: "projects",
        element: <_Collection />,
      },
      {
        path: "services/:id",
        element: <AlbumComp />,
      },
      {
        path: "projects/:id",
        element: <AlbumComp />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;