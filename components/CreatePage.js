import React, { useState } from "react";
import axios from 'axios';

const CreateOrderPage = (props) => {
  const {token} = props;

  console.log('token12', token)

  const [showCreate, setShowCreate] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [showUpdate, setShowUpdate] = useState(false)
  const [showDisplay, setShowDisplay] = useState([]);

  let itemData = [];
  const handleCreateClick = () => {
    setShowCreate(!showCreate);
    setShowDelete(false);
    setShowUpdate(false);
    setShowDisplay(false);
  };
  const handleDeleteClick = () => {
    setShowDelete(!showDelete)
    setShowUpdate(false);
    setShowDisplay(false);
    setShowCreate(false);
  }
  const handleUpdateClick = () => {
    setShowUpdate(!showUpdate)
    setShowDisplay(false);
    setShowCreate(false);
    setShowDelete(false);
  }
  const handleDisplayClick = () => {
    setShowDisplay(!showDisplay)
    setShowCreate(false);
    setShowDelete(false);
    setShowUpdate(false);
  }


  const [itemid, setItemId] = useState("");
  const [itemdesc, setItemDesc] = useState("");
  const [itemcur, setItemCur] = useState("");
  const [itemprice, setItemPrice] = useState("");
  const [itemquantity, setItemQuantity] = useState("");
  const [itemamount, setItemAmount] = useState("");

  // State to store table response
  const [fullTableDetails, setFulltableDetails] = useState([])

  const getToken = async () => {
    
} 

  const handleCreateItem = () => {
    const newItem = {
      ItemId: itemid,
      ItemDesc: itemdesc,
      Currency: itemcur,
      ItemPrice: itemprice,
      ItemQuantity: itemquantity,
      ItemAmount: itemamount,
    };

    fetch(
      `http://v248s4i.exa-ag.com:8000/sap/opu/odata/sap/ZGW_ITEM_DETAILS1_SRV/Item_DetailsSet('${itemid}')?$format=json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error creating item:', error);
      });
  };


  const handleDeleteItem = async () => {
    console.log('okokok')
    let data = JSON.stringify({
      "Mandt": "400",
      "ItemId": "I017",
      "ItemDesc": "ABCDEFG",
      "ItemPrice": "4500.00",
      "Currency": "INR"
    });

    let data2 = JSON.stringify({
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
      withCredentials: true,
    };
    
    axios.request(config)
    .then(response => {
          // Check if the CSRF token is present in the response headers
          const csrfToken = response.headers['x-csrf-token'];
         
          if (csrfToken) {
              // setMainToken(csrfToken)
            // Use the CSRF token as needed (e.g., store it in state or localStorage)
            console.log('CSRF token1212121:', response.headers);

            let config2 = {
              method: 'delete',
              maxBodyLength: Infinity,
              url: `http://v248s4i.exa-ag.com:8000/sap/opu/odata/sap/ZGW_ITEM_DETAILS1_SRV/Item_DetailsSet('I014')`,
              headers: { 
                'x-csrf-token': `${csrfToken}`, 
                'Content-Type': 'application/json', 
                'Authorization': 'Basic bW9uaXNoYW06TW9jcmF6ZTU0NDQq',
              },
              withCredentials: true,
            };
            
            axios.request(config2)
            .then((response) => {
              console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
              console.log(error);
            });


            // return csrfToken;
          } else {
            console.log('CSRF token not found in the response headers.');
            return null;
          }
      
          // Handle the rest of the response data here
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          return null;
        });
    
    
    

  };


  const handleDisplayItem = () => {
    //debugger;
    fetch(
      `http://v248s4i.exa-ag.com:8000/sap/opu/odata/sap/ZGW_ITEM_DETAILS1_SRV/Item_DetailsSet('${itemid}')?$format=json`
    )

      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const { Mandt, ItemId, ItemDesc, ItemPrice, Currency } = data.d;
        setFulltableDetails([{ Mandt, ItemId, ItemDesc, ItemPrice, Currency }]);
        console.log(data);
      }
      )

  }

  return (
    <div>
      <div className='button-container'>
        <button onClick={handleCreateClick}>Create Order</button>
        <button onClick={handleDeleteClick}>Delete Order</button>
        <button onClick={handleUpdateClick}>Update Order</button>
        <button onClick={handleDisplayClick}>Display Order</button>
      </div>


      {showCreate ?
        <div>
          <h1>Create Order</h1>
          <input
            type="text"
            placeholder="Item ID"
            value={itemid}
            onChange={(e) => setItemId(e.target.value)}
          />
          <input
            type="text"
            placeholder="Item Description"
            value={itemdesc}
            onChange={(e) => setItemDesc(e.target.value)}
          />
          <input
            type="text"
            placeholder="Item Currency"
            value={itemcur}
            onChange={(e) => setItemCur(e.target.value)}
          />
          <input
            type="number"
            placeholder="Item Price"
            value={itemprice}
            onChange={(e) => setItemPrice(e.target.value)}
          />
          <input
            type="text"
            placeholder="Item Quantity"
            value={itemquantity}
            onChange={(e) => setItemQuantity(e.target.value)}
          />
          <input
            type="text"
            placeholder="Item Amount"
            value={itemamount}
            onChange={(e) => setItemAmount(e.target.value)}
          />

          <button onClick={handleCreateItem}>Create Order</button>
        </div>
        : null}


      {showDelete ?
        <div>
          <h1>Delete Order</h1>
          <input
            type="text"
            placeholder="Item ID"
            value={itemid}
            onChange={(e) => setItemId(e.target.value)}
          />
          <button onClick={handleDeleteItem}>Delete Order</button>
        </div>
        : null}

      {showUpdate ?
        <div>
          <h1>Update Order</h1>
          <input
            type="text"
            placeholder="Item ID"
            value={itemid}
            onChange={(e) => setItemId(e.target.value)}
          />

          <input
            type="text"
            placeholder="Item Description"
            value={itemdesc}
            onChange={(e) => setItemDesc(e.target.value)}
          />
          <input
            type="text"
            placeholder="Item Currency"
            value={itemcur}
            onChange={(e) => setItemCur(e.target.value)}
          />
          <input
            type="number"
            placeholder="Item Price"
            value={itemprice}
            onChange={(e) => setItemPrice(e.target.value)}
          />
          <input
            type="text"
            placeholder="Item Quantity"
            value={itemquantity}
            onChange={(e) => setItemQuantity(e.target.value)}
          />
          <input
            type="text"
            placeholder="Item Amount"
            value={itemamount}
            onChange={(e) => setItemAmount(e.target.value)}
          />
          {/* <button onClick={handleUpdateItem}>Update Order</button> */}
        </div>
        : null}



      {showDisplay ?
        <div>
          <h1>Display Order</h1>
          <input
            type="text"
            placeholder="Item ID"
            value={itemid}
            onChange={(e) => setItemId(e.target.value)}
          />
          {/* <button onClick={handleDisplayItem}>Display Item</button> */}

          <button onClick={() => {
            handleDisplayItem()
          }}>Display Order</button>

          {fullTableDetails && fullTableDetails.length > 0 ?

            <table class="table-design">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Val</th>
                </tr>
              </thead>
              <tbody>
                {fullTableDetails.map(({ ItemId, ItemDesc, ItemPrice, Mandt }) => {
                  return (
                    <tr>
                      <td>{ItemId}</td>
                      <td>{ItemDesc}</td>
                      <td>{ItemPrice}</td>
                      <td>{Mandt}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            : null}
        </div>
        : null}
    </div>



  )
};
/*const [showCreate, setShowCreate] = useState(false)


const [orderNumber, setOrderNumber] = useState("");
const [date, setDate] = useState("");
const [customerId, setCustomerId] = useState("");
const [amount, setAmount] = useState("");
const [currency, setCurrency] = useState("");

const handleCreateOrder = () => {
  // Perform actions to create an order using the input values
  // For this example, we'll just log the order details
  console.log("Order Number:", orderNumber);
  console.log("Date:", date);
  console.log("Customer ID:", customerId);
  console.log("Amount:", amount);
  console.log("Currency:", currency);
};

return (
  <div>
    <h1>Create Order</h1>
    <input
      type="text"
      placeholder="Order Number"
      value={orderNumber}
      onChange={(e) => setOrderNumber(e.target.value)}
    />
    <input
      type="date"
      placeholder="Date"
      value={date}
      onChange={(e) => setDate(e.target.value)}
    />
    <input
      type="text"
      placeholder="Customer ID"
      value={customerId}
      onChange={(e) => setCustomerId(e.target.value)}
    />
    <input
      type="text"
      placeholder="Amount"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
    />
    <input
      type="text"
      placeholder="Currency"
      value={currency}
      onChange={(e) => setCurrency(e.target.value)}
    />
    <button onClick={handleCreateOrder}>Create Order</button>
  </div>
);*/








export default CreateOrderPage;
