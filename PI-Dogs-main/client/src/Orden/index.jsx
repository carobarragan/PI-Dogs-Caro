import { useDispatch } from "react-redux";
import { orderByName } from "../actions/index";

import { A_Z, Z_A } from "./constantes";

export default function Order() {
  const dispatch = useDispatch();

  function onSelectChange(e) {
    dispatch(orderByName(e.target.value));
  }

  return (
    <div>
      <select onChange={(e) => onSelectChange(e)}>
        <option defaultValue>Orden Por Raza</option>
        <option value={A_Z}>Order A - Z</option>
        <option value={Z_A}>Order Z - A</option>
      </select>
    </div>
  );
}
