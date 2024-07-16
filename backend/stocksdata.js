const axios = require('axios');

const url = 'https://api.moneycontrol.com/mcapi/v1/stock/get-stock-price?scIdList=IRF%2CBAF%2CCIF01%2CBA%2CSTF&scId=IRF';
const headers = {
  'Accept': 'application/json',
  'Authorization': 'Bearer {your_access_token}'
};
let data;

axios.get(url, { headers })
  .then(response => {
    data = (response.data);
  })
  .catch(error => {
    console.error(error);
  });

  return data;