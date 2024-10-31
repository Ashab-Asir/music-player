import React from "react";
import quranImage from "../assets/Sworn.jpg";
export default function Song({ currentSurah }) {
  if (!currentSurah) {
    return <div>Loading...</div>; // Show a loading message or placeholder
  }
  console.log(currentSurah);
  return (
    <div className="song-container">
      <img src={quranImage} alt="qruan" />
      <h2>{currentSurah.englishName}</h2>
    </div>
  );
}
