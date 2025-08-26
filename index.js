
// const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const BASE_URL =
 "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const but = document.querySelector(" form button");
const fromcurr = document.querySelector('select[name="From"]');
const tocurr = document.querySelector('select[name="To"]');
const msg = document.querySelector(".msg");


for (let select of dropdowns){
for ( let currCode in countryList){
  let newOption = document.createElement("option");
 newOption.innerText = currCode;
  newOption.value = currCode;

if(select.name === "From" && currCode === "USD"){
newOption.selected = "selected";
}

else if(select.name === "To" && currCode === "INR"){
  newOption.selected = "selected";
  }
  select.append(newOption);
}
select.addEventListener("change" , (evt) =>{
  updateflag(evt.target);
});
}

 


const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtval = amount.value;
  if(amtval === "" || amtval < 1){
    amtval = 1;
    amount.value = "1";
  }

const URL = `${BASE_URL}/${fromcurr.value.toLowerCase()}.json`;
let response = await fetch(URL);
 let data = await response.json(); 
let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];


let finalAmount = amtval * rate;
msg.innerText = `${amtval} ${fromcurr.value} = ${finalAmount.toFixed(3)} ${tocurr.value}`;
 };


const updateflag = (element) =>{
  let currCode = element.value;
  let countrycode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
let img =  element.parentElement.querySelector("img");
  img.src = newSrc;
 };



  but.addEventListener("click", (evt) => {
   evt.preventDefault();
   updateExchangeRate();
 });

 window.addEventListener("load", () => {
   updateExchangeRate();
 });
