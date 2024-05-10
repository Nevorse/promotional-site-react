import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Services from "../pages/services";
import OurProjects from "../pages/ourProjects";
import Contact from "../pages/contact";
import App from "../layout/App";
import Index from "../pages/admin";
import Admin from "../pages/admin/Admin";
import Upload_ from "../pages/admin/upload/_Upload";
// import _Services from "../pages/admin/services/_Services";
import _Collection from "../pages/admin/collection/_Collection";
import AlbumComp from "../pages/admin/components/AlbumComp";
import AboutUs from "../pages/aboutus";
import SingleAlbum from "../pages/singleAlbum";
import NotFound from "../pages/notFound";
import CoverImage_ from "../pages/admin/cover/_CoverImage";

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
        path: "/services/:album",
        element: <SingleAlbum />,
      },
      {
        path: "/projects",
        element: <OurProjects />,
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
        path: "uploads",
        element: <Upload_ />,
      },
      {
        path: "cover",
        element: <CoverImage_ />,
      },
      {
        path: "services",
        element: <_Collection />,
      },
      {
        path: "services/:id",
        element: <AlbumComp />,
      },
      {
        path: "projects",
        element: <_Collection />,
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
