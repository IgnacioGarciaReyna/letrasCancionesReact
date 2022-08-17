import React, { Fragment, useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import axios from "axios";

function App() {
  //State de la busqueda. Objeto que tiene artista y canción. guardarBusquedaLetra trae el objeto desde el formulario
  const [busquedaletra, guardarBusquedaLetra] = useState({});

  //State para la Letra
  const [letra, guardarLetra] = useState("");

  useEffect(() => {
    //Revisamos que el objeto no esté vacío
    if (Object.keys(busquedaletra).length === 0) return;

    //Consulta a api de letra
    const consultarAPILetra = async () => {
      const { artista, cancion } = busquedaletra;
      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;

      //Axios
      const resultado = await axios.get(url);

      //Pasar letra al state
      guardarLetra(resultado.data.lyrics);
    };
    consultarAPILetra();
  }, [busquedaletra]);

  return (
    <Fragment>
      <Formulario guardarBusquedaLetra={guardarBusquedaLetra} />
    </Fragment>
  );
}

export default App;
