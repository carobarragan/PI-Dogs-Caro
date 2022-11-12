import React from "react";
import { Link, useHistory } from "react-router-dom";
//import './LandingPage.css'
import s from "../../styles/LandingPage.module.css";
import { imagen } from "../LandingPage/imagen";

export default function LandingPage() {
  // const history = useHistory();
  return (
    <div className={s.fullScreen}>
      <div>
        <h1 className={s.welcome}> Welcome to Henry Dogs</h1>
        {/* <h1 className={s.title}> PI DOGS</h1> */}
        {/* <p className={s.element}>
        {" "}
        Bienvenido a la app de adoptar mascotas. Existen mil y una razones para
        adoptar una mascota. La principal es que estamos haciendo dos cosas
        buenas al mismo tiempo, ya que, además de proporcionar compañía a unas
        personas, estamos evitando un posible mal final para ese animalito.
      </p>
      <br></br> */}
        <Link to="/home">
          <button className={s.enterBtn}>Enter</button>
        </Link>

        <div className={s.aboutMe}>
          <span className={s.spanAm}>Developer By</span>
          <span className={s.spanAm}>Carolina Magali Barragàn</span>
          <div className={s.iconsContainer}></div>
          <a
            href="https://www.linkedin.com/in/carolina-barragan-4a5022247/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://th.bing.com/th/id/OIP.6uTQ7mOjYOD2sNKxUdnaNAHaHa?pid=ImgDet&rs=1"
              alt="Linkedln"
              className={s.logo}
            ></img>
          </a>
          <a href="https://github.com/carobarragan" target="_black">
            <img
              src="https://play-lh.googleusercontent.com/PCpXdqvUWfCW1mXhH1Y_98yBpgsWxuTSTofy3NGMo9yBTATDyzVkqU580bfSln50bFU"
              alt="GitHub Link"
              className={s.logo}
            />
          </a>
        </div>
      </div>
    </div>
  );
}
