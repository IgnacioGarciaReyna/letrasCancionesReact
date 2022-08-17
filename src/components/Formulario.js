import React, { useState } from "react";

const Formulario = ({guardarBusquedaLetra}) => {
  //State para hacer la busqueda
  //Se busca que los nombres de las propiedades del objeto sean iguales a los names de los form
  const [busqueda, guardarBusqueda] = useState({
    artista: "",
    cancion: "",
  });

  //State del Error
  const [error, guardarError] = useState(false);

  //Destructuring para los value de cada input
  const { artista, cancion } = busqueda;

  //Función para leer el contenido de los input
  //e.target.name es lo que tenemos en la propiedad name del input
  //e.target.value es lo que ingresa el usuario al input
  const actualizarState = (e) => {
    guardarBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value,
    });
  };

  //Consultar las apis
  const buscarInformacion = (e) => {
    e.preventDefault();

    if (artista.trim() === "" || cancion.trim() === "") {
      guardarError(true);
      return;
    }

    guardarError(false);

    //Pasar al componente principal
    guardarBusquedaLetra(busqueda);
  };

  return (
    <div className="bg-info">
      {error ? (
        <p className="alert alert-danger text-center p-2">
          Todos los campos son obligatorios
        </p>
      ) : null}
      <div className="container">
        <div className="row">
          <form
            onSubmit={buscarInformacion}
            className="col card text-white bg-transparent mb-5 pt-5 pb-2"
          >
            <fieldset>
              <legend className="text-center">Buscador Letras Canciones</legend>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Artista</label>
                    <input
                      type="text"
                      className="form-control"
                      name="artista"
                      placeholder="Nombre del artista"
                      onChange={actualizarState}
                      value={artista}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Canción</label>
                    <input
                      type="text"
                      className="form-control"
                      name="cancion"
                      placeholder="Nombre de la canción"
                      onChange={actualizarState}
                      value={cancion}
                    />
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary float-right">
                Buscar
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Formulario;
