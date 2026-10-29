const express = require("express")
const app = express();

app.use(express.json());
app.use(express.static("public"));

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

app.listen(5000, () => console.log("listening on port 5000"));