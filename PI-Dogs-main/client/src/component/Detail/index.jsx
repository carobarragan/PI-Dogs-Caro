import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clean, getDetail } from "../../actions";
import s from "../../styles/Detail.module.css";

export default function Detail(props) {
  console.log("props!", props);
  const dispatch = useDispatch();
  const breedId = useSelector((state) => {
    console.log("state", state);
    return state.detalle;
  });

  // console.log("detalle perro", breedId);

  useEffect(() => {
    console.log("detalle perro", breedId);
  }, [breedId]);

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
    dispatch(clean());
    console.log("detalle", getDetail);
  }, [dispatch, props.match.params.id]);

  return (
    <div className={s.contDetail}>
      <div className={s.nav}>
        <Link to="/home">
          <button className={s.buttonLink}>Home</button>
        </Link>
        <Link to="/cread">
          <button className={s.buttonLink}>Create Breed</button>
        </Link>
      </div>
      {breedId.length === 0 ? (
        <div className={s.loading}>
          <img src="img" alt="loading" />{" "}
        </div>
      ) : (
        <div className={s.detalle}>
          <div key={breedId.id}>
            <img src={breedId[0].image} alt="img" className={s.img} />
            <h3>Name: {breedId[0].name}</h3>
            <h4>Peso Maximo: {breedId[0].weight.max} kg</h4>
            <h4>Peso Minimo: {breedId[0].weight.min} kg</h4>
            {/* <h4>Altura Imperial: {breedId[0].height.imperial}</h4> */}
            <h4>Altura Metrica: {breedId[0].height.metric} cm</h4>
            <h4>Esperanza de vida: {breedId[0].life_span}</h4>
            <div>
              <h4>Temperaments:</h4>
              <p>{breedId[0].temperament}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
