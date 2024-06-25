function createCart() {
  let items = $state([]);

  function addToCart(id, options, quantity) {
    const found = items.findIndex(item => item.id === id && JSON.stringify(item.options) === JSON.stringify(options));
    if (found !== -1) {
      // Already in cart
      items[found].quantity += quantity;
    } else {
      // Not in cart
      items.push({id, options, quantity});
    }
  }

  function deleteFromCart(id, options) {
    const found = items.findIndex(item => item.id === id && JSON.stringify(item.options) === JSON.stringify(options));
    if (found !== -1) {
      items.splice(found, 1);
    }
  }

  return {
    get items() {
      return items;
    },
    addToCart,
    deleteFromCart,
  };
}

export const cart = createCart();