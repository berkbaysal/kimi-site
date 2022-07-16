import './style.scss';
import { Tooltip, Toast, Popover } from 'bootstrap';
import { camelCase } from 'lodash';

let currentQuoteSide = "left";
const heroBreakpoint = 1200;

function fetchKimiQuote() {
   let quote;
   let response = fetch("https://kimiquotes.herokuapp.com/quote")
      .then((response) => response.json())
      .then((data) => {
         quote = data.quote;
         document.getElementById("quote-box").innerHTML = quote;
      });

}
function swapQuote() {
   const quoteBox = document.getElementById("quote-box-container");
   quoteBox.classList.add("hidden");
   setTimeout(() => { fetchKimiQuote(); swapQuoteSide() }, 1100);
   setTimeout(() => { quoteBox.classList.add("visible"); quoteBox.classList.remove("hidden"); }, 1300);
}
function setHeroHeight() {
   const pageDimensions = calcPageDimensions();
   const navbarHeight = document.querySelector(".navbar").offsetHeight;
   const heroSection = document.querySelector(".land-container");
   const heroImage = document.getElementById("hero-image-container");

   if (pageDimensions.document.width > heroBreakpoint) {
      heroSection.style.height = (pageDimensions.document.height - navbarHeight) + "px";
      heroImage.style.height = (pageDimensions.document.height - navbarHeight) + "px";
   }
   else {
      heroSection.style.height = (pageDimensions.document.height - navbarHeight) + "px";
      heroImage.style.height = (pageDimensions.heroImage.height) + "px";
   }

}

function calcPageDimensions() {
   const heroImage = document.getElementById("hero-image");

   const pageDimensions = {};
   pageDimensions.heroImage = {};
   pageDimensions.document = {};
   pageDimensions.positioning = {};
   pageDimensions.heroImage.width = heroImage.offsetWidth;
   pageDimensions.heroImage.height = heroImage.offsetHeight;
   pageDimensions.document.width = window.innerWidth;
   pageDimensions.document.height = window.innerHeight;
   pageDimensions.document.aspectRatio = pageDimensions.document.width / pageDimensions.document.height;
   pageDimensions.positioning.widthFactor = pageDimensions.heroImage.width / 3;
   if (pageDimensions.document.aspectRatio > 1.8) {
      pageDimensions.positioning.widthFactor = pageDimensions.heroImage.width / 2;
   }
   else {
      pageDimensions.positioning.widthFactor = pageDimensions.heroImage.width / 3;
   }

   return pageDimensions;
}

function setQuoteBoxPositionAndSize() {
   const quoteBox = document.querySelector(".floating-quote");
   const quoteBoxContainer = document.querySelector("#quote-box-container");
   const heroImage = document.getElementById("hero-image");
   const navbarHeight = document.querySelector(".navbar").offsetHeight;


   const pageDimensions = calcPageDimensions();

   if (pageDimensions.document.width < heroBreakpoint) {
      quoteBox.style.position = "unset";
      heroImage.classList.remove("h-100");
      quoteBox.style.width = "100%";
      quoteBox.style.height = (pageDimensions.document.height - (pageDimensions.heroImage.height + navbarHeight )) + "px";
      quoteBoxContainer.classList.remove("text-start");
      quoteBoxContainer.classList.remove("text-end");
      quoteBoxContainer.classList.add("text-center");
      currentQuoteSide = "center";
   }
   else {
      currentQuoteSide = "right";
      swapQuoteSide();
      heroImage.classList.add("h-100");
      quoteBox.style.position = "absolute";
      quoteBox.style.width = ((pageDimensions.document.width / 2) - (pageDimensions.positioning.widthFactor*1.1)) + "px";
      quoteBox.style.top = (pageDimensions.heroImage.height / 4) + "px";
      if (quoteBox.style.left == "" && quoteBox.style.right == "") {
         quoteBox.style.left = ((pageDimensions.document.width / 2) - pageDimensions.positioning.widthFactor) - quoteBox.offsetWidth + "px";
      }
      else if (quoteBox.style.left == "") {
         quoteBox.style.right = ((pageDimensions.document.width / 2) - pageDimensions.positioning.widthFactor) - quoteBox.offsetWidth + "px";

      }
      else {
         quoteBox.style.left = ((pageDimensions.document.width / 2) - pageDimensions.positioning.widthFactor) - quoteBox.offsetWidth + "px";
      }

   }

}
function swapQuoteSide() {
   const quoteBox = document.querySelector(".floating-quote");
   const quoteBoxContainer = document.querySelector("#quote-box-container");
   const pageDimensions = calcPageDimensions();

   if (currentQuoteSide === "center") {
      quoteBoxContainer.classList.remove("text-start");
      quoteBoxContainer.classList.remove("text-end");
      quoteBoxContainer.classList.add("text-center");
      return;
   }

   if (currentQuoteSide === "right") {
      quoteBox.style.right = "";
      quoteBox.style.left = ((pageDimensions.document.width / 2) - pageDimensions.positioning.widthFactor) - quoteBox.offsetWidth + "px";
      quoteBoxContainer.classList.remove("text-start");
      quoteBoxContainer.classList.remove("text-center");
      quoteBoxContainer.classList.add("text-end");
      currentQuoteSide = "left";
   }
   else {
      quoteBox.style.left = "";
      quoteBox.style.right = ((pageDimensions.document.width / 2) - pageDimensions.positioning.widthFactor) - quoteBox.offsetWidth + "px";
      quoteBoxContainer.classList.add("text-start");
      quoteBoxContainer.classList.remove("text-center");
      quoteBoxContainer.classList.remove("text-end");
      currentQuoteSide = "right";
   }
}

function init() {
   const pageDimensions = calcPageDimensions();
   if (pageDimensions.document.width < heroBreakpoint) {
      currentQuoteSide = "center";
   }
   else {
      currentQuoteSide = "left";
   }
}

window.addEventListener('load', (event) => {
   console.log(event);
   init();
   setHeroHeight();
   fetchKimiQuote();
   setQuoteBoxPositionAndSize();
   setInterval(swapQuote, 10000);
   window.addEventListener("resize", setHeroHeight);
   window.addEventListener("resize", setQuoteBoxPositionAndSize);
});
