import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faPause,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
export default function Player({ currentSurah }) {
  const audioRef = useRef(null);
  const [currentAyahIndex, setCurrentAyahIndex] = useState(0); // Track the current Ayah index
  const [isPlaying, setIsPlaying] = useState(false); // Track if audio is playing

  if (!currentSurah) {
    <div>Loading...</div>;
  }
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause(); // Pause the audio
      setIsPlaying(false); // Update state
    } else {
      if (currentAyahIndex === currentSurah.ayahs.length) {
        setCurrentAyahIndex(0);
      }
      playCurrentAyah(); // Play the current Ayah
    }
  };

  // Function to play the current Ayah
  const playCurrentAyah = () => {
    audioRef.current.src = currentSurah.ayahs[currentAyahIndex].audio; // Set the audio source for the current Ayah
    audioRef.current
      .play()
      .then(() => setIsPlaying(true)) // Set playing state to true if play is successful
      .catch((error) => console.error("Error playing audio:", error)); // Handle any errors
  };

  // Effect to handle moving to the next Ayah when the current one ends
  useEffect(() => {
    const handleAudioEnded = () => {
      setCurrentAyahIndex((prevIndex) => {
        if (prevIndex < currentSurah.ayahs.length - 1) {
          return prevIndex + 1; // Move to the next Ayah
        } else {
          setIsPlaying(false); // Stop playback when all Ayahs are done
          return 0; // Stay on the last Ayah
        }
      });
    };

    const currentAudio = audioRef.current;

    if (currentAudio) {
      currentAudio.addEventListener("ended", handleAudioEnded);
    }

    return () => {
      if (currentAudio) {
        currentAudio.removeEventListener("ended", handleAudioEnded); // Cleanup event listener
      }
    };
  }, [currentSurah]);

  // Effect to play the next Ayah when the current one ends
  useEffect(() => {
    if (isPlaying && currentAyahIndex < currentSurah.ayahs.length) {
      playCurrentAyah(); // Play the current Ayah if playing and valid index
    }
  }, [currentAyahIndex, isPlaying, currentSurah]);

  return (
    <div className="player">
      <div className="time-control">
        <p>start time</p>
        <input type="range" />
        <p>end time</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        ></FontAwesomeIcon>
        <FontAwesomeIcon
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
          onClick={togglePlayPause}
        ></FontAwesomeIcon>
        <FontAwesomeIcon
          className="skip-forward"
          icon={faAngleRight}
          size="2x"
        ></FontAwesomeIcon>
      </div>
      <audio ref={audioRef} />
    </div>
  );
}
