import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
export default function Player({ currentSurah }) {
  const audioRef = useRef(null);
  const [currentAyahIndex, setCurrentAyahIndex] = useState(0); // Track the current Ayah index
  const [isPlaying, setIsPlaying] = useState(false); // Track if audio is playing

  if (!currentSurah) {
    <div>Loading...</div>;
  }

  // Function to handle play button click
  const playAllAyahs = () => {
    if (currentAyahIndex < currentSurah.ayahs.length) {
      setIsPlaying(true);
    }
  };

  // Effect to handle playback of Ayahs
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.src = currentSurah.ayahs[currentAyahIndex].audio; // Set the audio source for the current Ayah
      audioRef.current.play(); // Play the current Ayah
    }
  }, [currentAyahIndex, isPlaying, currentSurah]);

  // Effect to handle moving to the next Ayah when the current one ends
  useEffect(() => {
    const handleAudioEnded = () => {
      setCurrentAyahIndex((prevIndex) => {
        if (prevIndex < currentSurah.ayahs.length - 1) {
          return prevIndex + 1; // Move to the next Ayah
        } else {
          setIsPlaying(false); // Stop playback when all Ayahs are done
          return prevIndex; // Return the last index
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
          icon={faPlay}
          onClick={playAllAyahs}
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
