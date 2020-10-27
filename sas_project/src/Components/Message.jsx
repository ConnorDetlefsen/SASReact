import React from "react";

const Ticket = ({
  name,
  description,
  onChange,
  id,
  checkedYes,
  checkedNo,
  stateName,
}) => {
  return (
    <div>
      <h1>Question: </h1>
      <p>{description}</p>

      <label class="form-check-label">
        <input type="checkbox" checked={checkedYes} onChange={onChange} />
        Yes
      </label>

      <label class="form-check-label">
        <input type="checkbox" checked={checkedNo} onChange={onChange} />
        No
      </label>
      <textarea
        onChange={onChange}
        stateName={stateName}
        className="form-control"
        rows="6"
        cols="10"
      ></textarea>
    </div>
  );
};

export default Ticket;
