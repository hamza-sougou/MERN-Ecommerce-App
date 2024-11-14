export const updateCart = (state) => {
  state.itemsPrice = state.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  state.shippingPrice = state.itemsPrice > 100 ? 0 : 10;

  state.taxPrice = Number(0.18 * state.itemsPrice);

  state.totalPrice =
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice);

  localStorage.setItem("cart", JSON.stringify(state));
  return state;
};
