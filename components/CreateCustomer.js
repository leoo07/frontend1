import { useState } from "react";

const CreateCustomer = () => {

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


  const handleDeleteItem = () => {

      // fetch(
      //     `http://v248s4i.exa-ag.com:8000/sap/opu/odata/sap/ZGW_ITEM_DETAILS1_SRV/Item_DetailsSet('${itemid}')?$format=json`, 
      //         {
      //       method: 'DELETE',
      //       headers: {
      //         'Content-Type': 'application/json',
      //         // 'Authorization': `Basic ${btoa(`${'monisham'}:${'Mocraze5444*'}`)}`,
      //       },
      //     }
      //   )
      //     .then((response) => response.json())
      //     .then((data) => {
      //       console.log(data);
      //       setItemId('');

      //       setShowDelete(false); // Hide the delete section if needed
      //     })
      //     .catch((error) => {
      //       // Handle any errors that occurred during the request
      //       console.error('Error deleting item:', error);
      //     });


      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Basic bW9uaXNoYW06TW9jcmF6ZTU0NDQq");



      const raw = JSON.stringify({
          "fcstModel_code": "01",
          "refTypeCode": "APP",
          "refTypeDesc": "DESCUP",
          "histPer": 1,
          "histPerMax": 1,
          "histPerChg": true,
          "sequence": 1
      });



      const requestOptions = {
          method: 'DELETE',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
      };



      fetch(`http://v248s4i.exa-ag.com:8000/sap/opu/odata/sap/ZGW_ITEM_DETAILS1_SRV/Item_DetailsSet('I017')?$format=json`, requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));


  };

  const handleUpdateItem = () => {
      const updatedItem = {
          ItemId: itemid,
          ItemDesc: itemdesc,
          Currency: itemcur,
          ItemPrice: itemprice,
          ItemQuantity: itemquantity,
          ItemAmount: itemamount,
      };

      fetch(`http://v248s4i.exa-ag.com:8000/sap/opu/odata/sap/ZGW_ITEM_DETAILS1_SRV/Item_DetailsSet${itemid}`, {
          method: 'PUT', // or 'PATCH' depending on your server API
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedItem),
      })
          .then((response) => response.json())
          .then((data) => {
              console.log(data);
          })
          .catch((error) => {

              console.error('Error updating item:', error);
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
          <button onClick={handleCreateClick}>Create Customer</button>
          <button onClick={handleDeleteClick}>Delete Customer</button>
          <button onClick={handleUpdateClick}>Update Customer</button>
          <button onClick={handleDisplayClick}>Display Customer</button>
          </div>


          {showCreate ?
              <div>
                  <h1>Create Customer</h1>
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

                  <button onClick={handleCreateItem}>Create Item</button>
              </div>
              : null}


          {showDelete ?
              <div>
                  <h1>Delete Customer</h1>
                  <input
                      type="text"
                      placeholder="Item ID"
                      value={itemid}
                      onChange={(e) => setItemId(e.target.value)}
                  />
                  <button onClick={handleDeleteItem}>Delete Item</button>
              </div>
              : null}

          {showUpdate ?
              <div>
                  <h1>Update Customer</h1>
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
                  <button onClick={handleUpdateItem}>Update Item</button>
              </div>
              : null}



          {showDisplay ?
              <div>
                  <h1>Display Customer</h1>
                  <input
                      type="text"
                      placeholder="Item ID"
                      value={itemid}
                      onChange={(e) => setItemId(e.target.value)}
                  />
                  {/* <button onClick={handleDisplayItem}>Display Item</button> */}

                  <button onClick={() => {
                      handleDisplayItem()
                  }}>Display Item</button>

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
}


   /* const [showCreate, setShowCreate] = useState(false)
    const [showDelete, setShowDelete] = useState(false)

    const handleCreateClick = () => setShowCreate(!showCreate)
    const handleDeleteClick = () => setShowDelete(!showDelete)

  const [customerid, setCustomerId] = useState("");
  const [customername, setCustomerName] = useState("");
  const [date, setDate] = useState("");
  const [mobilenumber, setMobile] = useState("");A
  const [email, setEmail] = useState("");

  const handleCreateOrder = () => {
    // Perform actions to create an order using the input values
    // For this example, we'll just log the order details
    console.log("Customer ID:", customerid);
    console.log("Customer Name:", customername);
    console.log("Date Of Birth:", date);
    console.log("Mobile Number:", mobilenumber);
    console.log("Email:", email);
  };

    return(
        <div>
            <button onClick={handleCreateClick}>Create</button>
         
        
        {showCreate ? 
            <div>
            <h1>Create Customer</h1>
            <input
              type="text"
              placeholder="Customer ID"
              value={customerid}
              onChange={(e) => setCustomerId(e.target.value)}
            />
            <input
              type="text"
              placeholder="Customer Name"
              value={customername}
              onChange={(e) => setCustomerName(e.target.value)}
            />
            <input
              type="date"
              placeholder="Date Of Birth"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <input
              type="number"
              placeholder="Mobile Number"
              value={mobilenumber}
              onChange={(e) => setMobile(e.target.value)}
            />
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
           
            <button onClick={handleCreateOrder}>Create Customer</button>
          </div>
        : null}

       
        </div>
    )
}*/

export default CreateCustomer;