import React from "react";

function AntySpam({ test, setTest }) {

  return (
    <div>
      <input
        type="text"
        className="authoryzation__phone"
        value={test}
        onChange={(e) => setTest(e.target.value)}
      />
    </div>
  );
}

export default AntySpam;
