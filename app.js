var currencies = document.querySelector('.currencies')
var table = document.querySelector('.currency-table')
var innerInput = document.querySelector('.inner input')
var outerInput = document.querySelector('.outer input')

async function getCurrencies() {
    let rates = new Map();

    await fetch('https://api.exchangerate.host/latest?&base=TRY')
    .then(res => res.json())
    .then(res => {
        rates.set('USD', res.rates.USD);
        rates.set('EUR', res.rates.EUR);
        rates.set('GBP', res.rates.GBP);
        rates.set('JPY', res.rates.JPY);
        rates.set('NOK', res.rates.NOK);
        rates.set('DKK', res.rates.DKK);
    })

    return rates;
}

async function getSymbols() {
    let symbols = new Map();
    
    await fetch('https://api.exchangerate.host/symbols')
    .then(res => res.json())
    .then(res => {
        symbols.set(res.symbols.USD.code , res.symbols.USD.description)
        symbols.set(res.symbols.EUR.code , res.symbols.EUR.description)
        symbols.set(res.symbols.GBP.code , res.symbols.GBP.description)
        symbols.set(res.symbols.JPY.code , res.symbols.JPY.description)
        symbols.set(res.symbols.NOK.code , res.symbols.NOK.description)
        symbols.set(res.symbols.DKK.code , res.symbols.DKK.description)
    })
    return symbols;
}

Promise.all([Promise.resolve(getCurrencies()), Promise.resolve(getSymbols())]).then(([rates, symbols]) => {
    const ratesIterator = rates[Symbol.iterator]()
    var count = rates.size;
    while (count > 0) {
        const ratesIteratorResult = ratesIterator.next();
        var currencyName = ratesIteratorResult.value[0]
        var currencyRate = ratesIteratorResult.value[1]
        var currencyRateFixed = (1 / currencyRate).toFixed(3)

        currencies.innerHTML += `<option> ${currencyName} </option>`
        table.innerHTML +=`<div class="item">
        <img class="flag" src="./img/${currencyName}.jpg" alt="">
        <div class="head">
            <h2 class="head-title">${currencyName}</h2>
            <p class="head-desc">${symbols.get(currencyName)}</p>
        </div>
        <div class="ask">
            <h2 class="ask-title">ALIŞ</h2>
            <p class="ask-desc">${currencyRateFixed}</p>
        </div>
        <div class="bid">
            <h2 class="bid-title">SATIŞ</h2>
            <p class="bid-desc">${currencyRateFixed}</p>
        </div>
    </div>`
        count--;
    }

    innerInput.addEventListener('keyup', function(){
        calculateCurrency()

    })
    innerInput.addEventListener('click', function(){
        calculateCurrency()

    })

    currencies.addEventListener('change', function(){
        calculateCurrency()
    })

    function calculateCurrency() {
        var value = innerInput.value
        outerInput.value = value / rates.get(currencies.value)
    }
})

setTimeout(function(){

},500)