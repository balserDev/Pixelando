import express from "express";
import bodyParser from "body-parser";

const port = 3000;
const app = express();
var frameUnits = 1000;
var height = 1;
var width = 1;


//experimental
// app.set('view engine', 'ejs');  

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(port, (req, res)=>{
  console.log(`The server has started on the port ${port}`)
})

app.get("/", (req, res)=>{
  res.render("main.ejs");
})

app.get("/canvas", (req, res)=>{
  console.log(height + " " + width)
  res.status(200).send({width:width, height:height})
})

app.post("/resolution", (req, res)=>{
  let frameSize = req.body

  height = frameSize.height;
  width = frameSize.width;
  
  frameUnits = height * width;
  res.render("main.ejs", {units:frameUnits, width:width, height:height});
})



