import React, { Fragment, useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import axios from "axios";
import Cancion from "./components/Cancion";
import Info from "./components/Info";

function App() {
  //State de la busqueda. Objeto que tiene artista y canción. guardarBusquedaLetra trae el objeto desde el formulario
  const [busquedaletra, guardarBusquedaLetra] = useState({});

  //State para la Letra
  const [letra, guardarLetra] = useState("");

  //State para la información
  const [info, guardarInfo] = useState({});

  useEffect(() => {
    //Revisamos que el objeto no esté vacío
    if (Object.keys(busquedaletra).length === 0) return;

    //Consulta a api de letra
    const consultarAPILetra = async () => {
      const { artista, cancion } = busquedaletra;
      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
      const url2 = `https://theaudiodb.com/api/v1/json/2/search.php?s=${artista}`;

      //Hacer las dos consultas a las APIs a la vez. Cada una terminará cuando termine de descargar todos sus datos
      const [letra, informacion] = await Promise.all([
        axios.get(url),
        axios.get(url2),
      ]);

      //Axios que haría una ejecución poco eficiente. Detenes la ejecución de una consulta hasta que la otra esté lista
      // const resultado = await axios.get(url);
      // const resultado2 = await axios.get(url2);

      guardarLetra(letra.data.lyrics);
      guardarInfo(informacion.data.artists[0]);

      //Pasar letra al state
      // guardarLetra(resultado.data.lyrics);
    };
    consultarAPILetra();
  }, [busquedaletra, info]);

  return (
    <Fragment>
      <Formulario guardarBusquedaLetra={guardarBusquedaLetra} />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <Info info={info} />
          </div>
          <div className="col-md-6">
            <Cancion letra={letra} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
