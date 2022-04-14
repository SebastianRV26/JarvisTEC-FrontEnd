const modelsData = [
  {
    name: "aguacate",
    endpoint: "models/pythonModel/2/",
    onResponse: (response, speak) => {
      const price = parseFloat(response.data.data).toFixed(2);
      speak({
        text: `El precio de un aguacate con esos datos es de ${price}`,
      });
      return price;
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
