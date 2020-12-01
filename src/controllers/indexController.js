const mercadopago = require('mercadopago');

mercadopago.configure({
    access_token: 'APP_USR-6317427424180639-042414-47e969706991d3a442922b0702a0da44-469485398',

    integrator_id: 'dev_24c65fb163bf11ea96500242ac130004',
})

module.exports = {
    home: (req, res) => {
        return res.render("index");
    },
    detail: (req, res) => {
        return res.render("detail", { ...req.query });
    },
    buy: (req,res)=>{
        /*se el objeto/s de venta */
        let item = {
            id: 1,
            title: 'Zapa',
            description:'Descripcion',
            unit_price:10.5,
            quantity:1
        }
        let preference = {
            /*array de productos o servicios que se va a vender */
            items:[
                item
            ],

        }

        /* crear la preferencia */
        mercadopago.preferences.create(preference)
        .then(response=>{
            global.init_point = response.body.init_point;
            global.id = response.body.id;
            res.render('confirm')
        })
        .catch(error=>{
            console.log(error);
            res.send('error')
        })
    }
}