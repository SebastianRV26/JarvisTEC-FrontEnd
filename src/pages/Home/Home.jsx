import classes from "./Home.module.css";

import useSpeechToText from "react-hook-speech-to-text";
import { useSpeechSynthesis } from "react-speech-kit";
import { useEffect, useState } from "react";
import { getActionFromText } from "../../voice/speech-parser";
import axios from "axios";
import { env } from "../../env/config";
import ModelInput from "../../components/ModelInput/ModelInput";
import ModelOutput from "../../components/ModelOutput/ModelOutput";

const Home = () => {
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
    // No quiero meter mi tarjeta en google cloud pero así se puede hacer
    // funcionar en otros navegadores con una API KEY de google cloud
    /*crossBrowser: true,
    googleApiKey: YOUR_GOOGLE_CLOUD_API_KEY_HERE,*/
  });
  const { speak, speaking } = useSpeechSynthesis();
  const [action, setAction] = useState();
  const [result, setResult] = useState();

  useEffect(() => {
    if (!isRecording) {
      if (results[results.length - 1]) {
        const { response, action } = getActionFromText(
          results[results.length - 1].transcript
        );
        if (response) {
          speak({ text: response });
        }
        if (action) {
          if (action.type === "model") {
            setAction(action);
          }
        } else {
          setAction(undefined);
          setResult(undefined);
        }
      }
    }
  }, [isRecording]);

  const predict = (endpoint, params) => {
    axios
      .get(env.BACKEND_URL + endpoint + params)
      .then(function (response) {
        console.log(response);
        setResult(action.onResponse(response, speak));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleModelTextSubmit = (text) => {
    predict(action.endpoint, text);
  };

  if (error) return <p>Web Speech API is not available in this browser. F</p>;

  return (
    <div>
      <h1>
        Jarvis:{" "}
        {speaking ? "hablando" : isRecording ? "escuchando" : "en espera"}
      </h1>
      <button
        className={`${classes.recButton} ${isRecording ? classes.rec : ""}`}
        onClick={isRecording ? stopSpeechToText : startSpeechToText}
      ></button>
      <ul>
        {interimResult && <li>{interimResult}</li>}
        {results[results.length - 1] && !interimResult && (
          <li>{results[results.length - 1].transcript}</li>
        )}
      </ul>
      {action && <ModelInput onSubmit={handleModelTextSubmit} />}
      {result && <ModelOutput result={result} />}
    </div>
  );
};

export default Home;
