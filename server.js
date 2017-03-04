var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var article_one = {
    title: "article-one veda",
    heading: 'article-one',
    date: 'mar 4, 2017',
    content: `<p> 
        'this is article-one'
    </p>`
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
           ${date}
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

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/article-one', function (req, res) {
  res.send(createtemplate(article_one));
});
app.get('/article-two', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui','article-two.html'));
});

 app.get('/article-three', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui','article-three.html'));
 });
 
app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
