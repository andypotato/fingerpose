import FingerPoseEstimator from './FingerPoseEstimator';

export default class GestureEstimator {

  constructor(knownGestures, estimatorOptions = {}) {

    this.estimator = new FingerPoseEstimator(estimatorOptions);

    // list of predefined gestures
    this.gestures = knownGestures;
  }

  estimate(landmarks, minConfidence) {

    let gesturesFound = [];

    // step 1: get estimations of curl / direction for each finger
    const est = this.estimator.estimate(landmarks);

    // step 2: compare gesture description to each known gesture
    for(let gesture of this.gestures) {

      let confidence = gesture.matchAgainst(est.curls, est.directions);
      if(confidence >= minConfidence) {
        gesturesFound.push({
          name: gesture.name,
          confidence: confidence
        });
      }
    }

    return gesturesFound;
  }
}