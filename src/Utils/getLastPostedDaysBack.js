const getLastPostedDaysBack = (lastPostedTimestamp) => {
  const timeDifference = new Date().getTime() - lastPostedTimestamp;
  const daysBack = Math.floor(timeDifference / 86400000);

  return daysBack;
};

export default getLastPostedDaysBack;
