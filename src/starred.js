import JsonStorage from "./lib/JsonStorage";

const starredStorage = new JsonStorage({
  name: "starred",
  eventName: "starred_updated",
});

const toggleStar = (email) => {
  if (isInStarred(email)) {
    starredStorage.removeItem(email.id);
  } else {
    starredStorage.setItem(email.id, email);
  }
};

// Vérifie si un email est dans les starred emails
const isInStarred = (email) => {
  return starredStorage.getItem(email.id);
};

// Retourne la liste des favoris sous forme de tableau avec seulement la valeur (voir slides pour explication)
const getStarred = () => {
  return starredStorage.toArray().map((e) => e[1]);
};

export { toggleStar, isInStarred, getStarred };
