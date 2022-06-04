import classes from "./Card.module.css";

const Card = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes.jarvisContainer}>{props.children}</div>
    </div>
  );
};

export default Card;
