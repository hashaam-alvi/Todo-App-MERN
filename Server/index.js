const express = require("express");
const app = express();
const port = 8081;

const mongoose = require("mongoose");
const cors = require("cors");

const todoRoutes = require("./routes/todoRoutes");
const postRoutes = require("./routes/postRoutes");

app.use(cors()); // ✅ VERY IMPORTANT
app.use(express.json());

app.use("/todos", todoRoutes);
app.use("/posts", postRoutes);


app.listen(port, () => {
  console.log(`Server running on ${port}`);
});

main()
    .then(()=>console.log("Connection with DB is Successful"));
async function main(){
  await mongoose.connect("mongodb://127.0.0.1:27017/todoapp");
}


app.get("/", (req, res) => {
  res.send("connection established to route /")
});

