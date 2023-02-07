

//Данні про актуальний прайс різних провайдерів приходить з серверу
//припустимо в такому виді.
//Обрала такий варіант рішення, бо він універсальний і при 
//додаванні нових провайдерів, або при зміні інших налаштувань, цін провайдеру, 
//код не буде потребувати переробки (або дуже мінімальної)
const providesInfo = [
    {
        name: 'backblaze.com', 
        color: 'rgb(255, 10, 10)',
        select: null,
        icon: '<img src="#" alt="icon">',
        price: {
            minPayment: 7,
            maxPayment: null,
            storagePrice: 0.005,
            transferPrice: 0.01,
            freeGB: null,
        }
    }, 
    {
        name: 'bunny.net', 
        color: 'rgb(255, 152, 0)',
        select: ['HDD', 'SSD'],
        icon: `<img src="#" alt="icon">`,
        price: {
            minPayment: null,
            maxPayment: 10,
            storagePrice: {'HDD': 0.01, 'SSD': 0.02},
            transferPrice: {'HDD': 0.01, 'SSD': 0.01},
            freeGB: null
        }
    }, 
    {
        name: 'scaleway.com', 
        color: 'rgb(255, 25, 255)',
        select: ['Multi', 'Single'],
        icon: '<img src="" alt="icon">',
        price: {
            minPayment: null,
            maxPayment: null,
            storagePrice: {'Multi': 0.06, 'Single': 0.03},
            transferPrice: {'Multi': 0.02, 'Single': 0.02},
            freeGB: 75
        }
    }, 
    {
        name: 'vultr.com', 
        color: 'rgb(72, 136, 232)',
        select: null,
        icon: '<img src="#" alt="icon">',
        price: {
            minPayment: 5,
            maxPayment: null,
            storagePrice: 0.01,
            transferPrice: 0.01,
            freeGB: null,
        }
    }
]