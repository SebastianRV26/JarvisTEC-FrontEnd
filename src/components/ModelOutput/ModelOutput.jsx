import classes from "./ModelOutput.module.css";

const ModelOutput = (props) => {
  return (
    <div className={classes.output}>
      <h2>Result: {props.result}</h2>
    </div>
  );
};

export default ModelOutput;
