import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Card/index";
import Nav from "../Nav/index";
import { Fragment } from "react";
import { useState } from "react";
import Paginado from "../Paginado";
import s from "../../styles/Home.module.css";
import getDog, {
  filterCread,
  orderByName,
  filtradoTemperamento,
  orderByHigherWeight,
  orderByLowerWeight,
} from "../../actions/index";
import SearchBar from "../../SearchBar/index";
import style from "../../styles/Home.module.css";
import { A_Z, Z_A } from "../../Orden/constantes";

export default function Home() {
  const dispatch = useDispatch();
  const dogsSearchResult = useSelector((state) => state.dogs);
  const dogsTotal = useSelector((state) => state.dogs);
  console.log("dogTotal", dogsTotal);
  const allTemperament = useSelector((state) => state.temperamento);

  const [orden, setOrden] = useState(""); //orden
  const [dogsList, setDogsList] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [perrosPorPagina, setPerrosPorPagina] = useState(8);
  const [dogsOrderSelect, setDogsOrderSelect] = useState("sin orden");
  const indeDeLosUltimosP = paginaActual * perrosPorPagina;
  const indeDeLosPrimerosP = indeDeLosUltimosP - perrosPorPagina;

  useEffect(() => {
    const perros = dogsTotal.slice(indeDeLosPrimerosP, indeDeLosUltimosP);
    setDogsList(perros);
  }, [paginaActual, dogsOrderSelect]);

  useEffect(() => {
    if (dogsSearchResult.length > 0) {
      setDogsList(dogsSearchResult);
    }
  }, [dogsSearchResult]);

  const paginado = (paginaNumero) => {
    setPaginaActual(paginaNumero);
  };

  function handleClick(e) {
    e.preventDefault();
    dispatch(getDog());
  }

  function handleFiltradoTemperamento(e) {
    dispatch(filtradoTemperamento(e.target.value));
    setPaginaActual(1);
  }

  function handleFilterCread(e) {
    // setDogsList("cread");
    dispatch(filterCread(e.target.value));
    setDogsList(1);
    console.log(filterCread);
  }

  function handleChange(e) {
    dispatch(orderByName(e.target.value));
    console.log("ordenbynsme", orderByName);
  }

  function handleSelect(e) {
    if (e.target.value === "weightMax") {
      setDogsOrderSelect("weightMax");
      dispatch(orderByHigherWeight(e.target.value));
    }

    if (e.target.value === "weightMin") {
      setDogsOrderSelect("weightMin");
      dispatch(orderByLowerWeight(e.target.value));
    }
  }

  return (
    <div className={s.cover}>
      <h1>Listado de Perros </h1>
      <div>
        <button onClick={(e) => handleClick(e)}>
          Volver a Cargar Todos los perros
        </button>
        <div>
          <select
            onChange={(e) => handleFiltradoTemperamento(e)}
            className={style.select}
          >
            <option value="temp">Temperamento</option>
            {allTemperament.map((temp, id) => (
              <option key={id} value={temp.name}>
                {" "}
                {temp.name}
              </option>
            ))}
          </select>
        </div>
        <div className={s.divSelect}>
          <select onChange={(e) => handleChange(e)} className={style.select}>
            <option defaultValue>Orden Por Raza</option>
            <option value={A_Z}>Order A - Z</option>
            <option value={Z_A}>Order Z - A</option>
          </select>

          <select onChange={(e) => handleSelect(e)} className={style.select}>
            <option value="sin orden">Orden Por Peso</option>
            <option value="weightMax"> Mayor Peso</option>
            <option value="weightMin">Menor peso</option>
          </select>

          <select
            onChange={(e) => handleFilterCread(e)}
            className={style.select}
          >
            <option value="all">Todos</option>
            <option value="cread">Creados</option>
            <option value="api"> Existentes</option>
          </select>
        </div>
      </div>
      <div className={s.dogArea}>
        <Fragment>
          <div className={s.paginado}>
            <Paginado
              perrosPorPagina={perrosPorPagina}
              estadoPerro={dogsSearchResult.length}
              paginado={paginado}
              perros={dogsList}
            />
            <SearchBar />
          </div>
        </Fragment>
      </div>

      <div className={s.card}>
        {dogsList.length > 0 ? (
          dogsList.map((dogui) => (
            <Link key={dogui.id} to={`/Detail/ ${dogui.id}`}>
              <Card
                name={dogui.name}
                temperament={dogui.temperament}
                weight={dogui.weight}
                //  weight={dogui.weight.max}
                image={dogui.image}
                key={dogui.id}
                // life_span={dogui.life_span}
                // height={dogui.height}
              />
            </Link>
          ))
        ) : (
          <h2> No</h2>
        )}
      </div>
      <Nav />
    </div>
  );
}
