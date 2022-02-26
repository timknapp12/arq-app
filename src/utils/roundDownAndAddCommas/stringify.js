const stringify = (number) =>
  Math.floor(number)
    ?.toString()
    ?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export default stringify;
