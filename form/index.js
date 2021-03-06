// install express with `npm install express` 
const express = require('express')
const { check, validationResult, matchedData } = require('express-validator');
const bodyParser = require('body-parser')


const app = express()
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())


app.use(express.static(__dirname + '/views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('index'))

app.get('/tutorial', (req, res) => res.render('tutorial'))

app.get('/templates', (req, res) => res.render('templates'))

app.get('/simple', (req, res) => res.render('simple'))

app.post('/write',
    [
    check("name"),
    check("email"),
      check("answer"),
      check("optionSelected")   
    ],
    (req,res) => {
    const errors = validationResult(req);
    const data = matchedData(req);
    console.log("Sanitized: ", data);


    res.redirect('/')
})

const PORT = 3000

if(!process.env.DETA_RUNTIME){
    app.listen(PORT,()=>{
        console.log('Listening to local port')
    })
}
// export 'app'
module.exports = app