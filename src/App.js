import { useEffect, useState } from "react";
import Player from "./components/Player";
import Song from "./components/Song";
import "./style/app.scss";
function App() {
  const [surahs, setSurahs] = useState([]);
  const [currentSurah, setCurrentSurah] = useState(null);
  useEffect(() => {
    // Fetch data on component mount
    fetch("https://api.alquran.cloud/v1/quran/ar.alafasy")
      .then((response) => response.json())
      .then((data) => setSurahs(data.data.surahs))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    if (surahs.length > 0) {
      setCurrentSurah(surahs[0]);
    }
  }, [surahs]);

  return (
    <div className="App">
      <Song currentSurah={currentSurah}></Song>
      <Player currentSurah={currentSurah}></Player>
    </div>
  );
}

export default App;
