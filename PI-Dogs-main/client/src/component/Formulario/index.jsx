import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postDogs, getTemperament } from "../../actions/index";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/Formulari.module.css";

export default function Formulario() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperamento);
  const history = useHistory();
  const [input, setInput] = useState({
    name: "",
    height: "",
    weight: {},
    life_span: "",
    temperament: [],
    image: "",
  });
  const [error, setError] = useState({});

  useEffect(() => {
    dispatch(getTemperament());
  }, [dispatch]);

  function validate(input) {
    let errors = {};
    if (!input.name) {
      errors.name = "Se requiere un Nombre";
    } else if (!input.height) {
      errors.height = "Se requiere una Altura";
    } else if (!input.weight) {
      errors.weight = "Se requiere un Peso";
    }
    return errors;
  }
  function handleInputChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    console.log(input);
  }

  function handleSelect(e) {
    setInput({
      ...input,
      temperamento: [...input.temperament, e.target.value],
    });
  }
  function handleDelete(e) {
    setInput({
      ...input,
      temperamento: input.temperament.filter((temp) => temp !== e),
    });
  }

  function handleSubmit(e) {
    e.preventDefault(e);
    console.log(input);
    dispatch(postDogs(input));
    alert("Personaje Creado");
    // const dogWeight = {
    //   min: weightSplitted[0],
    //   max: weightSplitted[1],
    //  }
    setInput({
      name: "",
      height: "",
      weight: {},
      life_span: "",
      temperament: [],
      image: "",
    });
    history.push("/Home");
  }
  return (
    <div className={styles.container}>
      <Link to="/Home">
        <button className={styles.okBtn}>Volver</button>
      </Link>
      <h1 className={styles.titulo}>Crea tu perro!</h1>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.grouping}>
        <div className={styles.grouping}>
          <label>Nombre: </label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleInputChange(e)}
          />{" "}
          {error.name && <p>{error.name}</p>}
        </div>

        <div className={styles.grouping}>
          <label>Altura: </label>
          <input
            type="text"
            value={input.height}
            name="height"
            onChange={(e) => handleInputChange(e)}
          />{" "}
          {error.height && <p>{error.height}</p>}
        </div>
        <div className={styles.grouping}>
          <label> Peso: </label>
          <input
            type="text"
            value={input.weight}
            name="weight"
            onChange={(e) => handleInputChange(e)}
          />{" "}
          {error.weight && <p>{error.weight}</p>}
        </div>
        <div className={styles.grouping}>
          <label>Años de vida: </label>
          <input
            type="text"
            value={input.life_span}
            name="life_span"
            onChange={(e) => handleInputChange(e)}
          />{" "}
          {error.life_span && <p>{error.life_span}</p>}
        </div>
        <div className={styles.grouping}>
          <label>imagen: </label>
          <input
            type="text"
            value={input.img}
            name="image"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className={styles.grouping}>
          <select onChange={(e) => handleSelect(e)}>
            <option value="temp"> Temperamentos </option>
            {temperaments.map((el) => (
              <option value={el.name}>{el.name}</option>
            ))}
          </select>
        </div>
        <div>
          <button className={styles.okBtn} type="submit">
            Crear Perro
          </button>
        </div>
      </form>
      {input.temperament.map((el) => (
        <div>
          <p>{el}</p>
          <button className={styles.okBtn} onClick={() => handleDelete(el)}>
            x
          </button>
        </div>
      ))}
    </div>
  );
}
