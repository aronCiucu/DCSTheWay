import ah64 from "./ah64";

const waypoints = [{
    "id": 1, "name": "aaa", "lat": "43.59.985", "latHem": "N", "long": "040.08.605", "longHem": "E", "elev": "2412"
}];
test("AH-64 waypoints to button presses", () => {
    const expectedPresses = [{
        device: 43, code: 3029, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 43, code: 3013, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 43, code: 3023, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 43, code: 3024, delay: 200, activate: 1, addDepress: 'true'
    }, {
        device: 29, code: 3006, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 29, code: 3007, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 29, code: 3007, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 29, code: 3007, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 29, code: 3006, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 29, code: 3001, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 29, code: 3020, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 29, code: 3036, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 29, code: 3035, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 29, code: 3037, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 29, code: 3041, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 29, code: 3041, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 29, code: 3040, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 29, code: 3037, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 29, code: 3011, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 29, code: 3043, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 29, code: 3036, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 29, code: 3043, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 29, code: 3043, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 29, code: 3040, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 29, code: 3038, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 29, code: 3043, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 29, code: 3037, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 29, code: 3006, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 29, code: 3001, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 29, code: 3034, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 29, code: 3036, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 29, code: 3033, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 29, code: 3034, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 29, code: 3006, delay: 100, activate: 1, addDepress: 'true'
    }];
    ah64.slotVariant = "AH-64D_BLK_IIpilot"
    const buttonPresses = ah64.createButtonCommands(waypoints);
    expect(buttonPresses).toEqual(expectedPresses);
})