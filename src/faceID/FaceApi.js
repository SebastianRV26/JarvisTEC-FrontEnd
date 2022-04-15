const msRest = require("@azure/ms-rest-js");
const Face = require("@azure/cognitiveservices-face");

const key = "cff5f2b139d14eba9d00b2d431bef731";
const endpoint = "https://faceapiresourcetec.cognitiveservices.azure.com/";

const credentials = new msRest.ApiKeyCredentials({
  inHeader: { "Ocp-Apim-Subscription-Key": key },
});
const client = new Face.FaceClient(credentials, endpoint);

async function DetectFaceRecognize(url) {
  // Detect faces from image URL. Since only recognizing, use the recognition model 4.
  // We use detection model 3 because we are only retrieving the qualityForRecognition attribute.
  // Result faces with quality for recognition lower than "medium" are filtered out.
  let detected_faces;
  if (typeof url === "string" || url instanceof String) {
    detected_faces = await client.face.detectWithUrl(url, {
      detectionModel: "detection_03",
      recognitionModel: "recognition_04",
      returnFaceAttributes: ["QualityForRecognition"],
    });
  } else {
    detected_faces = await client.face.detectWithStream(url, {
      detectionModel: "detection_03",
      recognitionModel: "recognition_04",
      returnFaceAttributes: ["QualityForRecognition"],
    });
  }
  return detected_faces.filter(
    (face) =>
      face.faceAttributes.qualityForRecognition === "high" ||
      face.faceAttributes.qualityForRecognition === "medium"
  );
}

export async function findSimilar(photo) {
  const source_image_file_name = photo;
  const target_image_file_names = [
    "https://avatars.githubusercontent.com/u/79598781?s=400&u=ed720eb3c18823bcf779e15b641ee98a1b548c9b&v=4",
    "https://avatars.githubusercontent.com/u/49496463?v=4",
  ];

  let target_face_ids = (
    await Promise.all(
      target_image_file_names.map(async function (target_image_file_name) {
        // Detect faces from target image url.
        var faces = await DetectFaceRecognize(target_image_file_name);
        return faces.map(function (face) {
          return face.faceId;
        });
      })
    )
  ).flat();

  // Detect faces from source image url.
  let detected_faces = await DetectFaceRecognize(source_image_file_name);

  if (detected_faces[0]) {
    // Find a similar face(s) in the list of IDs. Comapring only the first in list for testing purposes.
    let results = await client.face.findSimilar(detected_faces[0].faceId, {
      faceIds: target_face_ids,
    });
    // results.forEach (function (result) {
    //     console.log("Faces from: " + source_image_file_name + " and ID: " + result.faceId + " are similar with confidence: " + result.confidence + ".");
    // });
    if (results.length === 0) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
}
