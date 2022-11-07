import { useState } from "react";
import Confetti from "react-confetti";
import ConfettiExplosion from "react-confetti-explosion";

import "./confetti.css";

export const Congrats = () => {
  return <Confetti className="confetti" />;
};

export const CongratsTwo = () => {
  const source = {
    position: "absolute",
    right: "50%",
    left: "50%",
    bottom: 50,
  };
  const bigExplodeProps = {
    force: 0.6,
    duration: 5000,
    particleCount: 200,
    floorHeight: 1600,
    floorWidth: 1600,
  };

  return (
    <div style={source}>
      <ConfettiExplosion {...bigExplodeProps} />
    </div>
  );
};
