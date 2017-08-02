console.log('Loaded!');
var element = document.getElementById('main-text');
element.innerHTML= 'New value';

//move the image
var img=document.getElementById('madi');
var marginLeft = 0;
function movRigth(){
    marginLeft = marginLeft + 10;
    img.style.marginLeft = marginLeft + 'px';
}
img.onclick=function(){
    var interval=setInterval(movRigth,100)
}