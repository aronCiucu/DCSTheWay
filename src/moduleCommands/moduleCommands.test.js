import {
  a10Buttons,
  a10Waypoints,
  ah64Buttons,
  ah64Waypoints,
  av8bButtons,
  av8bWaypoints,
  f15eButtons,
  f15eWaypoints,
  f16Buttons,
  f16Waypoints,
  fa18Buttons,
  fa18Waypoints,
  ka50Buttons,
  ka50Waypoints,
  m2000Buttons,
  m2000Waypoints,
  miragef1Buttons,
  miragef1Waypoints,
  uh60Buttons,
  uh60Waypoints,
} from "../../testing/constants";
import a10 from "./a10";
import ah64 from "./ah64";
import av8b from "./av8b";
import f15e from "./f15e";
import fa18 from "./fa18";
import ka50 from "./ka50";
import m2000 from "./m2000";
import miragef1 from "./miragef1";
import uh60l from "./uh60l";
import f16 from "./f16";

describe("Converts module waypoints to button presses", () => {
  test("A-10", () => {
    const buttonPresses = a10.createButtonCommands(a10Waypoints);
    expect(buttonPresses).toEqual(a10Buttons);
  });
  test("AH-64", () => {
    ah64.slotVariant = "AH-64D_BLK_IIpilot";
    const buttonPresses = ah64.createButtonCommands(ah64Waypoints);
    expect(buttonPresses).toEqual(ah64Buttons);
  });
  test("AV-8B", () => {
    const buttonPresses = av8b.createButtonCommands(av8bWaypoints);
    expect(buttonPresses).toEqual(av8bButtons);
  });
  test("F-15E", () => {
    const buttonPresses = f15e.createButtonCommands(f15eWaypoints);
    expect(buttonPresses).toEqual(f15eButtons);
  });
  test("F-16", () => {
    const buttonPresses = f16.createButtonCommands(f16Waypoints);
    expect(buttonPresses).toEqual(f16Buttons);
  });
  test("F/A-18", () => {
    const buttonPresses = fa18.createButtonCommands(fa18Waypoints);
    expect(buttonPresses).toEqual(fa18Buttons);
  });
  test("Ka-50", () => {
    const buttonPresses = ka50.createButtonCommands(ka50Waypoints);
    expect(buttonPresses).toEqual(ka50Buttons);
  });
  test("M-2000", () => {
    const buttonPresses = m2000.createButtonCommands(m2000Waypoints);
    expect(buttonPresses).toEqual(m2000Buttons);
  });
  test("Mirage F1", () => {
    const buttonPresses = miragef1.createButtonCommands(miragef1Waypoints);
    expect(buttonPresses).toEqual(miragef1Buttons);
  });
  test("UH-60", () => {
    const buttonPresses = uh60l.createButtonCommands(uh60Waypoints);
    expect(buttonPresses).toEqual(uh60Buttons);
  });
});
