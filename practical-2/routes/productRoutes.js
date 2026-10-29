const express = require("express")
const router = express.Router();
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

router.get("/", (req, res) => {
  res.send("All Products");
});

router.get("/:id", (req, res) => {
  res.send(`Product ID: ${req.params.id}`);
});

module.exports = router;

