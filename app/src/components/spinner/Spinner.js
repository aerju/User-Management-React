import React from "react";
import { Spinner } from "react-bootstrap";

function SpinnerEffect() {
  return (
    // <div
    //   className="d-flex justify-content-center align-items-center"
    //   style={{ height: "100vh" }}
    // >
    //   <Spinner animation="border" role="status">
    //     <span className="visually-hidden">Loading...</span>
    //   </Spinner>
    // </div>

<div className="d-flex justify-content-center align-items-center vh-100">
<div className="spinner-overlay">
  <div className="spinner-border text-primary" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>
</div>
  
  );
}

export default SpinnerEffect;
