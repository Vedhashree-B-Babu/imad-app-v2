var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var config = {
    user: 'vedhashree-b-babu',
    database: 'vedhashree-b-babu',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD

};


var app = express();
app.use(morgan('combined'));

var articles = {
    'article-one': {title: "article-one veda",
    heading: 'article-one',
    date: 'mar 4, 2017',
    content: `<p> 
        'this is article-one'
    </p>`},
    'article-two': {title: "article-two veda",
    heading: 'article-two',
    date: 'mar 4, 2017',
    content: `<p> 
        'this is article-two'
    </p>`},
    'article-three': {title: "article-three veda",
    heading: 'article-three',
    date: 'mar 4, 2017',
    content: `<p> 
        'this is article-three'
    </p>`}
};

function createtemplate(data) {
var title =data.title;
var heading =data.heading;
var date =data.date;
var content =data.content;
var htmltemplate =`
<!DOCTYPE html>
<html>
    <head>
        <title>${title}</title>
        <meta name='viewport' content='width=device-width, initial-scale=1'/>
         <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
        <div>
            <a href="/">home</a>
        </div>
        <hr/>
        <h1>
           ${heading}
        </h1>
        <div>
           ${date.toDateString}
        </div>
        <div>
            <p>
               ${content}
            </p>
        </div>
    </body>
</html>`;
return htmltemplate;
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);


app.get('/test-db', function (req, res) {
    pool.query('SELECT * FROM test',function(err,result){
        if (err) {
            res.status(500).send(err.toString());
        }else {
            res.send(JSON.stringify(result.rows));
        }
    });
    
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/articles/:articlename', function (req, res){
        pool.query("SELECT * FROM articles where title = '"+ req.params.articlename +"'",function(err,result){
        if (err) {
            res.status(500).send(err.toString());
        }else{
            if(result.rows.length === 0)
            res.status(404).send("article not found");
            else{
                var articledata=result.rows[0];
                res.send(createtemplate(articledata));
            }
        }
        });
});


 
app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
