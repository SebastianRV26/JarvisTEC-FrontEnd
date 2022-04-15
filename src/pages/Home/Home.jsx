import classes from "./Home.module.css";

import useSpeechToText from "react-hook-speech-to-text";
import { useSpeechSynthesis } from "react-speech-kit";
import { useEffect, useState } from "react";
import { getActionFromText } from "../../voice/speech-parser";
import axios from "axios";
import { env } from "../../env/config";
import ModelInput from "../../components/ModelInput/ModelInput";
import ModelOutput from "../../components/ModelOutput/ModelOutput";
import AudioAnimation from "../../components/AudioAnimation/AudioAnimation";

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
    <div className={classes.container}>
      <div className={classes.jarvisContainer}>
        <h1 className={classes.statusText}>
          Jarvis: {speaking ? "speaking" : isRecording ? "hearing" : "on hold"}
        </h1>
        <AudioAnimation />
        <button
          className={`${classes.recButton} ${isRecording ? classes.rec : ""}`}
          onClick={isRecording ? stopSpeechToText : startSpeechToText}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            class="bi bi-mic"
            viewBox="0 0 16 16"
          >
            <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />
            <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0v5zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3z" />
          </svg>
        </button>
        <div>
          <h2 className={classes.voiceText}>
            Text: {interimResult && <>{interimResult}</>}
            {results[results.length - 1] && !interimResult && (
              <>{results[results.length - 1].transcript}</>
            )}
          </h2>
        </div>
        {action && <ModelInput onSubmit={handleModelTextSubmit} />}
        {result && <ModelOutput result={result} />}
      </div>
    </div>
  );
};

export default Home;
