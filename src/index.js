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
        document.getElementById("quote-container").innerHTML = quote;
     });
     
}
fetchKimiQuote();
setInterval(fetchKimiQuote,5000);