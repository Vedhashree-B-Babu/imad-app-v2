var counter = 0;
var button = document.getElementById('counter');

button.onclick = function(){
    counter = counter + 1;
    var hi = document.getElementById('count');
    hi.innerHTML= counter.toString();
    
};