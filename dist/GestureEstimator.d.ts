export default class GestureEstimator {
    constructor(knownGestures: any, estimatorOptions?: {});
    estimator: FingerPoseEstimator;
    gestures: any;
    estimate(landmarks: any, minScore: any): {
        poseData: any[][];
        gestures: {
            name: any;
            score: any;
        }[];
    };
}
import FingerPoseEstimator from "./FingerPoseEstimator";
