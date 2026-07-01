import { useState } from "react";
import "./App.css";

const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [artwork, setArtwork] = useState(null);
  const [banList, setBanList] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const getArtwork = async () => {
    setLoading(true);
    let result = null;
    let attempts = 0;

    while (!result && attempts < 30) {
      attempts++;

      const randomPage = Math.floor(Math.random() * 1200) + 1;

      try {
        const res = await fetch(
          `https://api.harvardartmuseums.org/object?apikey=${API_KEY}&size=1&page=${randomPage}&hasimage=1&fields=id,title,culture,period,classification,primaryimageurl,people`
        );

        const data = await res.json();

        if (data.records && data.records.length > 0) {
          const record = data.records[0];

          const culture = record.culture || "Unknown";
          const period = record.period || "Unknown";
          const classification = record.classification || "Unknown";
          const artist =
            record.people?.[0]?.name || "Unknown Artist";

          const isBanned =
            banList.includes(culture) ||
            banList.includes(period) ||
            banList.includes(classification) ||
            banList.includes(artist);

          if (!isBanned && record.primaryimageurl) {
            result = {
              id: record.id,
              title: record.title || "Untitled",
              culture,
              period,
              classification,
              artist,
              image: record.primaryimageurl,
            };
          }
        }
      } catch (err) {
        console.error(err);
        break;
      }
    }

    if (result) {
      setArtwork(result);
      setHistory((prev) => [result, ...prev].slice(0, 10));
    } else {
      alert("No artwork found. Try removing some banned attributes.");
    }

    setLoading(false);
  };

  const toggleBan = (value) => {
    setBanList((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  return (
    <div className="app">

      <aside className="sidebar history-panel">
        <h3>History ({history.length})</h3>

        {history.length === 0 && (
          <p className="empty-text">
            Your discoveries will appear here.
          </p>
        )}

        {history.map((item) => (
          <div
            key={item.id}
            className="history-item"
            onClick={() => setArtwork(item)}
          >
            <img src={item.image} alt={item.title} />
            <p>{item.title}</p>
          </div>
        ))}
      </aside>

      <main className="main-card">

        <h1>🏛️ Veni Vici!</h1>

        <p className="subtitle">
          Discover masterpieces from Harvard's collection.
        </p>

        {artwork && (
          <>
            <h2 className="artwork-title">{artwork.title}</h2>

            <div className="attribute-row">

              <span
                className={`pill ${
                  banList.includes(artwork.artist)
                    ? "pill-banned"
                    : ""
                }`}
                onClick={() => toggleBan(artwork.artist)}
              >
                {artwork.artist}
              </span>

              <span
                className={`pill ${
                  banList.includes(artwork.culture)
                    ? "pill-banned"
                    : ""
                }`}
                onClick={() => toggleBan(artwork.culture)}
              >
                {artwork.culture}
              </span>

              <span
                className={`pill ${
                  banList.includes(artwork.period)
                    ? "pill-banned"
                    : ""
                }`}
                onClick={() => toggleBan(artwork.period)}
              >
                {artwork.period}
              </span>

              <span
                className={`pill ${
                  banList.includes(artwork.classification)
                    ? "pill-banned"
                    : ""
                }`}
                onClick={() =>
                  toggleBan(artwork.classification)
                }
              >
                {artwork.classification}
              </span>

            </div>

            <img
              className="main-image"
              src={artwork.image}
              alt={artwork.title}
            />
          </>
        )}

        <button
          className="discover-btn"
          onClick={getArtwork}
          disabled={loading}
        >
          {loading
            ? "Discovering Masterpiece..."
            : "🎨 Discover"}
        </button>

      </main>

      <aside className="sidebar ban-panel">

        <h3>Ban List</h3>

        <p className="hint-text">
          Click any attribute to ban or unban it.
        </p>

        {banList.length === 0 && (
          <p className="empty-text">
            No banned attributes yet.
          </p>
        )}

        {banList.map((item) => (
          <span
            key={item}
            className="pill pill-banned"
            onClick={() => toggleBan(item)}
          >
            {item}
          </span>
        ))}

      </aside>

    </div>
  );
}

export default App;