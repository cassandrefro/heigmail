import { renderDetails } from "./sections/details";
import {
  renderAllEmails,
  renderEmailsFromFolder,
  renderStarredEmails,
} from "./sections/emails";
import { renderFolders } from "./sections/folders";

// S'occuper de "toggler" les liens dans la navigation
// Désactiver le lien actif et activer le nouveau en bleu, selon l'url passée en paramètre de la fonction
const toggleNav = (hash) => {
  document.querySelector(`nav a.active`)?.classList.remove("active");
  document.querySelector(`nav a[href="${hash}"]`)?.classList.add("active");
};

// S'occuper de "toggler" les sections dans le body, en cachant la section actuellement affichée, puis en ajoutant
// la classe active à la nouvelle pour l'afficher
const toggleSection = (hash) => {
  document.querySelector(`section.active`)?.classList.remove("active");
  document.querySelector(`${hash}-section`)?.classList.add("active");
};

const displaySection = (hash) => {
  if (hash == "") hash = "#dashboard";

  const hashSplit = hash.split("-");

  toggleNav(hashSplit[0]);
  toggleSection(hashSplit[0]);

  switch (hashSplit[0]) {
    case "#inbox":
      renderAllEmails();
      toggleSection("#emails");
      break;

    case "#folders":
      if (hashSplit[1]) {
        renderEmailsFromFolder(hashSplit[1]);
        toggleSection("#emails");
      } else {
        renderFolders();
      }
      break;
    case "#emails":
      if (hashSplit[1]) {
        renderDetails(hashSplit[1]);
        toggleSection("#email-details");
      }
      break;

    case "#starred":
      renderStarredEmails();
      toggleSection("#emails");
      break;

    default:
      break;
  }

  // ...
};

window.addEventListener("starred_updated", () => {
  if (window.location.hash == "#starred") renderStarredEmails();
});

window.addEventListener("hashchange", () =>
  displaySection(window.location.hash)
);
displaySection(window.location.hash);

window.addEventListener("offline", () =>
  document.body.classList.add("offline")
);
window.addEventListener("online", () =>
  document.body.classList.remove("offline")
);

navigator.serviceWorker.register(
  new URL("workerCacheFetched.js", import.meta.url)
);
