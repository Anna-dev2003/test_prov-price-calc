
const inputStorage = document.getElementById('input__storage')
const inputTransfer = document.getElementById('input__transfer')

//Тут зберігаються данні про кількість обраних ГБ
let storageValue = 0
let transferValue = 0

inputStorage.addEventListener('input', (event) => {
    storageValue = event.target.value
    const storageValueText = document.getElementById('storage-value').innerText = storageValue
    calculate(storageValue, transferValue, providesInfo)
})
inputTransfer.addEventListener('input', (event) => {
    transferValue = event.target.value
    const transferValueText = document.getElementById('transfer-value').innerText = transferValue
    calculate(storageValue, transferValue, providesInfo)
})

//Додаткова функція перерахунку
const recalculate = () => {
    calculate(storageValue, transferValue, providesInfo)
}

//розрахунок цін
const calculate = (storageValue, transferValue, providesInfo) => {

    //збирається масив виду {назва пройвайдеру: ціна}
    const result = {}
    let storagePriceVorCalc = null
    let transferPriceVorCalc = null

    providesInfo.map((prov) => {

        const {price: {
            minPayment,
            maxPayment,
            storagePrice,
            transferPrice,
            freeGB
        }} = prov

        const provName = prov.name.split('.')[0]

        if(freeGB){
            storageValue = storageValue - freeGB
            transferValue = transferValue - freeGB
        }

        if(typeof storagePrice === 'object'){
            
            for(let option in storagePrice){

                // console.log(`${provName}-option__${option}`)
                const currentOption = document.getElementById(`${provName}-option__${option}`)

                if(currentOption.hasAttribute("selected")){

                    storagePriceVorCalc = storagePrice[option]
                    
                }
            }
        }else if(typeof storagePrice !== 'object'){
            storagePriceVorCalc = storagePrice
        }

        if(typeof transferPrice === 'object'){
            
            for(let option in transferPrice){

                // console.log(`${provName}-option__${option}`)
                const currentOption = document.getElementById(`${provName}-option__${option}`)

                if(currentOption.hasAttribute("selected")){

                    transferPriceVorCalc = transferPrice[option]
                }
            }

        }else if(typeof storagePrice !== 'object'){
            transferPriceVorCalc = transferPrice
        }


        let calculatingResult = storagePriceVorCalc * storageValue + transferPriceVorCalc * transferValue

        if(calculatingResult <= 0){
            calculatingResult = 0
        }else if(!Number.isInteger(calculatingResult)){
            calculatingResult = Number(calculatingResult.toFixed(2).replace(/0*$/,""))
        }else if(!Number.isInteger(calculatingResult) && calculatingResult){

        }

        if(minPayment){
            if(calculatingResult < minPayment){
                calculatingResult = minPayment
            }
        }

        if(maxPayment){
            if(calculatingResult > maxPayment){
                calculatingResult = maxPayment
            }
        }

        if(+storageValue === 0 && +transferValue === 0){
            calculatingResult = 0
        }

        result[provName] = calculatingResult

        if(freeGB){
            storageValue = storageValue + freeGB
            transferValue = transferValue + freeGB
        }

    }) 

    changeData(result)
}



