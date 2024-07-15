const url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1"
const dropdowns = document.querySelectorAll(".options select");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const msg = document.querySelector(".Message");

const btn = document.querySelector("form button");
for(let select of dropdowns){
    for(currencyCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currencyCode;
        newOption.value = currencyCode;
        if(select.name === "from" && currencyCode==="USD"){
            newOption.selected = "selected";
        }
        else if(select.name === "to" && currencyCode==="INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change" , (evt) => {
    changeFlag(evt.target);
});
}

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal < 1){
        amtVal=1;
        amount.value="1";
    }
    const URL = `${url}/currencies/${fromCurrency.value.toLowerCase()}.json`;
    let response = await fetch (URL);
    let data = await response.json();
    let rate = data[fromCurrency.value.toLowerCase()][toCurrency.value.toLowerCase()];
    if (rate === undefined) {
      throw new Error(`Exchange rate not found for ${toCurrency.value}`);
    }
    let convertedAmt = amtVal*rate;
    msg.innerText = `${amtVal} ${fromCurrency.value.toUpperCase()} = ${convertedAmt.toFixed(3)} ${toCurrency.value.toUpperCase()}`

}
const changeFlag = (element) => {
    let currencyCode = element.value;
    let countryCode = countryList[currencyCode];
    let newLink = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newLink;
};

btn.addEventListener("click" , async (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
  });