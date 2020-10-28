import React from 'react';
import classes from './customerDetail.module.css'
import { Table } from 'react-bootstrap';


const CustomerDetail = (props) => {
    let customer = props.responseObj;
    let transactions = props.responseObj.transactions;

    console.log(transactions);
    function getReward(amount) {
        let reward = 0;
        let tamount = parseInt(amount);
       
        if (tamount > 100) {
            reward = 50;
            let t1 = tamount - 100;
            reward = reward + (t1 * 2)

        }
        else {
            let t2 = amount - 50;
            if(t2>0)
            {
                reward = t2 * 1;
            }
        }
        
        return reward;
    }
    return props.responseObj && (

        <div>
            <label className={classes.Name}>First Name : {customer.firstName}</label>

            <label className={classes.Name}>Last Name : {customer.lastName}</label>

            <Table striped bordered hover hover="true" variant="dark">
                <thead>
                    <tr>
                        <th>Transction Id</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Reward Point</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions && transactions.map((el, index) =>
                        (<tr key={index}>
                            <td>{el.id}</td>
                            <td>{el.date}</td>
                            <td>{el.amount}</td>
                            <td>{getReward(el.amount)}</td>
                        </tr>))
                    }


                </tbody>
            </Table>
        </div>
    )
}

export default CustomerDetail;