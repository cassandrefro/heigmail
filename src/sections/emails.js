import { getEmails, getEmailsFromFolder, getFolders } from "../api";
import { getStarred, isInStarred, toggleStar } from "../starred";

const toggleStarIcon = (starIcon, email) => {
  if (isInStarred(email)) {
    starIcon.innerText = "star";
  } else {
    starIcon.innerText = "star_outlined";
  }
};

const renderEmails = async (emails) => {
  document.querySelector(".emails-list").replaceChildren();
  console.log(emails);

  const emailsTemplateItem = document.querySelector(
    "#emails-list-item-template"
  );
  emails.forEach((email) => {
    const newEmailElement = emailsTemplateItem.content.cloneNode(true);
    newEmailElement.querySelector("a").href = "#emails-" + email.id;
    newEmailElement.querySelector(".emails-list-item-from").innerHTML =
      email.from; //adresse email
    newEmailElement.querySelector(".emails-list-item-subject").innerHTML =
      email.subject;
    newEmailElement.querySelector(".emails-list-item-date").innerHTML =
      email.date;
    const starIcon = newEmailElement.querySelector(
      ".starred-button .material-icons"
    );
    newEmailElement
      .querySelector(".starred-button")
      .addEventListener("click", () => {
        toggleStar(email);
        toggleStarIcon(starIcon, email);
      });

    toggleStarIcon(starIcon, email);
    document.querySelector(".emails-list").appendChild(newEmailElement);
  });
};

const renderAllEmails = async () => {
  const emails = await getEmails();
  document.querySelector("#emails-section h4").innerHTML = "Inbox";
  renderEmails(emails);
};

const renderEmailsFromFolder = async (folderId) => {
  const emails = await getEmailsFromFolder(folderId);
  const folders = await getFolders();
  const folder = folders.filter((folder) => folder.id == folderId)[0];
  document.querySelector("#emails-section h4").innerHTML =
    "Dossiers > " + folder.name;
  renderEmails(emails);
};

const renderStarredEmails = () => {
  const emails = getStarred();
  document.querySelector("#emails-section h4").innerHTML =
    "Importants" + ` (${emails.length})`;
  renderEmails(emails);
};

export { renderAllEmails, renderEmailsFromFolder, renderStarredEmails };
