import React, {useEffect, useState} from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ORDERS_IMG from '../assets/order.jpg';
import customer_img from '../assets/customer.png';
import item_img from '../assets/item.png';
import Style from './LandingPage.module.css';
import CreateOrderPage from "./CreatePage";
import CreateOrders from "./CreateCustomer";
import CrudItem from "./CrudItem";
import {Demo} from "./demo";
import axios from 'axios';

const LandingPage = () => {
    const [mainToken, setMainToken] = useState('12')

    const getToken = async () => {
        let data = JSON.stringify({
            // "Mandt": "400",
            // "ItemId": "I017",
            // "ItemDesc": "ABCDEFG",
            // "ItemPrice": "4500.00",
            // "Currency": "INR"
          });
          
          let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://v248s4i.exa-ag.com:8000/sap/opu/odata/sap/ZGW_ITEM_DETAILS1_SRV',
            headers: { 
              'x-csrf-token': 'Fetch', 
              'Content-Type': 'application/json', 
              'Authorization': 'Basic bW9uaXNoYW06TW9jcmF6ZTU0NDQq', 
            },
            data : data,
            withCredentials: true,
          };
          
          axios.request(config)
          .then(response => {
                // Check if the CSRF token is present in the response headers
                const csrfToken = response.headers['x-csrf-token'];
               
                if (csrfToken) {
                    setMainToken(csrfToken)
                  // Use the CSRF token as needed (e.g., store it in state or localStorage)
                  console.log('CSRF token:', csrfToken);
                } else {
                  console.log('CSRF token not found in the response headers.');
                }
            
                // Handle the rest of the response data here
              })
              .catch(error => {
                console.error('Error fetching data:', error);
              });
    }

    useEffect(() => {
        // getToken()
    }, []);

    return mainToken && (
        <Router>
            <Routes>
            <Route path="/" element={<Demo />} />  
            <Route path="/create" element={<CreateOrderPage token={mainToken} />} />  
            <Route path="/create-orders" element={<CreateOrders token={mainToken} />} />
            <Route path="/items" element={<CrudItem token={mainToken} />} />
            </Routes>
      
        </Router>
    )
}

export default LandingPage;