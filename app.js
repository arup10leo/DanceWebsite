const express = require("express");
const path = require("path");
const app = express();
const port = 80;
const fs = require('fs');
const mongoose = require('mongoose');
const bodyparser = require('body-parser')

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/contactDance');
}
//defining mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String
});

//model compiled
const Contact = mongoose.model('Contact', contactSchema);


// app.use(express.static('static',options))

//EXPRESS RELATED STUFFS
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

//PUG SPECIFIC STUFFS
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

//ENDPOINTS
app.get('/', (req, res) => {
    const con = "best content"
    const params = {}
    res.status(200).render('home.pug', params)
})
app.get('/contact', (req, res) => {
    const con = "best content"
    const params = {}
    res.status(200).render('contact.pug', params)
})
app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(() => {
            res.send("item saved successfully");
        }).catch(() => {
            res.status(400).send("item not saved to the database")
        })
        // res.status(200).render('contact.pug')
})



//START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});