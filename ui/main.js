var counter = 0;
var button = document.getElementById('counter');

button.onclick = function(){
    counter += counter;
    var span = document.getElementById('count');
    span.innerHTML= counter.toString();
    
};