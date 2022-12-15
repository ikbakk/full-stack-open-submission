const FlashMessage = ({ message, type }) => {
  if (message === null) {
    return null;
  }

  const classes =
    type === "error" ? "flash flash-error" : "flash flash-success";

  return <div className={classes}>{message}</div>;
};

export default FlashMessage;
