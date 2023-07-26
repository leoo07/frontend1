import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ORDERS_IMG from '../assets/ord.png';
import customer_img from '../assets/customer.png';
import item_img from '../assets/item.png';
import Style from './LandingPage.module.css';
import CreateOrderPage from "./CreatePage";
import CreateOrders from "./CreateCustomer";
import CrudItem from "./CrudItem";

export const Demo = () => {
    return (       
        <>
           
                <div className="{Style.landingMainHeading}">
                    <h1 className={Style.landingMainHeading}>ORDER DETAILS</h1>
                </div>

                <div className={Style.buttonGroup}>
                    <Link to="/create" className={Style.imagewr}>
                        <img src={ORDERS_IMG} alt="Orders" className={Style.image} />
                        <span>ORDERS</span>
                    </Link>
                    <Link to="/create-orders" className={Style.imagewr}>
                        <img src={customer_img} alt="Customer" className={Style.image} />
                        <span>CUSTOMER</span>
                    </Link>
                    <Link to="/items" className={Style.imagewr}>
                        <img src={item_img} alt="Items" className={Style.image} />
                        <span>ITEMS</span>
                    </Link>
                </div>
            
        </>
    )
}