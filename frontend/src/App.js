import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
// import cors from 'cors';

function App() {

  const [data, setData] = useState([]);
  const [currentComp, setCurrentComp] = useState('');
  // axios.get(`localhost:8000/${}`)


  async function getStocksData(val) {
    let sdata;
    try {
      sdata = await axios.get(`http://localhost:8000/${val}`);
      setData(sdata.data);
      
    } catch (error) {
      console.log('Error while fetching data from database');
    }
  
  }

  // setInterval(() => {
  //   getStocksData(currentComp);
  // }, 1000);

  useEffect(() => {
    const interval = setInterval(() => {
      getStocksData(currentComp);
    }, 1000);

    return () => clearInterval(interval);
  }, [currentComp]);
  

  return (
    <div className="App">
      <header className="App-header">
        <h3>Share Price Live</h3>
        <div className='stockname'>
          <select onChange={(e) => setCurrentComp(e.target.value)} className='sel'>
            <option disabled selected>Select</option>
            <option value="RI">Relience Industries</option>
            <option value="TCS">Tata Consultancy services</option>
            <option value="AE01">Adani Enterprises Ltd.</option>
            <option value="SE17">Suzlon Energy Ltd.</option>
            <option value="SBI">State Bank of India</option>
          </select>
          
        </div>
        <br />
        <table border="1" width="500">
          <tr>
            <th>Price</th>
            <th>Time</th>
          </tr>
          {data && data.map((stock) => {

            return (<tr>
              <td>{stock.price}</td>
              <td>{new Date(stock.time).toLocaleString()}</td>
            </tr>)
          })

          }
        </table>
      </header>
    </div>
  );
}

export default App;
