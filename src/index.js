import './style.scss';
import { Tooltip, Toast, Popover } from 'bootstrap';
import './style.scss';

let currentQuoteSide = "left";
const heroBreakpoint = 1200;
const mobileHeroTopMargin = 2;
const noImageMargin = 0;   //placeholder for imageless hero section in future.

const kimiVideoIDs = [
   '<iframe width="1280" height="720" src="https://www.youtube.com/embed/oAiGt8mUVto" title="15 Classic Kimi Moments" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
   '<iframe width="1280" height="720" src="https://www.youtube.com/embed/zlFGMK0QccI" title="BWOAH & MWOAH: The Ultimate Compilation" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
   '<iframe width="1280" height="720" src="https://www.youtube.com/embed/1I_OhBKOK1s" title="Kimi Raikkonen - Best overtakes of the decade (2010 - 2019)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
   '<iframe width="1280" height="720" src="https://www.youtube.com/embed/0yofJDSATck" title="Funny Kimi Raikkonen Commercials (12 Minutes of Kimi ads)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
   '<iframe width="1280" height="720" src="https://www.youtube.com/embed/3MZKuNbI6Lo" title="Grill the Grid but its only Kimi" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
]

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
   let pageDimensions = calcPageDimensions();
   const navbarHeight = document.querySelector(".navbar").offsetHeight;
   const heroSection = document.querySelector(".land-container");
   const heroImageContainter = document.getElementById("hero-image-container");
   const heroImage = document.getElementById("hero-image");

   //set hero sections height to viewport minus navbar
   heroSection.style.height = (pageDimensions.document.height - navbarHeight) + "px";

   if (pageDimensions.document.width < heroBreakpoint) {
      //check available height for image with minimal quotebox set image container to it temporarily
      const maxImageHeight = parseInt(heroSection.style.height) - 100 - convertRemToPixels(mobileHeroTopMargin);
      heroImageContainter.style.height = maxImageHeight + "px";

      //find maximum possible non-stretch height, set image and container to it.
      heroImage.style.height = "auto"; //reset the height from prev value to test
      let actualImageHeight = heroImage.offsetHeight;
      if (maxImageHeight < actualImageHeight) { actualImageHeight = maxImageHeight; }  //if image is overflowing, set it back in.
      heroImage.style.height = actualImageHeight + "px";
      heroImageContainter.style.height = actualImageHeight + "px";
   }
   else {
      //incase of bigger screen (and floating quotes) adjust image for the entire hero section
      heroImageContainter.style.height = heroSection.style.height;
      heroImage.style.height = heroSection.style.height;
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
function convertRemToPixels(rem) {
   return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}
function setQuoteBoxPositionAndSize() {
   const quoteBox = document.querySelector(".floating-quote");
   const quoteBoxContainer = document.querySelector("#quote-box-container");
   const heroImage = document.getElementById("hero-image");
   const navbarHeight = document.querySelector(".navbar").offsetHeight;
   const heroImageContainer = document.getElementById("hero-image-container");

   const pageDimensions = calcPageDimensions();

   if (pageDimensions.document.width < heroBreakpoint) {
      quoteBox.style.position = "unset";
      quoteBox.style.width = "100%";
      quoteBox.style.paddingLeft = "1rem";
      quoteBox.style.paddingRight = "1rem";
      quoteBox.style.paddingTop = "2rem";
      quoteBox.classList.add("d-flex", "justify-content-center", "align-items-center", "bg-dark", "text-white");
      heroImage.classList.remove("h-100");
      heroImageContainer.style.marginTop = convertRemToPixels(mobileHeroTopMargin) + "px";
      quoteBox.style.height = (pageDimensions.document.height - (pageDimensions.heroImage.height + convertRemToPixels(mobileHeroTopMargin) + navbarHeight)) + "px";
      if (parseInt((pageDimensions.document.height - (pageDimensions.heroImage.height + convertRemToPixels(mobileHeroTopMargin) + navbarHeight))) < 100) {
         quoteBox.style.position = "absolute";
         quoteBox.style.height = "100px";
         quoteBox.style.bottom = navbarHeight + "px";
         quoteBox.style.top = "";
         quoteBox.style.right = "";
         quoteBox.style.left = "";
      }

      quoteBoxContainer.classList.remove("text-start");
      quoteBoxContainer.classList.remove("text-end");
      quoteBoxContainer.classList.add("text-center");
      currentQuoteSide = "center";
   }
   else {
      currentQuoteSide = "right";
      quoteBox.classList.remove("d-flex", "justify-content-center", "align-items-center", "bg-dark", "text-white");
      heroImage.classList.add("h-100");
      swapQuoteSide();
      heroImageContainer.style.marginTop = "";
      quoteBox.style.position = "absolute";
      quoteBox.style.width = ((pageDimensions.document.width / 2) - (pageDimensions.positioning.widthFactor * 1.1)) + "px";
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
   if (window.innerWidth < heroBreakpoint) {
      currentQuoteSide = "center";
   }
   else {
      currentQuoteSide = "left";
   }
   setHeroHeight();
   setQuoteBoxPositionAndSize(); //init. dimensions for further calculations.
   calculateVideoPlayerHeight();
}
function navLinkClicked(e) {
   document.querySelectorAll(".nav-link").forEach(item => console.log(item.classList.remove("active")));
   e.originalTarget.classList.add("active");
}
function scrollNavCheck(e) {
   const sections = document.querySelectorAll(".main-section");
   const navLinks = document.querySelectorAll(".nav-link");
   const currentHeights = [];
   sections.forEach(item => currentHeights.push(item.getBoundingClientRect().top));
   currentHeights.forEach((item, i) => {
      if (currentHeights[i] < 25 && currentHeights[i + 1] > 0) {
         navLinks.forEach(item => item.classList.remove("active"));
         navLinks[i].classList.add("active");
      }
      else if (currentHeights[i] < 25 && i + 1 === currentHeights.length) {
         navLinks.forEach(item => item.classList.remove("active"));
         navLinks[i].classList.add("active");
      }
   })
}
function calculateVideoPlayerHeight(){
   const videoFrame = document.querySelector(".video-frame");
   const videoPlayer = document.querySelector("iframe");
   videoFrame.style.height = videoFrame.offsetWidth/16*9 + "px";
   videoPlayer.setAttribute("height",videoFrame.offsetWidth/16*9 + "px");
   videoPlayer.setAttribute("width",videoFrame.offsetWidth + "px");

}
function videoListClicked(e){
   console.log(e)
   if(e.srcElement.classList.value.includes("active")){
      return;
   }
   else{
      document.querySelectorAll(".list-group-item").forEach(item => item.classList.remove("active"));
      e.srcElement.classList.add("active");
      document.querySelector(".video-frame").innerHTML = kimiVideoIDs[parseInt(e.srcElement.id.substring(10))-1];
      calculateVideoPlayerHeight();
      
   }
  
}
window.addEventListener('load', (event) => {
   init();
   setHeroHeight();
   fetchKimiQuote();
   setQuoteBoxPositionAndSize();
   setInterval(swapQuote, 10000);
   window.addEventListener("resize", setHeroHeight);
   window.addEventListener("resize", setQuoteBoxPositionAndSize);
   window.addEventListener("resize", calculateVideoPlayerHeight);
   window.addEventListener("scroll", scrollNavCheck);
   document.querySelector("#nav-bar").addEventListener("click", navLinkClicked);
   document.querySelector("#video-list").addEventListener("click",videoListClicked);
});
