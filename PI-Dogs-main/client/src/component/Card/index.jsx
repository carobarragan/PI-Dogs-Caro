import React from "react";
import s from "../../styles/Card.module.css";

export default function Card({
  name,
  image,
  temperament,
  weight,
  height,
  life_span,
}) {
  // let temperamentString = `${temperament
  //   ?.split(" ,")
  //   .splice(0, 5)
  //   .toString()
  //   .replaceAll(",", ",")}
  //  ${temperament?.split(" ,").length > 5 ? "..." : "_"}`;
  //primer div en div
  return (
    <div className={s.container}>
      <div className={s.dogInfo}>
        <div className={s.name}>
          <h3 className={s.title}>{name}</h3>
        </div>
        <div className={s.temperament}>
          <h4>{temperament}</h4>
        </div>
        {/* <div className={s.life}> <h2>{life_span}</h2> </div> */}
        <h5>{height}</h5>
      </div>
      <p className={s.weight}>
        Peso: Min {weight.min}kg - Max{weight.max}kg
      </p>
      <div className={s.image}>
        <img src={image} alt="imagen del perro" width="200" height="250"></img>
      </div>
    </div>
    // </div>
  );
}
