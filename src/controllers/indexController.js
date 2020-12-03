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
    callback:(req ,res)=>{
        console.log(req.query)

        if(req.query.status.includes('success')){
            return res.render('success')
        };
        if(req.query.status.includes('pending')){
            return res.render('pending')
        };
        if(req.query.status.includes('failure')){
            return res.render('failure')
        };
        
        return res.send().status(404).end()
        

    },
    buy: (req,res)=>{
        /*se el objeto/s de venta */
        let item = {
            id: 1234,
            title: 'Zapa',
            description:'Dispositivo móvil de Tienda e-commerce',
            unit_price:10.5,
            quantity:1
        }
        const host = 'https://mercadopago-app.herokuapp.com/';
        const url = host+'callback?status=';
        let preference = {
            /*array de productos o servicios que se va a vender */
            items:[
                item
            ],
            payment_methods:{
                excluded_payment_types:[
                    {id:'atm'}
                ],
                installments: 12,
                excluded_payment_methods:[
                    {id:'visa'}
                ]
            },
            payer:{
                name:'Ryan',
                surname: 'Dahl',
                email:'test_user_63274575@testuser.com',
                phone:{
                    area_code:'11',
                    number:55556666
                },
                addres:{
                    zip_code:'1234',
                    street_name:'Monroe',
                    street_number: 860
                }
            },
            external_reference:'ale.gb32@gmail.com',
            back_urls:{
                success:url+'success',
                pendding:url+'pendding',
                failure:url+'failure'
            },
            auto_return:'approved',
            notification_url:host+'notifications'

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
    },

    notifications:(req,res)=>{
        console.log('webhook', req.body);

        res.status(200).end('Ok')
    }
}