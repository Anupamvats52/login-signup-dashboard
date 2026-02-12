const express = require("express");
const path = require("path");
const app = express();
// const hbs = require("hbs")
const LogInCollection = require("./mongodb");
const port = process.env.PORT || 3000;
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

const templatePath = path.join(__dirname, "../templates");

app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.static(path.join(__dirname, "../public")));


app.get("/signup", (req, res) => {
  res.render("signup");
});
app.get("/", (req, res) => {
  res.render("login");
});

// app.get('/home', (req, res) => {
//     res.render('home')
// })

app.post("/signup", async (req, res) => {
  const data = {
    name: req.body.name,
    password: req.body.password,
  };

  try {
    const checking = await LogInCollection.findOne({ name: req.body.name });

    if (checking) {
     
      if (checking.name === req.body.name && checking.password === req.body.password) {
        return res.send("user details already exists");
      }
    }
    
        await LogInCollection.insertMany([data]);
    
       return res.status(201).render("home", {
      naming: req.body.name,
    });
    
  } catch (error) {
     return res.send("Error during signup");
  }
});

app.post("/login", async (req, res) => {
  try {
    const check = await LogInCollection.findOne({ name: req.body.name });

    if (!check) {
      return res.send("user not found");
    }

    if (check.password === req.body.password) {
      return res.status(201).render("home", { 
        naming: req.body.name  
      });
    } else {
      return res.send("incorrect password");
    }
  } catch (e) {
    return res.send("wrong details");
  }
});

app.listen(port, () => {
  console.log("port connected");
});