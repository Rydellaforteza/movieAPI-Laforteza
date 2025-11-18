const Movie = require("../models/Movie");

function clean(movie) {
  return {
    _id: movie._id,
    title: movie.title,
    director: movie.director,
    year: movie.year,
    description: movie.description,
    genre: movie.genre,
    comments: movie.comments,
    __v: movie.__v
  };
}


exports.addMovie = (req, res, next) => {
  Movie.create(req.body)
    .then((movie) => res.status(201).json(clean(movie)))
    .catch(next);
};




exports.getMovies = (req, res, next) => {
  Movie.find()
    .then((movies) => res.status(200).json({ movies: movies.map(clean) }))
    .catch(next);
};


exports.getMovieById = (req, res, next) => {
  Movie.findById(req.params.id)
    .then((movie) => {
      if (!movie) return res.status(404).json({ message: "Movie not found" });
      res.status(200).json(clean(movie));
    })
    .catch(next);
};


exports.updateMovie = (req, res, next) => {
  Movie.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((movie) => {
      if (!movie) return res.status(404).json({ message: "Movie not found" });

      res.status(200).json({
        message: "Movie updated successfully",
        updatedMovie: clean(movie)
      });
    })
    .catch(next);
};


exports.deleteMovie = (req, res, next) => {
  Movie.findByIdAndDelete(req.params.id)
    .then((deleted) => {
      if (!deleted) return res.status(404).json({ message: "Movie not found" });

      res.status(200).json({ message: "Movie deleted successfully" });
    })
    .catch(next);
};


exports.addComment = (req, res, next) => {
  Movie.findById(req.params.id)
    .then((movie) => {
      if (!movie) return res.status(404).json({ message: "Movie not found" });

      movie.comments.push({
        userId: req.user.id,
        comment: req.body.comment
      });

      return movie.save();
    })
    .then((updatedMovie) => {
      res.status(200).json({
        message: "comment added successfully",
        updatedMovie: clean(updatedMovie)
      });
    })
    .catch(next);
};


exports.getComments = (req, res, next) => {
  Movie.findById(req.params.id)
    .then((movie) => {
      if (!movie) return res.status(404).json({ message: "Movie not found" });
      res.status(200).json({ comments: movie.comments });
    })
    .catch(next);
};
