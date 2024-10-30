import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
export default function Player() {
  return (
    <div className="player">
      <div className="time-control">
        <p>start time</p>
        <input type="range" />
        <p>end time</p>
        <div className="play-control">
          <FontAwesomeIcon
            className="skip-back"
            size="2x"
            icon={faAngleLeft}
          ></FontAwesomeIcon>
          <FontAwesomeIcon
            className="play"
            size="2x"
            icon={faPlay}
          ></FontAwesomeIcon>
          <FontAwesomeIcon
            className="skip-forward"
            icon={faAngleRight}
            size="2x"
          ></FontAwesomeIcon>
        </div>
      </div>
    </div>
  );
}
