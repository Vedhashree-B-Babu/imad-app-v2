
var button = document.getElementById('counter');
var counter = 0;

button.onclick = function(){
    counter = counter + 1;
    var hi = document.getElementById('count');
    hi.innerHTML= counter.toString();
    
};