const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 4000;
const routes = require("./routes/shoppingRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/products", routes);

app.use(errorHandler); /* overide default express error handler */

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
