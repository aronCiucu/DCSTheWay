import a10 from "./a10";

const waypoints = [{
    "id": 1,
    "name": "aaaaaaaaaaaa",
    "lat": "43.59.985",
    "latHem": "N",
    "long": "040.08.605",
    "longHem": "E",
    "elev": "2412"
}];
test("A-10 waypoints to button presses", () => {
    const expectedPresses = [{
        device: 9, code: 3011, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 9, code: 3005, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 9, code: 3007, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 9, code: 3040, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 9, code: 3018, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 9, code: 3017, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 9, code: 3019, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 9, code: 3023, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 9, code: 3023, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 9, code: 3022, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 9, code: 3019, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 9, code: 3003, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 9, code: 3031, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 9, code: 3024, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 9, code: 3018, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 9, code: 3024, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 9, code: 3024, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 9, code: 3022, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 9, code: 3020, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 9, code: 3024, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 9, code: 3019, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 9, code: 3004, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 9, code: 3027, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 9, code: 3027, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 9, code: 3027, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 9, code: 3027, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 9, code: 3027, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 9, code: 3027, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 9, code: 3027, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 9, code: 3027, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 9, code: 3027, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 9, code: 3027, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 9, code: 3027, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 9, code: 3027, delay: 100, activate: 1, addDepress: 'true'
    }, {
        device: 9, code: 3005, delay: 100, activate: 1, addDepress: 'true'
    }];
    const buttonPresses = a10.createButtonCommands(waypoints);
    expect(buttonPresses).toEqual(expectedPresses);
})