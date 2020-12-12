const express = require("express");
const cors = require("cors");
const fs = require("fs");
const bodyParser = require("body-parser");
const { send } = require("process");

const app = express();

app.use(bodyParser.json())

app.use(cors({
    origin: "http://localhost:3000"
}))


app.post("/loadFile", (req, res) => {
    let size = 0;

    req.on("data", chunk => {
        size += chunk.length;
    })

    req.on("end", () => {
        res.status(200).end();
    })
})


app.listen(3001, () => console.log("Server has been started on 3001 port"))