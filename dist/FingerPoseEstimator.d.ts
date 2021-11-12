export default class FingerPoseEstimator {
    constructor(options: any);
    options: any;
    estimate(landmarks: any): {
        curls: number[];
        directions: number[];
    };
    getSlopes(point1: any, point2: any): number | number[];
    angleOrientationAt(angle: any, weightageAt?: number): number[];
    estimateFingerCurl(startPoint: any, midPoint: any, endPoint: any): number;
    estimateHorizontalDirection(start_end_x_dist: any, start_mid_x_dist: any, mid_end_x_dist: any, max_dist_x: any): number;
    estimateVerticalDirection(start_end_y_dist: any, start_mid_y_dist: any, mid_end_y_dist: any, max_dist_y: any): number;
    estimateDiagonalDirection(start_end_y_dist: any, start_mid_y_dist: any, mid_end_y_dist: any, max_dist_y: any, start_end_x_dist: any, start_mid_x_dist: any, mid_end_x_dist: any, max_dist_x: any): number;
    calculateFingerDirection(startPoint: any, midPoint: any, endPoint: any, fingerSlopes: any): number;
    calculateSlope(point1x: any, point1y: any, point2x: any, point2y: any): number;
}
