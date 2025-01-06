import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Services from "../pages/services";
import Projects from "../pages/projects";
import Contact from "../pages/contact";
import App from "../layout/App";
import Index from "../pages/admin";
import Admin from "../pages/admin/Admin";
import _Collection from "../pages/admin/collection/_Collection";
import AlbumComp from "../pages/admin/album/AlbumComp";
import AboutUs from "../pages/aboutus";
import SingleAlbum from "../pages/singleAlbum";
import NotFound from "../pages/notFound";
import _Folder from "../pages/admin/folder";
import FolderAlbumComp from "../pages/admin/album/FolderAlbumComp";
import Folder from "../pages/folder";

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
        element: <Projects />,
      },
      {
        path: "/services/:album",
        element: <SingleAlbum />,
      },
      {
        path: "/projects/:id",
        element: <Folder />,
      },
      {
        path: "/projects/:folder/:album",
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
        path: "projects",
        element: <_Collection />,
      },
      {
        path: "projects/:id",
        element: <_Folder />,
      },
      {
        path:"projects/:id/:id",
        element:<FolderAlbumComp/>
      },
      {
        path: "services",
        element: <_Collection />,
      },
      {
        path: "services/:id",
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