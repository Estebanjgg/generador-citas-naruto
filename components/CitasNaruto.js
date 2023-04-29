import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const obtenerCitasNaruto = async () => {
  const response = await fetch(
    "https://gist.githubusercontent.com/Estebanjgg/2bd6cafe77ce40c9f11086b7e0f5ceec/raw/8d583fb076fa3aff8e29def0bb3d23c6e2f98390/citas_naruto.json"
  );
  const data = await response.json();
  console.log(data);
  return data.citasNaruto;
};

const obtenerImagenes = async () => {
  const response = await fetch(
    "https://gist.githubusercontent.com/Estebanjgg/9a01736b6b5cb96cca509ca7f1ee84d2/raw/03bcef7995e542387c2f659a2a93a3e352344a15/imagenes.json"
  );
  const data = await response.json();
  console.log(data);
  return data.imagenes;
};

export default function CitasNaruto() {
  const [citasNaruto, setCitasNaruto] = useState(null);
  const [imagenes, setImagenes] = useState([]);
  const [cita, setCita] = useState("");
  const [imagenActual, setImagenActual] = useState(0);
  const [currentSong, setCurrentSong] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await obtenerCitasNaruto();
      setCitasNaruto(data);
      setCita(obtenerCitaAleatoria(data));
    };
    fetchData();

    const fetchImagenes = async () => {
      const data = await obtenerImagenes();
      setImagenes(data);
    };
    fetchImagenes();
  }, []);

  const obtenerCitaAleatoria = (citasNaruto) => {
    const personaje =
      citasNaruto[Math.floor(Math.random() * citasNaruto.length)];
    const cita =
      personaje.citas[Math.floor(Math.random() * personaje.citas.length)];
    return `${personaje.personaje}: "${cita}"`;
  };

  const actualizarCitaEImagen = () => {
    if (citasNaruto && imagenes) {
      setCita(obtenerCitaAleatoria(citasNaruto));
      setImagenActual((imagenActual + 1) % imagenes.length);
    }
  };

  const songs = [
    { name: "Opening 1", src: "https://estebanjgg.github.io/generador-citas-naruto/naruto1.mp3" },
    { name: "Opening 2", src: "https://estebanjgg.github.io/generador-citas-naruto/naruto2.mp3" },
    { name: "Opening 3", src: "https://estebanjgg.github.io/generador-citas-naruto/naruto3.mp3" },
    // Agrega todas las canciones que desees
  ];

  return (
    <div className="container">
      <h1 className="title">Generador de Citas de Naruto</h1>
      <div className="carousel-container">
        <Carousel
          selectedItem={imagenActual}
          showThumbs={false}
          showStatus={false}
          showIndicators={false}
          infiniteLoop
          useKeyboardArrows
        >
          {imagenes.map((imagen, index) => (
            <div key={index}>
              <img src={imagen.url} alt={imagen.alt} className="imagen" />
            </div>
          ))}
        </Carousel>
      </div>
      <p className="quote">{cita}</p>
      <button className="btn" onClick={actualizarCitaEImagen}>
        Generar nueva cita e imagen
      </button>
      <audio
        src={songs[currentSong].src}
        autoPlay
        onEnded={() => setCurrentSong((currentSong + 1) % songs.length)}
      />
      <div className="song-controls">
        <button onClick={() => setCurrentSong((currentSong - 1 + songs.length) % songs.length)}>Anterior</button>
        <button onClick={() => document.querySelector("audio").pause()}>Pausar</button>
        <button onClick={() => document.querySelector("audio").play()}>Reproducir</button>
        <button onClick={() => setCurrentSong((currentSong + 1) % songs.length)}>Siguiente</button>
      </div>
    </div>
  );
}
