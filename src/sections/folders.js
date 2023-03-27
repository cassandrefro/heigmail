import { getFolders } from "../api";

const renderFolders = async () => {
  document.querySelector(".folders-list").replaceChildren();
  const folders = await getFolders();
  //console.log(folders);

  const foldersTemplateItem = document.querySelector(
    "#folders-list-item-template"
  );
  folders.forEach((folder) => {
    const newFolderElement = foldersTemplateItem.content.cloneNode(true);
    newFolderElement.querySelector("a").href = "#folders-" + folder.id;
    newFolderElement.querySelector(".folders-list-item-name").innerHTML =
      folder.name;
    const pluriel = folder.count == 1 ? "" : "s";
    newFolderElement.querySelector(".folders-list-item-count").innerHTML =
      folder.count + " élément" + pluriel;
    document.querySelector(".folders-list").appendChild(newFolderElement);
  });
};

export { renderFolders };
