import toast from "react-hot-toast";
import { deleteDocument, getAllData } from "./firebase";
import store from "./store";
import {
  setAllProjectsDataHandler,
  setAllServicesDataHandler,
} from "./store/collections";

export const setAllData = async (coll) => {
  const allData = await getAllData(coll);
  if (coll == "project_albums") {
    store.dispatch(setAllProjectsDataHandler(allData));
  }
  if (coll == "service_albums") {
    store.dispatch(setAllServicesDataHandler(allData));
  }
  return allData;
};
export const setDeleteData = async (coll, id, projects) => {
  deleteDocument(coll, id)
    .then(() => {
      const arr = projects.filter((item) => item.id != id);
      if (coll == "project_albums") store.dispatch(setAllProjectsDataHandler(arr));
      if (coll == "service_albums") store.dispatch(setAllServicesDataHandler(arr));
    })
    .catch((err) => toast.error(err.message));
};
