const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");
const auth = require("../auth");


router.post("/addMovie", auth.authenticate, auth.requireAdmin, movieController.addMovie);
router.patch("/updateMovie/:id", auth.authenticate, auth.requireAdmin, movieController.updateMovie);
router.put("/updateMovie/:id", auth.authenticate, auth.requireAdmin, movieController.updateMovie);
router.delete("/deleteMovie/:id", auth.authenticate, auth.requireAdmin, movieController.deleteMovie);


router.get("/getMovies", movieController.getMovies);
router.get("/getMovie/:id", movieController.getMovieById);

router.patch("/addComment/:id", auth.authenticate, movieController.addComment);
router.get("/getComments/:id", auth.authenticate, movieController.getComments);

module.exports = router;
