import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRaza } from "../actions";
import s from "../styles/SearchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    if (!search) return alert("Se requiere un nombre");
    dispatch(getRaza(search));
    console.log("");
    setSearch("");
  }

  function onInputChange(e) {
    e.preventDefault();
    setSearch(e.target.value);
  }

  return (
    <div className={s.contenedor}>
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          type=" text"
          placeholder="Buscando perro"
          onChange={(e) => onInputChange(e)}
          value={search}
          className={s.input}
        />
        <button className={s.boton} type=" submit">
          {" "}
          Buscador
        </button>
      </form>
    </div>
  );
}
