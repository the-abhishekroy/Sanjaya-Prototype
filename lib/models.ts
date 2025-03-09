import * as faceapi from 'face-api.js'

export async function loadFaceDetectionModels() {
  const MODEL_URL = '/models'
  
  try {
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL)
    ])
    return true
  } catch (error) {
    console.error('Error loading face detection models:', error)
    return false
  }
}