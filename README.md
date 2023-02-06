# Fingerpose

Finger gesture classifier for multiple hand landmarks detected by [MediaPipe Handpose Detection](https://github.com/tensorflow/tfjs-models/tree/master/hand-pose-detection). It detects gestures like "Victory" ✌️ or "Thumbs Up" 👍  from both individual hands inside a source image or video stream. You can define additional hand gestures using simple [gesture descriptions](./src/gestures). 

!["Thumbs up" and "Victory" gestures detected](./assets/finger-lq1.gif)

# Table of contents

- [How it works](#how-it-works)
- [Installation](#installation)
- [Demo](#demo)
- [Quick start](#quickstart)
- [Define your own gestures](#define-your-own-gestures)
- [Tips to improve detection](#tips-to-improve-detection)
- [Known issues and limitations](#known-issues-and-limitations)
- [Credits](#credits)

## How it works

Gesture detection works in three steps:

 1. Detect the hands' landmarks inside the video picture
 2. Estimating the direction and curl of each individual finger
 3. Comparing the result to a set of gesture descriptions

Step (1) is performed by MediaPipe Handpose, and Steps (2) and (3) are handled by this library.

## Demo

### Basic example

A [basic working example](./dist/index.html) can be found inside the [dist](./dist/) folder. This example also includes debugging output which can be useful when you are creating your own gestures.

[Click here to open the live example](https://erickwendel.github.io/fingerpose/dist/)

### Rock, Paper, Scissors game

A simple [Rock, Scissors, Paper game](https://github.com/andypotato/rock-paper-scissors) that shows how to integrate this library into a real-world project.

## Quick start

### Include MediaPipe Handpose and its prerequisites (TFJS >= 2.1.0)
```
<!-- this example uses TFJS 3.7.0 - older versions back to 2.1.0 are supported -->
<script src="https://unpkg.com/@tensorflow/tfjs-core@3.7.0/dist/tf-core.js"></script>

<!-- You must explicitly require a TF.js backend if you're not using the tfs union bundle. -->
<script src="https://unpkg.com/@tensorflow/tfjs-backend-webgl@3.7.0/dist/tf-backend-webgl.js"></script>

<!-- The main handpose dependencies -->
<script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/hand-pose-detection@2.0.0/dist/hand-pose-detection.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1646424915/hands.min.js"></script>

```

### Include this library
```
<script src="https://cdn.jsdelivr.net/npm/fingerpose@0.1.0/dist/fingerpose.min.js" type="text/javascript"></script>
```
#### Alternatives
You can copy the whole file from [fingerpose.js](./dist/fingerpose.js) or install from NPM with

```
npm install fingerpose
```

### Add the gestures you want do detect
```
// add "✌🏻" and "👍" as sample gestures
const GE = new fp.GestureEstimator([
    fp.Gestures.VictoryGesture,
    fp.Gestures.ThumbsUpGesture
]);
```

### Use Handpose to estimate the landmarks
```
const model = await handpose.load();
const predictions = await model.estimateHands(video, true);
```

### Estimate the gestures
```
// using a minimum match score of 8.5 (out of 10)
const estimatedGestures = GE.estimate(predictions.landmarks, 8.5);
```
The result is an object containing possible gestures and their match score, for example:
```
{
    poseData: [ ... ],
    gestures: [
        { name: 'thumbs_up', score: 9.25 },
        { ... }
    ]
}
```

In addition, you receive the `poseData` array including the raw curl and direction information for each finger. This is useful for debugging purposes as it can help you understand how an individual finger is "seen" by the library.

```
// example for raw pose data
poseData: [
    ['Thumb', 'No Curl', 'Vertical Up],
    ['Index', 'Half Curl', 'Diagonal Up Right'],
    ...
]
```

## Define your own gestures
You can create any number of hand gestures for this library to recognize. To see how a gesture is described, have a look at the included sample gestures [Victory](./src/gestures/Victory.js) and [Thumbs Up](./src/gestures/ThumbsUp.js).

A gesture is defined by describing the expected curl and direction of each individual finger. For example, a "Thumbs Up" gesture is defined by a stretched-out thumb pointing up while all other fingers are curled and pointing to the left or right 👍.

To describe gestures, you can use the provided [Finger Description Constants](./src/FingerDescription.js):

| Finger | Name |
|--|--|
| 0 | Finger.Thumb |
| 1 | Finger.Index |
| 2 | Finger.Middle |
| 3 | Finger.Ring |
| 4 | Finger.Pinky |

Probably no further explanation is required for finger names... 👋

| Curl | Name |
|--|--|
| 0 | FingerCurl.NoCurl |
| 1 | FingerCurl.HalfCurl |
| 2 | FingerCurl.FullCurl |

You can refer to the images below for an example of how the index finger is curled (no-curl, half curl, full curl):
| ![enter image description here](https://github.com/andypotato/fingerpose/raw/master/assets/nocurl.jpg) | ![enter image description here](https://github.com/andypotato/fingerpose/raw/master/assets/halfcurl.jpg) | ![enter image description here](https://github.com/andypotato/fingerpose/raw/master/assets/fullcurl.jpg) |
|--|--|--|
| No curl | Half curl | Full curl |


| Direction | Name |
|--|--|
| 0 | Vertical Up 👆 |
| 1 | Vertical Down 👇|
| 2 | Horizontal Left 👈|
| 3 | Horizontal Right 👉 |
| 4 | Diagonal Up Right ↗️ |
| 5 | Diagonal Up Left ↖️ |
| 6 | Diagonal Down Right ↘️ |
| 7 | Diagonal Down Left ↙️ |

#### Example: Thumbs down gesture description 👎
First, create a new GestureDescription object:
```
const thumbsDownGesture = new fp.GestureDescription('thumbs_down');
```
Expect the thumb to be stretched out and pointing down:
```
thumbsDownGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl);
thumbsDownGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalDown, 1.0);
```
This will define that a thumb pointing downwards will result in the highest score (1.0) for this gesture. If the thumb is angled diagonally down left / right we can somehow still accept it, albeit with a lower score (0.9).
```
thumbsDownGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalDownLeft, 0.9);
thumbsDownGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalDownRight, 0.9);
```

All other fingers are expected to be fully curled. For this gesture, it doesn't matter which direction the curled fingers are pointing at therefore only the curl description is added. Same as above, it's recommended to accept half-curled fingers too, with a little bit lower score.
```
// do this for all other fingers
for(let finger of [fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
  thumbsUpDescription.addCurl(finger, FingerCurl.FullCurl, 1.0);
  thumbsUpDescription.addCurl(finger, FingerCurl.HalfCurl, 0.9);
}
```
## Tips to improve detection

### Experiment with scores and weights

The "score" is a number between 0 and 10 which describes how well a given combination of finger curl / positions matches a predefined gesture. A perfect match will result in a score of 10.

* The score threshold should be set rather high (at least 8, best 8.5). If you want to distinguish very similar gestures like "Thumbs up" and "Thumbs down", then add more constraints to your gesture descriptions.
* Try to experiment with the score for individual fingers. You can add more (or less) weight to a single curl / direction by settng the third parameter to a value lower or higher than 1.0.

### Check if you really need a finger-pointing direction

Many poses do not require fingers pointing in a specific direction but are defined by curls only. In these cases just do not add direction constraints to your pose. This also makes it easier to account for left-/right-handed persons.

Also note: Unless you're Houdini, you can not fully curl your thumb.

### Pre-process your input data

* Consider running another model like [PoseNet](https://github.com/tensorflow/tfjs-models/tree/master/posenet) to detect the hand position(s) first, then crop your input image to only contain the hand. This will not only significantly reduce false detections but also speed up Handpose inference as much fewer image data needs to be processed (PoseNet is cheap in comparison).
* MediaPipe Handpose does not offer much customization. Still, you can try playing with the model parameters, especially `detectionConfidence` and `iouThreshold` which can improve accuracy under some lighting conditions.

### Post-process your detections

You should treat your detections as a "noisy signal" and add some smoothing / filtering. For example:

* Easy: Use an average of (for example) three consecutive detections (basically a high pass filter)
* Advanced: Use filters like One-Euro filters

### Debug your gestures

 Look at the raw pose data result in `GestureEstimator::estimate()` to understand the detected curls / directions for each finger to the console. This way you can verify if your assumed curls / directions match with what the estimator actually sees.

## Known issues and limitations
 - Currently, only one hand is supported at the same time. This is a limitation of the underlying `handpose` model and may or may not change in the future.
 - The `handpose` model has issues detecting a single stretched-out finger (for example index finger). It will occasionally not detect a finger going from "curled" to "not curled" or vice-versa.

## Credits

The hand gesture recognition module is based on the amazing work of [Prasad Pai](https://github.com/Prasad9/Classify-HandGesturePose). This module is more or less a straight JavaScript port of his [FingerPoseEstimate](https://github.com/Prasad9/Classify-HandGesturePose/blob/master/pose/utils/FingerPoseEstimate.py) Python module.
