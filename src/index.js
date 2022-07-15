import './style.scss';
import { Tooltip, Toast, Popover } from 'bootstrap';
import {camelCase} from 'lodash';

function fetchKimiQuote(){
    fetch("https://kimiquotes.herokuapp.com/quote")
    .then((response) => response.json())
    .then((data) => console.log(data))

}

document.getElementById("kimi-button").addEventListener("click",fetchKimiQuote);