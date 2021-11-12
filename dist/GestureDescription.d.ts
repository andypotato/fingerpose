export default class GestureDescription {
  constructor(name: string);
  name: string;
  curls: {};
  directions: {};
  addCurl(finger: any, curl: any, contrib?: number): void;
  addDirection(finger: any, position: any, contrib?: number): void;
  matchAgainst(detectedCurls: any, detectedDirections: any): number;
}
