import { useState } from "react";

const ModelInput = (props) => {
  const [text, setText] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    props.onSubmit(text);
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></input>
      <button type="submit">Enviar</button>
    </form>
  );
};

export default ModelInput;
