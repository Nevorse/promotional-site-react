import { v4 } from "uuid";

export const getFileName = (imageFile) => {
  const type = imageFile.type.split("/")[1];
  const splittedName = imageFile.name.split(".");
  let name = "";
  for (let i = 0; i < splittedName.length - 1; i++) {
    name = name + splittedName[i];
  }
  return name + "-" + v4() + "." + type;
};