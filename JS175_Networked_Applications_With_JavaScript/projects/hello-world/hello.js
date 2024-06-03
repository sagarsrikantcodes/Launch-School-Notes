const express = require("express");
const app = express();

const COUNTRY_DATA = [
  {
    path: "/english",
    flag: "flag-of-United-States-of-America.png",
    alt: "US Flag",
    title: "Go to US English site",
  },
  {
    path: "/french",
    flag: "flag-of-France.png",
    alt: "Drapeau de la france",
    title: "Aller sur le site français",
  },
  {
    path: "/serbian",
    flag: "flag-of-Serbia.png",
    alt: "Застава Србије",
    title: "Идите на српски сајт",
  },
  {
    path: "/german",
    flag: "flag-of-Germany.png",
    alt: "Deutsche Flagge",
    title: "Zur deutschen Seite",
  },
];

const LANGUAGE_CODES = {
  english: "en-US",
  french: "fr-FR",
  serbian: "sr-Cryl-rs",
  german: "de-DE"
};

// console.log(app);
const PORT = 3000;
const morgan = require("morgan");

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("public"));
app.use(morgan("common"));
/*
const writeLog = (req, res) => {
  let timeStamp = String(new Date()).substring(4, 24); // Mmm dd YYYY HH:MM:SS
  console.log(`${timeStamp} ${req.method} ${req.originalUrl} ${res.statusCode}`);
};
*/

app.locals.currentPathClass = (path, currentPath) => {
  return path === currentPath ? "current" : "";
};

/*
const helloWorld = (view, language) => {
  return (req, res) => {
    res.render(view, {
      countries: COUNTRY_DATA,
      currentPath: req.path,
      language: language,
    });
  };
};
*/

/*
const showEnglishView = (req, res) => {
  res.render("hello-world-english", {
    countries: COUNTRY_DATA,
    currentPath: req.path,
    language: "en-US",
  });
  // writeLog(req, res);
  
};

app.get("/", showEnglishView);
app.get("/english", showEnglishView);

app.get("/french", (req, res) => {
  res.render("hello-world-french", {
    countries: COUNTRY_DATA,
    currentPath: req.path,
    language: "fr-FR",
  });
  // writeLog(req, res);
});

app.get("/serbian", (req, res) => {
  res.render("hello-world-serbian", {
    countries: COUNTRY_DATA,
    currentPath: req.path,
    language: "sr-Cyrl-rs",
  });
  // writeLog(req, res);
});

app.get("/german", (req, res) => {
  res.render("hello-world-german", {
    countries: COUNTRY_DATA,
    currentPath: req.path,
    language: "de-DE"
  });
  // writeLog(req, res);
});
*/
/*
app.get("/english", helloWorld("hello-world-english", "en-US"));
app.get("/french", helloWorld("hello-world-french", "fr-FR"));
app.get("/serbian", helloWorld("hello-world-serbian", "sr-Cyrl-rs"));
app.get("/german", helloWorld("hello-world-german", "de-DE"));
*/

app.get("/", (req, res) => {
  res.redirect("/english");
});

app.get("/:language", (req, res, next) => {
  const language = req.params.language;
  const languageCode = LANGUAGE_CODES[language];
  if (!languageCode) {
    // res.status(404).send(`Language not supported: ${language}`);
    next(new Error(`Language not supported: ${language}`));
  } else {
    res.render(`hello-world-${language}`, {
      countries: COUNTRY_DATA,
      currentPath: req.path,
      language: languageCode,
    });
  }
});

// error handler
app.use((err, req, res, _next) => {
  console.log(err);
  res.status(404).send(err.message);
});

app.listen(PORT, "localhost", () => {
  console.log(`Listening to port ${PORT}.`);
});

