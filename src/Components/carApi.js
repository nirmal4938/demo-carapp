var express = require("express");
var app = express();
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
  );
  next();
});
const port = 2410;

let {carMaster,cars}=require("./carData.js");
app.get("/cars" ,function(req,res){
    res.send({carMaster,cars});
})
app.get("/cars/:id" ,function(req,res){
  let id=req.params.id;
  let Car=cars.find((cr)=>cr.id===id);
  res.send(Car);
})

app.post("/cars", (req, res) => {
  const Car = req.body;
  cars.push(Car);
  res.send(Car);
});

app.put("/cars/:id", function (req, res) {
  
  let id = req.params.id;
  const car = req.body;
  
  let index = cars.findIndex((obj1) => obj1.id === id);
  if (index >= 0) {
    cars[index] = car;
    res.send(car);
  } else res.send("not found");
});
app.delete("/cars/:id", function (req, res) {
  let id = req.params.id;
  let index = cars.findIndex((obj1) => obj1.id === id);
  if (index >= 0) {
    let car = cars.splice(index, 1);
    res.send(car);
  }
  res.send("not found");
});


app.listen(port, () => console.log(`Node app listening on port ${port}!`));