import { getAllData } from "./firebase";
import store from "./store";
import {
  setAllCoverImagesDataHandler,
  setAllProjectsDataHandler,
  setAllServicesDataHandler,
} from "./store/collections";

export const setAllData = async (coll, limit) => {
  const allData = await getAllData(coll, limit);

  if (coll == "project_albums") store.dispatch(setAllProjectsDataHandler(allData));
  else if (coll == "service_albums") store.dispatch(setAllServicesDataHandler(allData));
  else if (coll == "cover_images") store.dispatch(setAllCoverImagesDataHandler(allData));
  
  return allData;
};