import React from 'react';
import Webcam from "react-webcam";
import { FindSimilar } from '../../faceID/FaceApi';

const videoConstraints = {
    width: 1920,
    height: 1080,
    facingMode: "user"
};

const WebcamCapture = () => {
    const webcamRef = React.useRef(null);
    const capture = React.useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            console.log(imageSrc);
            fetch(imageSrc)
            .then(res => res.blob())
            .then(res => FindSimilar(res))
        },
        [webcamRef]
    );
    return (
        <>
        <Webcam
            audio={false}
            height={720}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={1280}
            videoConstraints={videoConstraints}
        />
            <button onClick={capture}>Capture photo</button>
        </>
    );
};

export default WebcamCapture