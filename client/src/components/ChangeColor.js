import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeColor } from "../features/theme";

function ChangeColor() {
  const [color, setColor] = useState("");
  const dispatch = useDispatch();
  return (
    <div>
      <input
        type="text"
        placeholder="Enter a color"
        onChange={(event) => {
          setColor(event.target.value);
        }}
      ></input>
      <button
        onClick={() => {
          dispatch(changeColor(color));
        }}
      >
        Change Color
      </button>
    </div>
  );
}

export default ChangeColor;
