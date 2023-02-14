const express = require("express")

const app = express()

app.use(express.static("public"))

app.get("/",(req,res)=>{
    res.redirect("index.html")
})

app.listen(3001)