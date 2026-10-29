const express = require("express")
const app = express();

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

app.use("/users", userRoutes);
app.use("/products", productRoutes);


app.listen(5000, () => console.log("listening on port 5000"));

