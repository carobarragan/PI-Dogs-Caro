import React from "react";
import s from "../../styles/Paginado.module.css";

export default function Paginado({ perrosPorPagina, estadoPerro, paginado }) {
  const numberPage = [];
  for (let i = 0; i <= Math.ceil(estadoPerro / perrosPorPagina); i++) {
    numberPage.push(i + 1);
  }

  return (
    <>
      <nav className={s.nav}>
        <ul className={s.pagina}>
          {numberPage &&
            numberPage.map((numero) => (
              <li className={s.listas} key={numero}>
                <div onClick={() => paginado(numero)}>{numero}</div>
              </li>
            ))}
        </ul>
      </nav>
    </>
  );
}
