const htmlController = (req, res) => {
  res.status(200).send("<h1>Hi The</h1>");
};

module.exports = { htmlController };
