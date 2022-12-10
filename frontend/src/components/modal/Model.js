import React from "react";
import "./model.css";
const Model = ({ showModel, setShowModel, children }) => {
  return (
    <div className={showModel ? "modal-container" : "card-remove"}>
      <div className={showModel ? "modal-card" : "card-remove"}>
        <small className="modal-close" onClick={() => setShowModel(false)}>
          x
        </small>
        {children}
      </div>
    </div>
  );
};

export default Model;
