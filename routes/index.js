var express = require("express");
var router = express.Router();

const fetch = require("node-fetch");

router.get("/movies", (req, res) => {
  fetch("https://api.themoviedb.org/3/trending/movie/day", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.movieAPIKey}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((apiData) => {
      if (apiData && Object.keys(apiData)) {
        console.log(apiData.results.length);
        res.json({
          result: true,
          //   movies: apiData.results,
          movies: apiData.results.sort(
            (a, b) => new Date(b.release_date) - new Date(a.release_date)
          ),
        });
      } else {
        res.json({
          result: false,
          error: "No result from the /GET route of TMDB",
        });
      }
    });
});

module.exports = router;
