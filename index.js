const express = require("express");
const path = require("path");
const cors = require("cors");


const app = express();

app.use(express.static(path.join(__dirname, 'build')));
app.use(cors());

app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
})

app.listen("3000", () => {
    console.log("Server is running on port 3000");
});
