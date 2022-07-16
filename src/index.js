import './style.scss';
import { Tooltip, Toast, Popover } from 'bootstrap';
import {camelCase} from 'lodash';

function fetchKimiQuote(){
    let quote;
     let response = fetch("https://kimiquotes.herokuapp.com/quote")
     .then((response) => response.json())
     .then((data) => {
        console.log(data);
        quote = data.quote;
        document.getElementById("quote-box").innerHTML = quote;
     });
     
}
function swapQuote(){
   const quoteBox = document.getElementById("quote-box");
   quoteBox.classList.add("hidden");
   setTimeout(()=>fetchKimiQuote(),1100);
   setTimeout(()=>{quoteBox.classList.add("visible");quoteBox.classList.remove("hidden");},1300);
}
function setHeroHeight(){
   const navbarHeight = document.querySelector(".navbar").offsetHeight;
   const pageHeight = document.querySelector(".land-container").offsetHeight;
   const heroImage = document.getElementById("hero-image-container");
   heroImage.style.height = (pageHeight-navbarHeight) + "px";
}

function calcHeroImageDimensions(){
   const heroImage = document.getElementById("hero-image");
   const currentWidth = heroImage.offsetWidth;
   const currentHeight = heroImage.offsetHeight;
   return [currentWidth,currentHeight];
}

function setQuoteBoxPositionAndSize(){
   const [imageWidth,imageHeight] = calcHeroImageDimensions();
   const quoteBox = document.querySelector(".floating-quote");
   const documentWidth = document.querySelector("body").offsetWidth;
   const documentHeight = document.querySelector("body").offsetHeight;

   quoteBox.style.width = ((documentWidth/2) - (imageWidth/4)*2) + "px";
   quoteBox.style.left = ((documentWidth/2) - (imageWidth/3)) -quoteBox.offsetWidth + "px";
   quoteBox.style.top = (imageHeight/4) +"px";


   console.log(quoteBox.style.right);
}

setHeroHeight();
fetchKimiQuote();
setQuoteBoxPositionAndSize();
setInterval(swapQuote,10000);
window.addEventListener("resize",setHeroHeight);
window.addEventListener("resize",setQuoteBoxPositionAndSize);