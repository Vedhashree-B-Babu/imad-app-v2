
var rut = document.getElementById('counter');
var counte = 0;

rut.onclick = function(){
    counte = counte + 1;
    var hi = document.getElementById('count');
    hi.innerHTML= counte.toString();
    
};