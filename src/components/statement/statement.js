import React, { useState } from 'react';
import classes from './Statement.module.css';

import CustomerDetail from '../customerDetail/customerDetail';


const Statement = () => {
  
let [customerId, setcustomerId] = useState(''); 

let [responseObj, setResponseObj] = useState();
let [error, setError] = useState(false);
let [loading, setLoading] = useState(false);




function getCustomerDetails(e) {
    e.preventDefault();

    if (customerId.length === 0) {
        return setError(true);
    }

    // Clear state in preparation for new data
    setError(false);
    setResponseObj({});
    
    setLoading(true);
    
    
    let apiUrl='data.json';
    fetch(`${apiUrl}`, {
        "method": "GET",
        "headers" : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
    })
    .then(response =>response.json())
    .then(response => {        
        console.log(customerId);
        let customer = response.filter(c=>c.customerId == customerId)[0];       
        setResponseObj(customer);
        setLoading(false);
    })
    .catch(err => {
        setError(true);
        setLoading(false);
        console.log(err.message);
    });
}
   return (
    <div>
    <h2>Enter the Customer ID</h2>
    <form onSubmit={getCustomerDetails}>
        <input
            type="text"
            placeholder="Enter Customer ID"
            maxLength="50"
            className={classes.textInput}
            value={customerId}
            onChange={(e) => setcustomerId(e.target.value)}
            />
        <button  className={classes.Button} type="submit">Get Customer Reward</button>
    </form>

  { responseObj &&  <CustomerDetail 
     responseObj={responseObj}
     error={error}
       loading={loading}      
     ></CustomerDetail>
   
  }
    
</div>
   );
}
export default Statement;