import React from "react";
import "./AntySpam.css"

function AntySpam({ test, setTest }) {

  return (
    <div>
      <input
        type="text"
        className="phone"
        value={test}
        onChange={(e) => setTest(e.target.value)}
      />
    </div>
  );
}

export default AntySpam;
