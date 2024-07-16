import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import axios from 'axios';

import Stocks from './model/stocks.js';

const app = express();
app.use(cors());
mongoose.connect('mongodb://localhost:27017/MyCollection');


app.get('/:companyname', async (req, res) => {
    const company = req.params.companyname;
    const data = await stocksdata(company);
    // console.log(data);

    const [date, time] = data.data.lastupd.split(' ');
    const [year, month, day] = date.split('-');
    const [hour, minute, second] = time.split(':');
    // console.log(year, month, day, hour, minute, second);
    if((await Stocks.find({time: data.data.lastupd, name: company})).length == 0) 
    await Stocks.create({name: company, price: data.data.pricecurrent, time: data.data.lastupd });
    // const companyStock = data.find(obj => obj.companyName = company);
    // const lastStock = StocksModel.findOne({price: companyStock.pricecurrent});
    // const time = new Date().toLocaleTimeString();
    // if(!lastStock) {
        // StocksModel.create({ time: companyStock.lastupd, price: companyStock.lastPrice, name: company});
    //     res.send({ time, price: companyStock.lastPrice, name: company});
    // }
    // else res.send('no updates');
    const allStockValues = await Stocks.find({name: company}, ).sort({time : -1}).limit(20);
    
    res.send(allStockValues);
});

app.listen(8000, () => {
    console.log('server is running');
});

async function stocksdata(companyCode) {
    
    const url = 'https://priceapi.moneycontrol.com/pricefeed/bse/equitycash/' + companyCode;
    const headers = {
        'Accept': 'application/json',
    };

    let data;

    await axios.get(url, { headers })
        .then(response => {
            data = (response.data);
        })
        .catch(error => {
            console.error(error);
        });

    return data;
}