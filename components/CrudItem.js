import axios from 'axios';
import './CrudItem.css';
import { useState } from "react";

const CrudItem = (props) => {
    const { token } = props;

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

    // Commented for testingW
    const handleCreateItem = async () => {


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
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Basic bW9uaXNoYW06TW9jcmF6ZTU0NDQq',
                'SameSite': 'None', // Set the SameSite attribute for the cookie
                'Cookie': 'SAP_SESSIONID_S4I_400=0yttGgn7rmjCskkaxvJm4zoipwMqvBHuvzwADCmqmLU%3d; sap-usercontext=sap-client=400'
            },
            data: data,
            withCredentials: true,
        };

        axios.request(config)
            .then(async response => {
                // Check if the CSRF token is present in the response headers
                const csrfToken = response.headers['x-csrf-token'];
                const cookie = response.headers['set-cookie'];

                if (csrfToken) {
                    // setMainToken(csrfToken)
                    // Use the CSRF token as needed (e.g., store it in state or localStorage)
                    console.log('CSRF token:', csrfToken, cookie, response?.headers);

                    const newItem = {
                        ItemId: itemid,
                        ItemDesc: itemdesc,
                        Currency: itemcur,
                        ItemPrice: itemprice,
                        ItemQuantity: itemquantity,
                        ItemAmount: itemamount,
                    };

                    const instance = axios.create({
                        withCredentials: true
                    })

                    const headers = {
                        'Content-Type': 'application/json',
                        "Authorization": "Basic bW9uaXNoYW06TW9jcmF6ZTU0NDQq",
                        'Access-Control-Allow-Origin': '*',
                        "x-csrf-token": csrfToken,
                        'SameSite': 'None', // Set the SameSite attribute for the cookie
                        'Cookie': 'SAP_SESSIONID_S4I_400=0yttGgn7rmjCskkaxvJm4zoipwMqvBHuvzwADCmqmLU%3d; sap-usercontext=sap-client=400'
                    };

                    try {
                        const response = await instance.post(`http://v248s4i.exa-ag.com:8000/sap/opu/odata/sap/ZGW_ITEM_DETAILS1_SRV/Item_DetailsSet`, { ...newItem }, { headers: headers, withCredentials: true });

                        // Handle the response as needed
                        console.log('API call successful:', response.data);
                    } catch (error) {
                        console.error('Error making API call:', error);
                    }
                } else {
                    console.log('CSRF token not found in the response headers.');
                }

                // Handle the rest of the response data here
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

    };

    // Commented for testing
    const handleDeleteItem = async () => {
        console.log('okokok')


        let config = {
            method: 'head',
            maxBodyLength: Infinity,
            url: 'http://v248s4i.exa-ag.com:8000/sap/opu/odata/sap/ZGW_ITEM_DETAILS1_SRV',
            headers: {
                "x-csrf-token": "Fetch",
                "Content-Type": "application/json",
                "Authorization": "Basic bW9uaXNoYW06TW9jcmF6ZTU0NDQq",
            },
            withCredentials: false,
        };

        axios.request(config)
            .then(response => {
                // Check if the CSRF token is present in the response headers
                const csrfToken = response.headers['x-csrf-token'];

                if (csrfToken) {
                    // setMainToken(csrfToken)
                    // Use the CSRF token as needed (e.g., store it in state or localStorage)
                    console.log('CSRF token1212121:', response.headers);


                    const apiUrl = `http://v248s4i.exa-ag.com:8000/sap/opu/odata/sap/ZGW_ITEM_DETAILS1_SRV/Item_DetailsSet('I016')`;

                    // const csrfToken = `PW30CezvsinMW_HMGkCqSQ==`;

                    axios.delete(apiUrl, {
                        "headers": {
                            "Authorization": "Basic bW9uaXNoYW06TW9jcmF6ZTU0NDQq",
                            "x-csrf-token": csrfToken
                        }
                    })
                        .then((response) => {
                            console.log('Resource deleted successfully.');
                        })
                        .catch((error) => {
                            console.error('Error deleting resource:', error);
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
    // commented for testing
    const handleUpdateItem = () => {
        const updatedItem = {
            ItemId: itemid,
            ItemDesc: itemdesc,
            Currency: itemcur,
            ItemPrice: itemprice,
            ItemQuantity: itemquantity,
            ItemAmount: itemamount,
        };

        axios.put(`http://v248s4i.exa-ag.com:8000/sap/opu/odata/sap/ZGW_ITEM_DETAILS1_SRV/Item_DetailsSet${itemid}`, {
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
    // end of comment
    const handleDisplayItem = () => {
        //debugger;
        fetch(
            `http://v248s4i.exa-ag.com:8000/sap/opu/odata/sap/ZGW_ITEM_DETAILS1_SRV/Item_DetailsSet('${itemid}')?$format=json`
        )

            .then((response) => {
                return response.json();
            })
            .then((data) => {
                const { ItemId, ItemDesc, ItemPrice, Currency } = data.d;
                setFulltableDetails([{ ItemId, ItemDesc, ItemPrice, Currency }]);
                console.log(data);
            }
            )

    }

    return (
        <div>
            <div className='button-container'>
                <button onClick={handleCreateClick}>Create Item</button>
                <button onClick={handleDeleteClick}>Delete Item</button>
                <button onClick={handleUpdateClick}>Update Item</button>
                <button onClick={handleDisplayClick}>Display Item</button>
            </div>


            {showCreate ?
                <div>
                    <h1>Create Item</h1>
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

                    {/* <button onClick={handleCreateItem}>Create Item</button> */}

                </div>
                : null}


            {showDelete ?
                <div>
                    <h1>Delete Item</h1>
                    <input
                        type="text"
                        placeholder="Item ID"
                        value={itemid}
                        onChange={(e) => setItemId(e.target.value)}
                    />
                    {/* <button onClick={handleDeleteItem}>Delete Item</button> */}
                    <button onClick={() => {
                        handleDisplayItem()
                    }}>Delete Item</button>
                </div>
                : null}

            {showUpdate ?
                <div>
                    <h1>Update Item</h1>
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
                    <h1>Display Item</h1>
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
                                    <th>Currency</th>
                                </tr>
                            </thead>
                            <tbody>
                                {fullTableDetails.map(({ ItemId, ItemDesc, ItemPrice, Currency }) => {
                                    return (
                                        <tr>
                                            <td>{ItemId}</td>
                                            <td>{ItemDesc}</td>
                                            <td>{ItemPrice}</td>
                                            <td>{Currency}</td>
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

export default CrudItem;