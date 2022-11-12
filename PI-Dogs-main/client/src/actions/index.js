import axios from "axios";

export default function getDog() {
  return async function (dispatch) {
    var json = await axios("http://localhost:3001/dog", {});
    return dispatch({
      type: "GET_DOG",
      payload: json.data,
    });
  };
}

// export function getDogsList(page, limit) {
//   return async function () {
//     var json = await axios(
//       `http://localhost:3001/dogs/list?page=${page}&limit=${limit}`
//     );
//     return json.data;
//   };
// }

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

export function orderByHigherWeight(payload) {
  return {
    type: "ORDER_BY_HIGHER_WEIGHT",
    payload,
  };
}
export function orderByLowerWeight(payload) {
  return {
    type: "ORDER_BY_LOWER_WEIGHT",
    payload,
  };
}

export function getRaza(name) {
  return async function (dispatch) {
    var json = await axios("http://localhost:3001/dog/name?name=" + name);
    console.log("json", json);
    return dispatch({
      type: "GET_RAZA",
      payload: json.data,
    });
  };
}

export function getTemperament() {
  return async function (dispatch) {
    var json = await axios("http://localhost:3001/dog/temperaments");
    return dispatch({
      type: "GET_TEMPERAMENT",
      payload: json.data,
    });
  };
}

export function filtradoTemperamento(payload) {
  return {
    type: "FILTRADO_TEMPERAMENTO",
    payload,
  };
}

export function postDogs(payload) {
  console.log("post", postDogs);
  return async function (dispatch) {
    const json = await axios.post("http://localhost:3001/dog/cread", payload);
    console.log("json", json);
    // return json;
    return dispatch({
      type: "POST_DOGS",
      payload: json.data,
    });
  };
}
export function filterCread(payload) {
  return {
    type: "FILTER_CREAD",
    payload,
  };
}

export function getDetail(id) {
  console.log(id);
  return async function (dispatch) {
    try {
      var json = await axios.get(`http://localhost:3001/dog/` + id);
      return dispatch({
        type: "GET_DETAIL",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const clean = () => {
  return { type: "CLEAN" };
};
