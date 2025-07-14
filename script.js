const inventory = [];

function findProductIndex(productName) {
  return inventory.findIndex(item => item.name.toLowerCase() === productName.toLowerCase());
}

function addProduct(productObj) {
  let index = findProductIndex(productObj.name);
  if (index !== -1) {
    inventory[index].quantity += productObj.quantity;
    alert(`${productObj.name.toLowerCase()} quantity updated`);
  } else {
    inventory.push({
      name: productObj.name.toLowerCase(),
      quantity: productObj.quantity
    });
    alert(`${productObj.name.toLowerCase()} added to inventory`);
  }
  renderInventory();
}

function removeProduct(product, quantity) {
  const index = findProductIndex(product);
  if (index === -1) {
    alert(`${product.toLowerCase()} not found`);
    return;
  }

  let currentQuantity = inventory[index].quantity;
  if (quantity > currentQuantity) {
    alert(`Not enough ${product.toLowerCase()} available, remaining pieces: ${currentQuantity}`);
  } else {
    let newQty = currentQuantity - quantity;
    if (newQty === 0) {
      inventory.splice(index, 1);
    } else {
      inventory[index].quantity = newQty;
    }
    alert(`Remaining ${product.toLowerCase()} pieces: ${newQty}`);
  }
  renderInventory();
}

function renderInventory() {
  const list = document.getElementById("inventoryList");
  list.innerHTML = "";
  inventory.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name.toUpperCase()} - Quantity: ${item.quantity}`;
    list.appendChild(li);
  });
}

// Event handlers
function handleAdd() {
  const name = document.getElementById("productName").value;
  const qty = parseInt(document.getElementById("productQty").value);
  if (name && qty > 0) {
    addProduct({ name, quantity: qty });
  } else {
    alert("Enter valid product name and quantity");
  }
}

function handleRemove() {
  const name = document.getElementById("productName").value;
  const qty = parseInt(document.getElementById("productQty").value);
  if (name && qty > 0) {
    removeProduct(name, qty);
  } else {
    alert("Enter valid product name and quantity");
  }
}
