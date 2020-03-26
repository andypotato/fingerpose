
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
## Define your own gestures
You can create any number of hand gestures for this library to recognize. To see how a gesture is described, have a look at the included sample gestures [Victory](https://github.com/andypotato/fingerpose/blob/master/src/gestures/Victory.js) and [Thumbs Up](https://github.com/andypotato/fingerpose/blob/master/src/gestures/ThumbsUp.js).

A gesture is defined by describing the expected curl and direction of each individual finger. For example for a "Thumbs Up" gesture is defined by the stretched out thumb pointing up while all other fingers are curled and pointing to the left or right 👍.

To describe gestures, you can use the provided [Finger Description Constants](https://github.com/andypotato/fingerpose/blob/master/src/FingerDescription.js):

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

You can refer to the images below for an example how the index finger is curled (no curl, half curl, full curl):
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

First create a new GestureDescription object:
```
const thumbsDownGesture = new fp.GestureDescription('thumbs_down');
```
Expect the thumb to be stretched out and pointing down:
```
thumbsDownGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
thumbsUpDescription.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalDownLeft, 0.25);
thumbsUpDescription.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalDownRight, 0.25);
```
This will define that a thumb pointing downwards will result in the highest confidence (1.0) for this gesture. If the thumb is angled to diagonal down left / right we can somehow still accept it, but with a lower confidence (0.25).

All other fingers are expected to be fully curled and held to the left or right:
```
// do this for all other fingers
thumbsUpDescription.addCurl(fp.Finger.Index, fp.FingerCurl.FullCurl, 1.0);
thumbsUpDescription.addDirection(fp.Finger.Index, fp.FingerDirection.HorizontalLeft, 1.0);
thumbsUpDescription.addDirection(fp.Finger.Index, fp.FingerDirection.HorizontalRight, 1.0);
[...]
```

#### The meaning of confidence
"Confidence" is a number between 0 and 10 which describes how accurate a given combination of finger curl / positions matches a predefined gesture. You should design your gestures so a perfect match will result in a confidence of "10".

**Pro tip:** You can also have individual fingers reduce confidence which means "This finger should absolutely not appear in this way".

#### Debugging your gestures

 - You can use the `printDebugInfo` parameter of `GestureEstimator::estimate()` to print out the detected curls / directions for each finger to the console. This way you can verify if your assumed curls / directions match with what the estimator actually sees.
 - To improve confidence you can adjust the "weight" of individual fingers using `GestureDescription::setWeight()`. A victory gesture for example is mostly defined by the stretched out index and middle fingers so you could add some weight to them.
 - The detection of landmarks depends on the TensorFlow.js handpose model. You can check their documentation how to improve detection and adjust parameters like confidence and detection threshold.


## Credits

The hand gesture recognition module is based on the amazing work by [Prasad Pai](https://github.com/Prasad9/Classify-HandGesturePose). This module is more or less a straight JavaScript port of his [FingerPoseEstimate](https://github.com/Prasad9/Classify-HandGesturePose/blob/master/pose/utils/FingerPoseEstimate.py) Python module.
