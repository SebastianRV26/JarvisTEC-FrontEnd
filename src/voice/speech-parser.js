const modelsData = [
  {
    name: "bicicleta",
    endpoint: "models/RLMinR/1/",
    onResponse: (response, speak) => {
      const price = parseFloat(response.data.data).toFixed(2);
      speak({
        text: `La tarifa de un viaje en bicleta con los datos dados es de ${price} dólares`,
      });
      return "$" + price;
    },
  },
  {
    name: "carro",
    endpoint: "models/RLMinR/2/",
    onResponse: (response, speak) => {
      const price = parseFloat(response.data.data).toFixed(2);
      speak({
        text: `El precio de un carro con esos datos es de ${price} dólares`,
      });
      return "$" + price;
    },
  },
  {
    name: "aguacate",
    endpoint: "models/pythonModel/2/",
    onResponse: (response, speak) => {
      const price = parseFloat(response.data.data).toFixed(2);
      speak({
        text: `El precio de un aguacate con esos datos es de ${price}`,
      });
      return "$" + price;
    },
  },
  {
    name: "clima",
    endpoint: "models/RLMinR/3/",
    onResponse: (response, speak) => {
      const temp = parseFloat(response.data.data).toFixed(2);
      speak({
        text: `La temperatura minima según los datos insertados es de ${temp}`,
      });
      return "°C" + temp;
    },
  },
  {
    name: "seguros",
    endpoint: "models/RLMinR/4/",
    onResponse: (response, speak) => {
      const price = parseFloat(response.data.data).toFixed(2);
      speak({
        text: `El precio del seguro de la persona a asegurar según los datos insertados es de ${price}`,
      });
      return "$" + price;
    },
  },
  {
    name: "telefonica",
    endpoint: "models/pythonModel/1/",
    onResponse: (response, speak) => {
      const condicion = parseFloat(response.data.data).toFixed(2);
      if(condicion === 0){
        speak({
          text: `El usuario no se va cambiar de servicio`,
        });
      }else{
        speak({
          text: `El usuario se va cambiar de servicio probablemente`,
        });
      }
      return condicion;
    },
  },
  {
    name: "vino",
    endpoint: "models/pythonModel/3/",
    onResponse: (response, speak) => {
      const calidad = parseFloat(response.data.data).toFixed(2);
      speak({
        text: `La calidad del vino según los datos insertados es de ${calidad}`,
      });
      return calidad;
    },
  },
  {
    name: "inventario",
    endpoint: "models/pythonModel/4/",
    onResponse: (response, speak) => {
      const cantidadInventario = parseFloat(response.data.data).toFixed(2);
      speak({
        text: `La cantidad del inventario de la campañia según los datos insertados es de ${cantidadInventario}`,
      });
      return cantidadInventario;
    },
  },
  {
    name: "acciones",
    endpoint: "models/pythonModel/5/",
    onResponse: (response, speak) => {
      const porcentajeAcciones = parseFloat(response.data.data).toFixed(2);
      console.log(response.data.data);
      speak({
        text: `El precio de las acciones de S&P500stock van a rondar entre ${porcentajeAcciones} del precio original según la cantidad de acciones vendidas`,
      });
      return porcentajeAcciones + "%";
    },
  },
];

export const getActionFromText = (text) => {
  text = text.toLowerCase().trim();
  if (textIncludesAny(text, ["hola", "jarvis"])) {
    return {
      response: "Buenas, ¿En qué puedo ayudar?",
      action: undefined,
    };
  }

  if (textIncludesAny(text, ["predicción", "predecir", "saber", "modelo"])) {
    return getModelFromText(text);
  }

  return {
    response: "No le comprendí, puede volver a repetir",
    action: undefined,
  };
};

const textIncludesAny = (text, list) => {
  for (let e of list) {
    if (text.includes(e)) {
      return true;
    }
  }

  return false;
};

const getModelFromText = (text) => {
  for (let i = 0; i < modelsData.length; i++) {
    if (text.includes(modelsData[i].name)) {
      return {
        response: "Entendido, por favor inserte los datos",
        action: {
          type: "model",
          ...modelsData[i],
        },
      };
    }
  }

  return {
    response: "No tengo ese modelo en mi lista",
    action: undefined,
  };
};
