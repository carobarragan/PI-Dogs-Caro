import { A_Z, Z_A } from "../Orden/constantes";

const initialState = {
  dogs: [],
  allDogs: [],
  temperamento: [],
  temperaments: [],
  filtrado: [],
  detalle: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_DOG":
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
      };

    case "ORDER_BY_NAME":
      let orderAz = [...state.dogs];
      console.log("ORDEN", orderAz);
      orderAz = orderAz.sort((a, b) => {
        switch (action.payload) {
          case A_Z:
            if (a.name < b.name) {
              return -1;
            } else return 1;
          case Z_A:
            if (a.name > b.name) {
              return -1;
            } else return 1;

          default:
            return 0;
        }
      });
      console.log("ghd", orderAz);
      return {
        ...state,
        dogs: orderAz,
      };
    case "ORDER_BY_LOWER_WEIGHT":
      const lower = state.dogs;
      const dogsOrden = state.dogs.sort((a, b) => a.weight.min - b.weight.min);
      return {
        ...state,
        dogs: action.payload === "weightMin" ? lower : dogsOrden,
      };

    case "ORDER_BY_HIGHER_WEIGHT":
      const order = state.dogs;
      const dogsSorted = state.dogs.sort((a, b) => b.weight.max - a.weight.max);
      return {
        ...state,
        dogs: action.payload === "weightMax" ? order : dogsSorted,
      };

    case "FILTER_CREAD":
      const perrosFiltrados = state.allDogs;
      console.log(perrosFiltrados);
      const creadosFiltrados =
        action.payload === "cread"
          ? perrosFiltrados.filter((el) => el.createdInDb)
          : perrosFiltrados.filter((el) => !el.createdInDb);
      // createdInDb
      return {
        ...state,
        dogs: action.payload === "all" ? perrosFiltrados : creadosFiltrados,
      };

    case "GET_RAZA":
      return {
        ...state,
        dogs: action.payload,
      };

    case "GET_TEMPERAMENT":
      return {
        ...state,
        temperamento: action.payload,
      };

    case "FILTRADO_TEMPERAMENTO":
      let estado = state.dogs;
      let temperamentFiltro =
        action.payload === "temp"
          ? estado
          : estado.filter((el) => el.temperament?.includes(action.payload));
      return {
        ...state,
        dogs: temperamentFiltro,
      };

    case "POST_DOGS":
      return {
        ...state,
        dogs: action.payload,
      };

    case "GET_DETAIL":
      return {
        ...state,
        detalle: action.payload,
      };

    case "CLEAN":
      return {
        ...state,
        detalle: [],
      };

    default:
      return state;
  }
}
export default rootReducer;
