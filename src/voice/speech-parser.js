const modelsData = [
  {
    name: "bicicleta",
    endpoint: "models/RLMinR/1/",
    columns: ["distance", "driver", "tip"],
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
    columns: ["selling_price", "year"],
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
    columns: [
      "Total Volume",
      "4046",
      "4225",
      "4770",
      "Total Bags",
      "Small Bags",
      "Large Bags",
      "XLarge Bags",
      "type",
      "year",
    ],
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
    columns: ["maxTemp", "Temp9am"],
    onResponse: (response, speak) => {
      const temp = parseFloat(response.data.data).toFixed(2);
      speak({
        text: `La temperatura minima según los datos insertados es de ${temp}`,
      });
      return temp + "°C";
    },
  },
  {
    name: "seguros",
    endpoint: "models/RLMinR/4/",
    columns: ["bmi"],
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
    colums: ["tenure", "MonthlyCharges", "TotalCharges", "TechSupport"],
    onResponse: (response, speak) => {
      const condicion = parseFloat(response.data.data).toFixed(2);
      if (condicion === 0) {
        speak({
          text: `El usuario no se va cambiar de servicio`,
        });
      } else {
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
    columns: [
      "fixed acidity",
      "volatile acidity",
      "citric acid",
      "residual sugar",
      "chlorides",
      "free sulfur dioxide",
      "total sulfur dioxide",
      "density",
      "pH",
      "sulphates",
      "alcohol",
      "white",
    ],
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
    columns: [
      "store",
      "item",
      "year",
      "month",
      "day",
      "week",
      "weekofyear",
      "dayofweek",
      "weekday",
      "dayofyear",
      "quarter",
    ],
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
    columns: ["Numbers"],
    onResponse: (response, speak) => {
      const porcentajeAcciones = parseFloat(response.data.data).toFixed(2);
      console.log(response.data.data);
      speak({
        text: `El precio de las acciones de S&P500stock van a rondar entre ${porcentajeAcciones} del precio original según la cantidad de acciones vendidas`,
      });
      return porcentajeAcciones + "%";
    },
  },
  {
    name: "hepatitis",
    endpoint: "models/pythonModel/8/",
    columns: [
      "Sex",
      "Age",
      "ALB",
      "ALP",
      "ALT",
      "AST",
      "BIL",
      "CHE",
      "CHOL",
      "CREA",
      "GGT",
      "PROT",
    ],
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
    name: "masa",
    endpoint: "models/pythonModel/7/",
    columns: ["Density", "Chest", "Abdomen"],
    onResponse: (response, speak) => {
      const bmi = parseFloat(response.data.data).toFixed(2);
      speak({
        text: `El índice de masa corporal de ese paciente es de: ${bmi}`,
      });
      return bmi;
    },
  },
  {
    name: "derrame",
    endpoint: "models/pythonModel/9/",
    columns: [
      "gender",
      "age",
      "hypertension",
      "heart_disease",
      "ever_married",
      "work_type",
      "Residence_type",
      "avg_glucose_level",
      "bmi",
      "smoking_status",
    ],
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
