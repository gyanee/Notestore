import React from "react";
import { Spinner } from "react-bootstrap";

const Loading = ({ size = 100 }) => {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", textAlign: "center" }}
    >
      <Spinner
        animation="border"
        role="status"
        style={{ width: size, height: size }}
      />
    </div>
  );
};

export default Loading;
