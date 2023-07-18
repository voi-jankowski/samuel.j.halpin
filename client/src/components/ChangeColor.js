import React, { useState } from "react";

function ChangeColor() {
  const [color, setColor] = useState("");
  return (
    <div>
      <input
        type="text"
        placeholder="Enter a color"
        onChange={(event) => {
          setColor(event.target.value);
        }}
      ></input>
      <button>Change Color</button>
    </div>
  );
}

export default ChangeColor;
