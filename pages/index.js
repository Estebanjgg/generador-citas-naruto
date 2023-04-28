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

export default function Home() {
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
    { name: "Opening 1", src: "/naruto1.mp3" },
    { name: "Opening 2", src: "/naruto2.mp3" },
    { name: "Opening 3", src: "/naruto3.mp3" },
    // Agrega todas las canciones que desees
  ];

  return (
    
    <div className="container">
      <main>
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

      </main>
      <style jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
  
        main {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
  
        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
          margin-bottom: 1rem;
        }
  
        .carousel-container {
          width: 300px;
          margin-bottom: 1rem;
        }
  
        .imagen {
          width: 100%;
          height: auto;
          border-radius: 50%;
          transition: transform 0.3s ease;
        }
  
        .imagen:hover {
          transform: scale(1.1);
        }
  
        .quote {
          font-size: 1.25rem;
          text-align: center;
          margin-bottom: 1rem;
        }
  
        .btn {
          background-color: #0070f3;
          border: none;
          border-radius: 5px;
          color: white;
          font-size: 1rem;
          padding: 0.5rem 1rem;
          cursor: pointer;
        }

        .song-controls {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

audio {
  display: none;
}

.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: url("/images/background.jpg") no-repeat center center fixed;
  background-size: cover;
}
audio {
  display: none;
}


      `}
      </style>
    </div>
  );
      }  