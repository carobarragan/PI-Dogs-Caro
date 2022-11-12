const { Router, response } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const axios = require("axios");
const router = Router();
const { Dog } = require("../db.js");
const { Temperament } = require("../db.js");
// const { json } = require("body-parser");
//const { where } = require('sequelize');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
let totalDogsList = [];

let getDog = async () => {
  const perros = await axios.get("https://api.thedogapi.com/v1/breeds");
  const dogsList = perros.data.map((elemento) => {
    const weightSplitted = elemento.weight.metric.split(" - ");
    const dogWeight = {
      min: weightSplitted[0],
      max: weightSplitted[1],
    };

    return {
      id: elemento.id,
      name: elemento.name,
      height: elemento.height,
      weight: dogWeight,
      life_span: elemento.life_span,
      createdInDb: false,
      image: elemento.image.url,
      temperament: elemento.temperament,
    };
  });

  totalDogsList = [...dogsList];
  const db = await Dog.findAll({
    include: [{ model: Temperament }],
  });
  return [...dogsList, ...db];
};

//ruta principal
router.get("/dog", async (req, res) => {
  const p = await getDog(req.params);
  res.send(p);
});

//ruta de nombre
router.get("/dog/name", async (req, res) => {
  const raza_perro = req.query.name;
  let dogsSearchResult = totalDogsList.filter((dog) => {
    return dog.name.toLowerCase().includes(raza_perro.toLowerCase());
  });
  if (dogsSearchResult.length > 0) {
    res.status(200).json(dogsSearchResult);
  } else {
    res.status(404).send("No hay perros  con es nombre");
  }
  return raza_perro;
});

//ruta de crear
router.post("/dog/cread", async (req, res) => {
  const { name, height, weight, life_span, image } = req.body;

  if (!name || !height || weight || !life_span || !image) res.status(400).json;

  try {
    const nuevoObjet = { name, height, weight, life_span, image };
    const nuevoDg = await Dog.create(nuevoObjet);
    console.log("nuevodog", nuevoDg);
    const { temperament } = req.body;
    console.log("tem", temperament);
    if (nuevoDg) await nuevoDg.addTemperament(temperament);

    return res.send(
      await Dog.findByPk(nuevoDg.id, { include: [{ model: Temperament }] })
    );
  } catch (error) {
    console.log(error);
  }
});
//--------------------------------------------------------TEMPERAMENTO-------------------------------------------
router.get("/dog/temperaments", async (req, res) => {
  try {
    const db = await Temperament.findAll();
    if (db.length === 0) {
      const temperamentApi = await axios.get(
        "https://api.thedogapi.com/v1/breeds"
      );
      const temperaments = temperamentApi.data
        .map((el) => el.temperament?.split(", "))
        .flat();

      const temperamentosObjetos = temperaments.map((el) => {
        return {
          name: el,
        };
      });

      for (let i = 0; i < temperamentosObjetos.length; i++) {
        if (temperamentosObjetos[i].name) {
          await Temperament.findOrCreate({
            where: temperamentosObjetos[i],
          });
        }
      }
      //  await Temperament.bulkCreate(temperamentosObjetos)
      const AllTemperaments = await Temperament.findAll();
      res.json(AllTemperaments);
    } else {
      res.json(db);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//ruta de id
router.get("/dog/:id", async (req, res) => {
  const id = req.params.id;
  const perrosTotal = await getDog();
  if (id) {
    let razaId = perrosTotal.filter((dogui) => dogui.id == id);
    razaId.length ? res.status(200).json(razaId) : res.status(404);
  }
});

module.exports = router;
