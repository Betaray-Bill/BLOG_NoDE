//REQUIRE's
const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs")
const mongoose = require('mongoose')

const app = express()


const dbURL = 'mongodb+srv://Meow:test123@node-mongo.mc0jp.mongodb.net/Node-Mongo?retryWrites=true&w=majority'
mongoose.connect(dbURL, { useNewUrlParser: true,  useUnifiedTopology: true })


//USER-DEFINED DECLARATION
const homeStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
const aboutContent = "Pulvinar sapien et ligula ullamcorper malesuada proin libero nunc. Pulvinar pellentesque habitant morbi tristique senectus et. Et ligula ullamcorper malesuada proin libero nunc consequat interdum. At urna condimentum mattis pellentesque. Accumsan sit amet nulla facilisi morbi. Diam quis enim lobortis scelerisque fermentum. Viverra nam libero justo laoreet sit amet. Urna cursus eget nunc scelerisque viverra mauris in aliquam. Platea dictumst vestibulum rhoncus est pellentesque elit. Ridiculus mus mauris vitae ultricies leo integer"
const contactContent = "At ultrices mi tempus imperdiet nulla malesuada pellentesque. Urna porttitor rhoncus dolor purus non enim. Lacus vestibulum sed arcu non odio. Neque ornare aenean euismod elementum nisi quis eleifend quam. Ultricies leo integer malesuada nunc. Diam vel quam elementum pulvinar etiam non quam. Elit duis tristique sollicitudin nibh. Proin nibh nisl condimentum id venenatis a condimentum vitae sapien. Dignissim suspendisse in est ante in nibh mauris cursus. Condimentum vitae sapien pellentesque habitant morbi tristique senectus et netus. Ipsum nunc aliquet bibendum enim facilisis gravida neque. Egestas tellus rutrum tellus pellentesque. "
var posts = []


//INCLUDING MODULES
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))
    
//HOME
app.get("/", (req, res) => {
    console.log(posts);
    res.render("home", { homeStartingContent: homeStartingContent, posts: posts })
})


//ABOUT
app.get('/about', (req, res) => {
    res.render("about", { aboutContent: aboutContent })
})


//CONTACT
app.get('/contact', (req, res) => {
    res.render("contact", { contactContent: contactContent })
})

//COMPOSE
app.get("/compose", (req, res) => {
    res.render("compose")
})

app.post("/compose", (req, res) => {
    // req.redirect("/compose")
    console.log(req.body.postTitle);
    console.log(req.body.postBody);

    var post = {
        title: req.body.postTitle,
        content: req.body.postBody
    }
    posts.push(post)
    res.redirect('/')
})

// Routing
app.get('/post/:postname', (req, res) => {

    const req_title = req.params.postname

    posts.forEach(post => {
        const stored_title = post.title

        if (stored_title === req_title) {
            console.log("Found")

            res.render("post", {
                title: post.title,
                cont: post.content
            })

        }
    })
})


app.listen("8000", () => {
    console.log("Port opened in 8000")
})