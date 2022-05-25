const addMovieController = async (req, res) => {
  res.send("Add");
};

const getMoviesController = async (req, res) => {
  res.send("Get");
};

export { addMovieController, getMoviesController };
