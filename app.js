//jshint esversion:6

const express = require("express");
// const bodyParser = require("body-parser");

const app = express();

app.set('view engine', 'ejs');

let items = ["Buy Food", "Cook Food",];
let workItems =["one", "two",];

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.get("/", (req, res) => {
  let today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  let day = today.toLocaleDateString("en-US", options);
  res.render("list", {listTitle: day, newListItems: items});

});

app.post("/", (req, res) => {
  let item = req.body.newItem;

  console.log(req.body)

  if(req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work")
  } else {
    items.push(item);
    res.redirect("/");
  } 
})

app.get("/work", (req, res) => {
  res.render("list", {listTitle: "Work List", newListItems: workItems});
})

console.log(items)
app.listen(3000, function(){
  console.log("Server started on port 3000.");
});