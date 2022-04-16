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
    name: "masa",
    endpoint: "models/pythonModel/4/",
    onResponse: (response, speak) => {
      const bmi = parseFloat(response.data.data).toFixed(2);
      speak({
        text: `El índice de masa corporal de ese paciente es de: ${bmi}`,
      });
      return bmi;
    },
  },
  {
    name: "hepatitis",
    endpoint: "models/pythonModel/5/",
    onResponse: (response, speak) => {
      const hepatitis = parseInt(response.data.data);
      let hepatitisName;
      if (hepatitis === 1) {
        hepatitisName = "Hepatitis";
      } else if (hepatitis === 2) {
        hepatitisName = "Fibrosis";
      } else {
        hepatitisName = "Cirrosis";
      }
      speak({
        text: `El tipo de hepatitis de ese paciente es: ${hepatitisName}`,
      });
      return hepatitisName;
    },
  },
  {
    name: "derrame",
    endpoint: "models/pythonModel/6/",
    onResponse: (response, speak) => {
      const value = parseInt(response.data.data);
      if (value === 0) {
        speak({
          text: `El paciente no tuvo un derrame cerebral`,
        });
        return "No tuvo derrame";
      }
      speak({
        text: `El paciente tuvo un derrame cerebral`,
      });
      return "Tuvo derrame";
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
