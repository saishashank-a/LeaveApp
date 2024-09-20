

var boolean=true
var el
el=document.getElementById("button")
if(el){
    el.addEventListener("click",handleClick)
}
function handleClick(){

console.log(boolean)
}
var booleans=false
var ellu
ellu=document.getElementById("button")
if(ellu){
    ellu.addEventListener("click",handleClicks)
}
function handleClicks(){
console.log(booleans)
}
