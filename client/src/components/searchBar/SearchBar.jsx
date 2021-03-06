//______________________________________________________________________________
/*IMPORT DE UTILIDADES*/
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
/*IMPORT DE ACCIONES*/
import { getCountriesByName } from "../../redux/actions/index";
/*IMPORT DE CSS*/
import s from "../estilos/searchBar.module.css";
//______________________________________________________________________________

/*Este componente mostrará la barra de búsqueda en "/home".*/
export default function SearchBar({ setCurrentPage, setOrden }) {
  const dispatch = useDispatch();

  /*Aquí creo un estado local que nos servirá para guardar el nombre del país que se está buscando.*/
  const [name, setName] = useState("");

  /*Esta función es la que modifica el estado a partir del nombre ingresado.*/
  function handlerInputName(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  /*Esta función es la que despacha el nombre del país buscado y resetea el estado local.*/
  function handleSubmit(e) {
    e.preventDefault();
    if (name !== "") {
      dispatch(getCountriesByName(name));
      setName("");
      setCurrentPage(1);
      setOrden(`Ordenado: ${e.target.value}`);
    } else {
      alert("No se puede buscar la Nada!");
    }
  }

  /*Renderización.*/
  return (
    <div className={s.container}>
      <h1 className={s.mapsphere}>M A P S P H E R E</h1>

      <div className={s.utils}>
        <input
          type="search"
          placeholder="Nombre..."
          value={name}
          className={s.searchBar}
          onChange={(e) => handlerInputName(e)}
        ></input>

        <button
          className={s.submit}
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Buscar
        </button>
      </div>

      <Link to="/">
        <button className={s.back}>Volver</button>
      </Link>
    </div>
  );
}
