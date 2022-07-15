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
fetchKimiQuote();
setInterval(swapQuote,10000);