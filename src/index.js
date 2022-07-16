import './style.scss';
import { Tooltip, Toast, Popover } from 'bootstrap';
import { camelCase } from 'lodash';


function fetchKimiQuote() {
   let quote;
   let response = fetch("https://kimiquotes.herokuapp.com/quote")
      .then((response) => response.json())
      .then((data) => {
         console.log(data);
         quote = data.quote;
         document.getElementById("quote-box").innerHTML = quote;
      });

}
function swapQuote() {
   const quoteBox = document.getElementById("quote-box-container");
   quoteBox.classList.add("hidden");
   setTimeout(() => {fetchKimiQuote(); swapQuoteSide()}, 1100);
   setTimeout(() => { quoteBox.classList.add("visible"); quoteBox.classList.remove("hidden"); }, 1300);
}
function setHeroHeight() {
   const pageDimensions = calcPageDimensions();
   const navbarHeight = document.querySelector(".navbar").offsetHeight;
   const heroSection = document.querySelector(".land-container");
   heroSection.style.height = (pageDimensions.document.height - navbarHeight) + "px";
   const heroImage = document.getElementById("hero-image-container");
   heroImage.style.height = (pageDimensions.document.height - navbarHeight) + "px";
}

function calcPageDimensions() {
   const heroImage = document.getElementById("hero-image");
   
   const pageDimensions = {};
   pageDimensions.heroImage = {};
   pageDimensions.document = {};
   pageDimensions.positioning = {};
   pageDimensions.heroImage.width = heroImage.offsetWidth;
   pageDimensions.heroImage.height = heroImage.offsetWidth;
   pageDimensions.document.width = window.innerWidth;
   pageDimensions.document.height = window.innerHeight;
   pageDimensions.document.aspectRatio = pageDimensions.document.width/pageDimensions.document.height;
   pageDimensions.positioning.widthFactor = pageDimensions.heroImage.width/3;
   if (pageDimensions.document.aspectRatio > 3){
      pageDimensions.positioning.widthFactor = pageDimensions.heroImage.width/2;
   }
   else{
      pageDimensions.positioning.widthFactor = pageDimensions.heroImage.width/3;
   }

   return pageDimensions;
}

function setQuoteBoxPositionAndSize() {
   const quoteBox = document.querySelector(".floating-quote");
   const pageDimensions = calcPageDimensions();

   quoteBox.style.width = ((pageDimensions.document.width / 2) - (pageDimensions.heroImage.width/3)*2) + "px";
   console.log(quoteBox.style.width);
   quoteBox.style.top = (pageDimensions.heroImage.height / 4) + "px";
   if (quoteBox.style.left == "" && quoteBox.style.right == ""){
      quoteBox.style.left = ((pageDimensions.document.width / 2) - pageDimensions.positioning.widthFactor) - quoteBox.offsetWidth + "px";
   }
   else if (quoteBox.style.left == "") {
      quoteBox.style.right = ((pageDimensions.document.width / 2) - pageDimensions.positioning.widthFactor) - quoteBox.offsetWidth + "px";

   }
   else {
      quoteBox.style.left = ((pageDimensions.document.width / 2) - pageDimensions.positioning.widthFactor) - quoteBox.offsetWidth + "px";
   }
}
function swapQuoteSide() {
   const quoteBox = document.querySelector(".floating-quote");
   const quoteBoxContainer = document.querySelector("#quote-box-container");
   const pageDimensions = calcPageDimensions();

   if (quoteBox.style.left == "") {
      quoteBox.style.right = "";
      quoteBox.style.left = ((pageDimensions.document.width / 2) - pageDimensions.positioning.widthFactor) - quoteBox.offsetWidth + "px";
      quoteBoxContainer.classList.remove("text-start");
      quoteBoxContainer.classList.add("text-end");
   }
   else {
      quoteBox.style.left = "";
      quoteBox.style.right = ((pageDimensions.document.width / 2) - pageDimensions.positioning.widthFactor) - quoteBox.offsetWidth + "px";
      quoteBoxContainer.classList.add("text-start");
      quoteBoxContainer.classList.remove("text-end");
   }
}


setHeroHeight();
fetchKimiQuote();
setQuoteBoxPositionAndSize();
setInterval(swapQuote, 10000);
window.addEventListener("resize", setHeroHeight);
window.addEventListener("resize", setQuoteBoxPositionAndSize);