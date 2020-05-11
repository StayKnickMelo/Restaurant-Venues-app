const getRating = (rating) => {

  const starPercentage = rating / 5 * 100;

  const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;

  return starPercentageRounded;
};


export default getRating;