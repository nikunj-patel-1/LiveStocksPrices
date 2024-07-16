import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    time: Date,
    price: Number,
    name: String
});

const Stocks = mongoose.model('Stocks', schema);

export default Stocks;