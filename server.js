const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const port = 8686;

app.use(express.static(__dirname + 'public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");


app.get('/', (req, res) => {
    res.render("convert",{result: 0});
});

app.post('/', (req, res) => {
    const key = "1b17182f8e-4bda835c91-rt1tva";
    const baseMonnaie = req.body.base;
    const toMonnaie = req.body.targetMonnaie;
    const amount = req.body.amount;

    let params = {
        from: baseMonnaie,
        to: toMonnaie,
        key: key,
    }

    const url = `https://api.fastforex.io/fetch-one?from=${params.from}&to=${params.to}&api_key=${params.key}`;


    const convert = async () => {
        const response = await fetch(url);
        const data = await response.json();

        const taux = data.result[Object.keys(data.result)[0]];
        const rs = parseInt(amount) * parseFloat(taux);

        res.render("convert", {result : rs});
    } 

    convert();

});


app.listen(port, ()=>{console.log('Server On')});