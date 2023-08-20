import React from "react";

const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h2>Loading...</h2>
      {/* You can add a loading spinner or animation here */}
    </div>
  );
};

export default Loading;
