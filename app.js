const express = require("express");
const path = require("path");
const app = new express();
app.use(express.static(path.join(__dirname, "/")));
app.listen(3000, () => {  
    console.log("Server running on 3000");
});