const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const routes = require("./routes/shoppingRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");

const port = process.env.PORT || 4000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/products", routes);

/* overide default express error handler */
app.use(errorHandler);

{
  /*
    app.get("/api/test", (req, res) => {
      res.status(200).send("Test API");
      res.status(200).json({ message: "Test API" });
    });
  */
}

app.listen(port, () => console.log(`Server running on port: ${port}`));
// npm run server   - development
// npm start        - production
