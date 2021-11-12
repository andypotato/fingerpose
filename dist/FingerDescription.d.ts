declare const Finger: {
    Thumb: number;
    Index: number;
    Middle: number;
    Ring: number;
    Pinky: number;
    all: number[];
    nameMapping: {
        0: string;
        1: string;
        2: string;
        3: string;
        4: string;
    };
    pointsMapping: {
        0: number[][];
        1: number[][];
        2: number[][];
        3: number[][];
        4: number[][];
    };
    getName: (value: any) => any;
    getPoints: (value: any) => any;
};
declare const FingerCurl: {
    NoCurl: number;
    HalfCurl: number;
    FullCurl: number;
    nameMapping: {
        0: string;
        1: string;
        2: string;
    };
    getName: (value: any) => any;
};
declare const FingerDirection: {
    VerticalUp: number;
    VerticalDown: number;
    HorizontalLeft: number;
    HorizontalRight: number;
    DiagonalUpRight: number;
    DiagonalUpLeft: number;
    DiagonalDownRight: number;
    DiagonalDownLeft: number;
    nameMapping: {
        0: string;
        1: string;
        2: string;
        3: string;
        4: string;
        5: string;
        6: string;
        7: string;
    };
    getName: (value: any) => any;
};
export { Finger, FingerCurl, FingerDirection };
