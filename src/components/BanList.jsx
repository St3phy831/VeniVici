import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import "./BanList.css";

const BanList = (props) => {
  return (
    <div className="BanList">
      <h2>Ban List</h2>
      <h4>Select an attribute in your search to ban it.</h4>
      <div className="list">
        {Object.values(props.list).map((arr) =>
          arr.map((value) => <Button>{value}</Button>)
        )}
      </div>
    </div>
  );
};

export default BanList;
