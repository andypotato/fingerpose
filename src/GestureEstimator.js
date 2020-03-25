export default class GestureEstimator {

  constructor(knownGestures) {

    // list of predefined gestures
    this.gestures = knownGestures;
  }

  estimate(detectedCurls, detectedDirections, minConfidence) {

    let gesturesFound = [];

    for(let gesture of this.gestures) {

      let confidence = gesture.matchAgainst(detectedCurls, detectedDirections);
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