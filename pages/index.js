import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";


const obtenerCitasNaruto = async () => {
  const response = await fetch(
    "https://gist.githubusercontent.com/Estebanjgg/2bd6cafe77ce40c9f11086b7e0f5ceec/raw/80e484e69d870e097b7fb3d98ceb74d151cfa068/citas_naruto.json"
  );
  const data = await response.json();
  console.log(data);
  return data.citasNaruto;
};

const obtenerImagenes = async () => {
  const response = await fetch(
    "https://gist.githubusercontent.com/Estebanjgg/9a01736b6b5cb96cca509ca7f1ee84d2/raw/ba4f476eacfd8de47ef939cb19843f5e6cbea4c8/imagenes.json"
  );
  const data = await response.json();
  console.log(data);
  return data.imagenes;
};

export default function Home() {
  const [citasNaruto, setCitasNaruto] = useState(null);
  const [imagenData, setImagenData] = useState([]);
  const [cita, setCita] = useState("");
  const [imagen, setImagen] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await obtenerCitasNaruto();
      setCitasNaruto(data);
      setCita(obtenerCitaAleatoria(data));
    };
    fetchData();

    const fetchImagenes = async () => {
      const data = await obtenerImagenes();
      setImagenData(data);
      setImagen(obtenerImagenAleatoria(data));
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

  const obtenerImagenAleatoria = (imagenData) => {
    const imagen = imagenData[Math.floor(Math.random() * imagenData.length)];
    return imagen.url;
  };

  const actualizarCita = () => {
    if (citasNaruto) {
      setCita(obtenerCitaAleatoria(citasNaruto));
    }
  };

  const actualizarImagenYcita = () => {
    if (citasNaruto && imagenData) {
      setCita(obtenerCitaAleatoria(citasNaruto));
      setImagen(obtenerImagenAleatoria(imagenData));
    }
  };

  return (
    <div className="container">
      <main>
        <h1 className="title">Generador de Citas de Naruto</h1>
        <div className="carousel-container">
          <Carousel
            showThumbs={false}
            showStatus={false}
            showIndicators={false}
            infiniteLoop
            useKeyboardArrows
          >
            {imagenData.map((imagen, index) => (
              <div key={index}>
                <img src={imagen.url} alt={imagen.alt} className="imagen" />
              </div>
            ))}
          </Carousel>
        </div>
        <p className="quote">{cita}</p>
        <button className="btn" onClick={actualizarImagenYcita}>
  Generar nueva cita e imagen
</button>
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
      `}</style>
    </div>
  );
      }  