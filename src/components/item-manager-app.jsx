import "./item-manager-app.css"

import { useState, useRef } from "react";

import deleteLogo from '../assets/delete.svg';
import stationaryLogo from '../assets/ink_pen.svg';
import kitchenwareLogo from "../assets/flatware.svg";
import applianceLogo from "../assets/electrical_services.svg";

function ItemManager () {

  /*
   * !!! IMPORTANT !!!
   * - You MUST use the given states and refs in your code.
   * - You MAY add additional state, refs, and variables if needed.
   */

  const [items, setItems] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  // You must use this ref for the item name input
  const itemName = useRef(null);

  //TODO: Your code goes here

  /*
   * !!! IMPORTANT !!!
   * - Implement your output based on the given sample layout.
   * - The id and className attributes below MUST be preserved.
   * - Your CSS MUST use the existing id and className selectors.
   */

  // Additional refs
  const itemCategory = useRef(null);
  const itemPrice = useRef(null);

  const getCategoryIcon = (category) => {
    if (category === "Stationary") return stationaryLogo;
    if (category === "Kitchenware") return kitchenwareLogo;
    if (category === "Appliance") return applianceLogo;
    return null;
  };

  const handleAddItem = () => {
    const name = itemName.current.value.trim();
    const category = itemCategory.current.value;
    const price = Number(itemPrice.current.value);

    // Validation
    if (!name) {
      setErrorMsg("Item name must not be empty");
      return;
    }

    if (
      items.some(
        (item) => item.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      setErrorMsg("Item must not be duplicated");
      return;
    }

    if (!category) {
      setErrorMsg("Please select a category");
      return;
    }

    if (price < 0) {
      setErrorMsg("Price must not be less than 0");
      return;
    }

    const newItem = {
      id: items.length + 1,
      name,
      category,
      price: price.toFixed(2),
    };

    setItems([...items, newItem]);
    setErrorMsg("");

    // Clear inputs
    itemName.current.value = "";
    itemCategory.current.value = "";
    itemPrice.current.value = "";
  };

  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <>
      <div id="h1">
        Item Management
      </div>
      <div id="data-area">
        <table id="item-table" className="item-table">
          <thead>
            <tr>
              <th id="col-item-id">ID</th>
              <th id="col-item-name">Name</th>
              <th id="col-item-category">Category</th>
              <th id="col-item-price">Price</th>
              <th id="col-item-action">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  <img
                    src={getCategoryIcon(item.category)}
                    alt={item.category}
                  />
                </td>
                <td>{item.price}</td>
                <td>
                  <img
                    src={deleteLogo}
                    alt="delete"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDelete(item.id)}
                  />
                </td>
              </tr>
            ))}

            {/* FORM ROW */}
            <tr>
              <td></td>
              <td>
                <input type="text" ref={itemName} />
              </td>
              <td>
                <select ref={itemCategory}>
                  <option value="">-- Select --</option>
                  <option value="Stationary">Stationary</option>
                  <option value="Kitchenware">Kitchenware</option>
                  <option value="Appliance">Appliance</option>
                </select>
              </td>
              <td>
                <input type="number" ref={itemPrice} defaultValue="0" />
              </td>
              <td>
                <button onClick={handleAddItem}>Add Item</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div id="error-message">
         {errorMsg}
      </div>
    </>
  );
}

export default ItemManager