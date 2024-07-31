function createCart() {
  let items = $state([]);
  let open = $derived(items.length > 0);
  let numItems = $state(0);
  let total = $state(0);

  function addToCart(id, options, quantity, price) {
    quantity = Number(quantity);
    const found = items.findIndex(item => item.id === id && JSON.stringify(item.options) === JSON.stringify(options));
    if (found !== -1) {
      // Already in cart
      items[found].quantity += Number(quantity);
    } else {
      // Not in cart
      items.push({id, options, quantity, price});
    }
    numItems += quantity;
    total = parseFloat((total + quantity * price).toFixed(2));
  }

  function deleteFromCart(id, options) {
    const found = items.findIndex(item => item.id === id && JSON.stringify(item.options) === JSON.stringify(options));
    if (found !== -1) {
      const itemPrice = items[found].price;
      numItems -= items[found].quantity;
      total = parseFloat((total - items[found].quantity * itemPrice).toFixed(2));
      items.splice(found, 1);
    }
  }

  return {
    get items() {
      return items;
    },
    get open() {
      return open;
    },
    get numItems() {
      return numItems;
    },
    get total() {
      return total;
    },
    addToCart,
    deleteFromCart,
  };
}

export const cart = createCart();