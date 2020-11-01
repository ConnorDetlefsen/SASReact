import React from "react";

const RideSelection = ({
  name,
  value,
  time,
  image,
  stateVar,
  checked,
  onChange,
  purchased,
  displayButton,
  onClick,
  id,
}) => {
  return (
    <React.Fragment>
      <div class="buyRideCard">
        <img class="center rideImage" src={image} alt="ride pic"></img>
        <div>
          <p>{name}</p>
          <p>
            ${value} | {time} Minutes
          </p>
          <label class="form-check-label">
            <input
              type="checkbox"
              stateVar={stateVar}
              checked={checked}
              onChange={onChange}
            />
            Kid Friendly?
          </label>
          <br />
          {!purchased && (
            <button
              time={time}
              type="button"
              onClick={onClick}
              class="btn btn-primary"
              value={value}
              name={name}
              id={id}
              stateVar={stateVar}
            >
              Purchase: ${value}
            </button>
          )}
          {purchased && <h4>Purchased</h4>}
        </div>
      </div>
    </React.Fragment>
  );
};

export default RideSelection;
