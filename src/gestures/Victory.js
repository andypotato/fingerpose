import { Finger, FingerCurl, FingerDirection } from '../FingerDescription';
import GestureDescription from '../GestureDescription';


// describe victory gesture ✌️
const victoryDescription = new GestureDescription('victory');


// thumb:
victoryDescription.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);
victoryDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);
victoryDescription.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0);

// index:
victoryDescription.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
victoryDescription.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);
victoryDescription.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 1.0);
victoryDescription.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 1.0);
victoryDescription.addDirection(Finger.Index, FingerDirection.HorizontalLeft, 1.0);
victoryDescription.addDirection(Finger.Index, FingerDirection.HorizontalRight, 1.0);

// middle:
victoryDescription.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
victoryDescription.addDirection(Finger.Middle, FingerDirection.VerticalUp, 1.0);
victoryDescription.addDirection(Finger.Middle, FingerDirection.DiagonalUpLeft, 1.0);
victoryDescription.addDirection(Finger.Middle, FingerDirection.DiagonalUpRight, 1.0);
victoryDescription.addDirection(Finger.Middle, FingerDirection.HorizontalLeft, 1.0);
victoryDescription.addDirection(Finger.Middle, FingerDirection.HorizontalRight, 1.0);

// ring:
victoryDescription.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
victoryDescription.addCurl(Finger.Ring, FingerCurl.HalfCurl, 0.9);

// pinky:
victoryDescription.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
victoryDescription.addCurl(Finger.Pinky, FingerCurl.HalfCurl, 0.9);

export default victoryDescription;
