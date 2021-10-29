import FingerPoseEstimator from './FingerPoseEstimator';
import { Finger, FingerCurl, FingerDirection } from './FingerDescription';

export default class GestureEstimator {

  constructor(knownGestures, estimatorOptions = {}) {

    this.estimator = new FingerPoseEstimator(estimatorOptions);

    // list of predefined gestures
    this.gestures = knownGestures;
  }

  estimate(landmarks, minScore) {

    let gesturesFound = [];

    // step 1: get estimations of curl / direction for each finger
    const est = this.estimator.estimate(landmarks);

    let poseData = [];
    for(let fingerIdx of Finger.all) {
      poseData.push([
        Finger.getName(fingerIdx),
        FingerCurl.getName(est.curls[fingerIdx]),
        FingerDirection.getName(est.directions[fingerIdx])
      ]);
    }

    // step 2: compare gesture description to each known gesture
    for(let gesture of this.gestures) {
      let score = gesture.matchAgainst(est.curls, est.directions);
      if(score >= minScore) {
        gesturesFound.push({
          name: gesture.name,
          score: score
        });
      }
    }

    return {
      poseData: poseData,
      gestures: gesturesFound
    };
  }
}