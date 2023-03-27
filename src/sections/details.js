import { getContentFromEmail } from "../api";

const renderDetails = async (emailId) => {
  const details = await getContentFromEmail(emailId);
  //console.log(details);

  const subject = document.querySelector("#email-details-section h4");
  const from = document.querySelector("#email-details-section h6");
  const date = document.querySelector("#email-details-section b");
  const message = document.querySelector("#email-details-section p");

  subject.innerHTML = details.subject;
  from.innerHTML = details.from;
  date.innerHTML = details.date;
  message.innerHTML = details.message;
};

export { renderDetails };
