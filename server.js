var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = new request('crypto');

var config = {
    user:'shashankrp2',
    database:'shashankrp2',
    host: 'db.imad.hasura-app.io',
    port:'5432',
    password: process.env.DB_PASSWORD,
};

var app = express();
app.use(morgan('combined'));


var articleOne ={
  title: 'Article one I Shashank',
  heading: 'Article-one',
  date: 'Aug 2,2017',
  content: 
  `<p>
                    This is the content for my first article.This is the content for my first article.This is the content for my first article.
                </p>
                <p>
                    This is the content for my first article.This is the content for my first article.This is the content for my first article.
                </p>
                <p>
                    This is the content for my first article.This is the content for my first article.This is the content for my first article.
                </p> `
    
};


function createTemplate (data){
var title=data.title;
var heading=data.heading;
var content=data.content;
var date=data.date;

var htmlTemplate = `
 <html>
    <head>
        <title>
            ${title}
        </title>
        <meta name="viewport" content="width-device-width,initial-scale=1"/>
        <link href="/ui/style.css" rel="stylesheet" />
        </head>
        <body>
            <div class="container">
            <div>
                <a href="/">Home</a>
            </div>
            <hr/>
            <h3>
                ${heading}
            </h3>
            <div>
                ${date.toDateString()}
            </div>
            <div>
               ${content} 
            </div>
            </div>
        </body>
</html>
`;
return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input,salt){
//how do we create a hash
var hashed = crypto.pbkdf2Sync(input,salt,10000,512,'sha512');   
return hashed.toString('hex');    
    }
app.get('/hash/:input',function(req,res){
   var hashedString = hash(req.params.input,'this is some random string');
   res.send(hashedString);
});


var pool = new Pool(config); 
app.get('/test-db',function(req,res){
   //make a select request
   //return a response with results
   pool.query('SELECT * FROM test',function(err,result){
      if(err) 
      {
          res.status(500).send(err.toString());
      } else{
          res.send(JSON.stringify(result.rows));
      }
   });
});

var counter = 0;
app.get('/counter',function(req,res){
 counter = counter + 1;
 res.send(counter.toString());
});

var names = [];
app.get('/submit-name',function(req,res){
    //Get the name from the request
    var name = req.query.name;
        
    names.push(name);
    //json; javascript object notation
    res.send(JSON.stringify(names));
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/article-one',function(req,res){
    res.sendFile(path.join(__dirname, 'ui', 'article-one.html')); 
});


app.get('/article-two',function(req,res){
    res.sendFile(path.join(__dirname, 'ui', 'article-two.html')); 
});

app.get('/article-three',function(req,res){
    res.sendFile(path.join(__dirname, 'ui', 'article-three.html')); 
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
