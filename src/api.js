// URL de base du serveur
const BASE_URL = "https://webmobui-23-exa-backend.herokuapp.com/api";

async function getParsedData(url) {
  try {
    const response = await fetch(url);
    const parsedData = await response.json();
    //console.log(data);
    return parsedData;
  } catch (error) {
    console.error("Error fetching data", error);
  }
}

async function getEmails() {
  try {
    const parsedEmails = await getParsedData(`${BASE_URL}/emails`);
    //console.log(parsedEmails);
    return parsedEmails;
  } catch (error) {
    console.error("Error fetching emails data", error);
  }
}

async function getContentFromEmail(emailId) {
  try {
    const parsedContent = await getParsedData(`${BASE_URL}/emails/${emailId}/`);
    //console.log(parsedContent);
    return parsedContent;
  } catch (error) {
    console.error("Error fetching email content data", error);
  }
}

async function getFolders() {
  try {
    const parsedFolders = await getParsedData(`${BASE_URL}/folders`);
    //console.log(parsedFolders);
    return parsedFolders;
  } catch (error) {
    console.error("Error fetching folders data", error);
  }
}

async function getEmailsFromFolder(folderId) {
  try {
    const parsedEmailsFromFolder = await getParsedData(
      `${BASE_URL}/folders/${folderId}/emails`
    );
    //console.log(parsedEmailsFromFolder);
    return parsedEmailsFromFolder;
  } catch (error) {
    console.error("Error fetching emails from folder data", error);
  }
}
export { getEmails, getContentFromEmail, getFolders, getEmailsFromFolder };
