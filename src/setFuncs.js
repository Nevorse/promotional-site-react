import { getAllData } from "./firebase";
import store from "./store";
import {
  setAllCoverImagesDataHandler,
  setAllProjectsDataHandler,
  setAllProjectFoldersDataHandler,
  setAllServicesDataHandler,
} from "./store/collections";

export const setAllData = async (coll, folderId, limit) => {
  const allData = await getAllData(coll, folderId, limit);
  
  if (!folderId) {
    if (coll == "project_albums") store.dispatch(setAllProjectsDataHandler(allData));
    else if (coll == "service_albums") store.dispatch(setAllServicesDataHandler(allData));
    else if (coll == "cover_images") store.dispatch(setAllCoverImagesDataHandler(allData));
  } else if (folderId) {
    if (coll == "project_albums") store.dispatch(setAllProjectFoldersDataHandler(
      {
        id: folderId, 
        data: allData
      }
    ));
  }
  return allData;  
};