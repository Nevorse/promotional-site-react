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

  // if (coll == "project_albums") {
  //   allData = await getAllData(coll, limit);
  //   store.dispatch(setAllProjectsDataHandler(allData));
  // }
  // else if (coll == "service_albums") {
  //   allData = await getAllData(coll, limit);
  //   store.dispatch(setAllServicesDataHandler(allData));
  // }
  // else if (coll == "cover_images") {
  //   allData = await getAllData(coll, limit);
  //   store.dispatch(setAllCoverImagesDataHandler(allData));
  // } 
  // else {
  //   allData = await getAllData("cover_images", 2);
  //   store.dispatch(setAllCoverImagesDataHandler(allData));
  // }
  return allData;
};

// export const setDeleteData = async (coll, id, collData) => {
//   deleteDocument(coll, id)
//     .then(() => {
//       const arr = collData.filter((item) => item.id != id);
//       if (coll == "project_albums") store.dispatch(setAllProjectsDataHandler(arr));
//       if (coll == "service_albums") store.dispatch(setAllServicesDataHandler(arr));
//       // if (coll == "cover_images") store.dispatch(setAllCoverImagesDataHandler(arr));
//     })
//     .catch((err) => toast.error(err.message));
// };
