import { useState } from "react";
import classes from "./ModelInput.module.css";

const ModelInput = (props) => {
  const [text, setText] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    props.onSubmit(text);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <h2>Data: </h2>{" "}
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></input>
      <button type="submit">Send</button>
    </form>
  );
};

export default ModelInput;
