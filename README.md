
# fingerpose

Finger pose classifier for hand landmarks detected by TensorFlow.js' [handpose](https://github.com/tensorflow/tfjs-models/tree/master/handpose) model. It can detect hand gestures like "Victory" ✌️or "Thumbs Up" 👍inside a webcam source picture. You can define additional hand gestures using [gesture descriptions](https://github.com/andypotato/fingerpose/tree/master/src/gestures). 

!["Thumbs up" and "Victory" gestures detected](https://raw.githubusercontent.com/andypotato/fingerpose/master/assets/fingers-lq.gif)

## How it works

Gesture detection works in three steps:

 1. Detect the hand landmarks inside the video picture
 2. Estimating the direction and curl of each individual finger
 3. Comparing the result to a set of gesture descriptions

Step (1) is performed by TensorFlow's "handpose", Step (2) and (3) are handled by this library.

## Installation

Install the module via NPM:
```
npm i --save fingerpose
```
## Usage
A [fully working example](https://github.com/andypotato/fingerpose/blob/master/dist/index.html) can be found inside the `dist` folder. The basic steps are outlined below:

#### Include "handpose" and this library
```
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-core"></script>
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-converter"></script>
<script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/handpose"></script>
<script src="fingerpose.js" type="text/javascript"></script>
```
#### Configure the gesture recognizer with known gestures
```
// add "✌🏻" and "👍" as sample gestures
const GE = new fp.GestureEstimator([
    fp.Gestures.VictoryGesture,
    fp.Gestures.ThumbsUpGesture
]);
```

#### Use "handpose" to estimate the landmarks
```
const  model  =  await  handpose.load();
const  predictions  =  await  model.estimateHands(video,  true);
```

#### Estimate the gestures
```
// using a minimum confidence of 7.5 (out of 10)
const  estimatedGestures  =  GE.estimate(predictions.landmarks,  7.5);
```
The result is an array of possible gestures and their confidence, for example:
```
[
    { name: 'thumbs_up', confidence: 9.25 },
    ...
]
```

## Credits

The hand gesture recognition module is based on the amazing work by [Prasad Pai](https://github.com/Prasad9/Classify-HandGesturePose). This module is more or less a straight JavaScript port of his [FingerPoseEstimate](https://github.com/Prasad9/Classify-HandGesturePose/blob/master/pose/utils/FingerPoseEstimate.py) Python module.
