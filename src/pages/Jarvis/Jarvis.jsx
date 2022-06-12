import classes from "./Jarvis.module.css";
import { useSpeechSynthesis } from "react-speech-kit";
import { useEffect, useState } from "react";
import { getActionFromText } from "../../voice/speech-parser";
import axios from "axios";
import { env } from "../../env/config";
import ModelInput from "../../components/ModelInput/ModelInput";
import ModelOutput from "../../components/ModelOutput/ModelOutput";
import AudioAnimation from "../../components/AudioAnimation/AudioAnimation";
import Card from "../../components/Card/Card";
import fixWebmDuration from "fix-webm-duration";
import { useReactMediaRecorder } from "react-media-recorder";

const isRecording = (status) => {
  return status === "recording";
};

const Jarvis = () => {
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ audio: true , blobPropertyBag: {type: "audio/wav"} });
  const { speak, speaking } = useSpeechSynthesis();
  const [action, setAction] = useState();
  const [result, setResult] = useState();
  const [speechText, setSpeechText] = useState("");

  useEffect(() => {
    if (mediaBlobUrl) {
      fetch(mediaBlobUrl)
        .then((res) => res.blob())
        .then((res) => {
          return fixWebmDuration(res, 2000, {logger: false})
        })
        .then((res)=> {
          const formData = new FormData();
          formData.append("data", res);
          return axios.post(env.BACKEND_URL + "models/voice/", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        })
        .then((res) => {
          setSpeechText(res.data.data);
          const { response, action } = getActionFromText(res.data.data);
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
        });
    }
  }, [mediaBlobUrl]);

  const predict = (endpoint, params) => {
    axios.get(env.BACKEND_URL + endpoint + params).then(function (response) {
      if (response.data.code === 400) {
        speak({
          text: `${response.data.data}`,
        });
        return;
      }
      setResult(action.onResponse(response, speak));
    });
  };

  const handleModelTextSubmit = (text) => {
    predict(action.endpoint, text);
  };

  return (
    <Card>
      <h1 className={classes.statusText}>
        Jarvis:{" "}
        {speaking ? "speaking" : isRecording(status) ? "hearing" : "on hold"}
      </h1>
      <AudioAnimation />
      <button
        className={`${classes.recButton} ${
          isRecording(status) ? classes.rec : ""
        }`}
        onClick={isRecording(status) ? stopRecording : startRecording}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="currentColor"
          className="bi bi-mic"
          viewBox="0 0 16 16"
        >
          <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />
          <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0v5zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3z" />
        </svg>
      </button>
      <div>
        <h2 className={classes.voiceText}>Text: {speechText}</h2>
      </div>
      {action && (
        <ModelInput onSubmit={handleModelTextSubmit} columns={action.columns} />
      )}
      {result && <ModelOutput result={result} />}
    </Card>
  );
};

export default Jarvis;
