
const currentResult = {}

window.addEventListener('resize', (e) => {
    changeData(currentResult) 
});

//Cтворює діаграму провайдерів
const createChart = (result) => {
    for(let provName in result){

        const provWrappElem  = document.getElementById(`provider-wrapper__${provName}`)

        const columnElem = document.createElement('div')
        columnElem.setAttribute("id", `column__${provName}`)
        columnElem.classList.add('column')

        const columnElemText = document.createElement('p')
        columnElemText.setAttribute("id", `column-text__${provName}`)
        columnElemText.classList.add('column-text')

        columnElemText.innerText = result[provName] + '$'
    

        if(result[provName] === 0){
            columnElem.style.width = '15px'
        }else{
            columnElem.style.width = result[provName] * 3 + 'px'
        }

        columnElem.append(columnElemText)
        provWrappElem.append(columnElem)
    }

    changeData(currentResult)

}

//Змінює діаграму провайдерів
const changeData = (result) => {

    const min = []
    const isScreenWidthMin = window.screen.width > 760 ? false : true

    for(let provName in result){

        min.push(result[provName])

        const columnElem = document.getElementById(`column__${provName}`)
        const columnElemText = document.getElementById(`column-text__${provName}`)

        columnElemText.innerText = ''
        columnElemText.innerText = result[provName] + '$'

        if(+result[provName] === 0){
            if(isScreenWidthMin){
                columnElem.style.height = '15px'
                columnElem.style.width = '30px'

            }else{
                columnElem.style.width = '15px'
                columnElem.style.height = '30px'
            }
        }else{
            if(isScreenWidthMin){
                columnElem.style.height = 15 + result[provName] * 3 + 'px'
                columnElem.style.width = '30px'
            }else{
                columnElem.style.width = 15 + result[provName] * 5 + 'px'
                columnElem.style.height = '30px'
            }
        }

        Object.assign(currentResult, result)
    }

    changeColumnColor(Math.min(...min))

}

//Змінює колір в діаграмі провайдерів
const changeColumnColor = (min) => {
    for(let provName in currentResult){

        // console.log(currentResult[provName], min)
        if(currentResult[provName] == min){
            const columnElem = document.getElementById(`column__${provName}`)
            providesInfo.forEach((prov) => {
                if(provName === prov.name.split('.')[0]){
                    columnElem.style.background = prov.color
                }
            })
        }else{
            const columnElem = document.getElementById(`column__${provName}`)
            columnElem.style.background = 'gray'

        }
    }

}

//Cтворює поля провайдерів
const createFields = (fields) => {

    const chartCont = document.getElementById('chart-container')

    fields.forEach((prov) => {
        const provName = prov.name.split('.')[0]

        const provWrappElem = document.createElement('div')
        provWrappElem.classList.add('provider-wrapper')
        provWrappElem.setAttribute("id", `provider-wrapper__${provName}`)

        const provInfoElem = document.createElement('div')
        provInfoElem.classList.add('prov-info')

        const provNameElem = document.createElement('p')
        provNameElem.innerText = provName
        provNameElem.classList.add('prov-name')

        const provImgElem = document.createElement('div')
        provImgElem.innerHTML = prov.icon

        if(prov.select){
            const provSelectElem = document.createElement('div')

            prov.select.map((option, index) => {
                const provOptionElem = document.createElement('span')
                provOptionElem.classList.add('prov-option')
                provOptionElem.innerText = option
                provOptionElem.setAttribute("id", `${provName}-option__${option}`)

                provOptionElem.addEventListener('click', (e) => {
                    toggleOption(e)
                    changeData(currentResult)
                    recalculate()
                })

                if(index === 0){
                    provOptionElem.setAttribute("selected", '')
                    provOptionElem.classList.add('active-option')
                }

                provSelectElem.append(provOptionElem)
            })

            provInfoElem.append(provNameElem, provSelectElem)
        }else{
            provInfoElem.append(provNameElem) 
        }

        currentResult[provName] = 0

        provWrappElem.append(provInfoElem, provImgElem)
        // provWrappElem.append(provInfoElem)
        chartCont.append(provWrappElem)
    })

    createChart(currentResult)
}

//Перемикання опцій провайдерів
const toggleOption = (e) => {


    if(e.target.hasAttribute("selected")){
        return
    }else{
        const neighbors = [...e.target.parentElement.childNodes]
        neighbors.forEach((elem) => {
            elem.removeAttribute("selected")
            elem.classList.remove('active-option')
        })
        e.target.setAttribute("selected", "")
        e.target.classList.add('active-option')
    }
}

createFields(providesInfo)
