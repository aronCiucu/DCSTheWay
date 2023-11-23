import { expectedF16ButtonPresses } from "../../testing/constants";
import f16 from "./f16";

const testingWaypoints = [
  {
    id: 1,
    name: "waypoint1",
    lat: "43.59.985",
    latHem: "N",
    long: "040.08.605",
    longHem: "E",
    elev: "1234",
  },
  {
    id: 2,
    name: "waypoint2",
    lat: "42.34.867",
    latHem: "N",
    long: "042.05.632",
    longHem: "E",
    elev: "5678",
  },
];

test("F-16 waypoints to button presses", () => {
  const buttonPresses = f16.createButtonCommands(testingWaypoints);
  expect(buttonPresses).toEqual(expectedF16ButtonPresses);
});
