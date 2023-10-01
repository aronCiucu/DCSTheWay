class uh60l {
    static #device_id = 23;
    static #mode_value = 0.04;
    static #display_value = 0.05;
    static #kuKeycodes = {
        "mode": 3235,
        "display": 3236,
        "kbd": 3237,
        "left": 3238,
        "mid": 3239,
        "right": 3240,
        "f1": 3241,
        "1": 3242,
        "2": 3243,
        "3": 3244,
        "tgtstr": 3245,
        "4": 3246,
        "5": 3247,
        "6": 3248,
        "inc": 3249,
        "7": 3250,
        "8": 3251,
        "9": 3252,
        "dec": 3253,
        "clr": 3254,
        "0": 3255,
        "ent": 3256,
        // letters...
        "a": [3238, 3242],
        "b": [3239, 3242],
        "c": [3240, 3242],
        "d": [3238, 3243],
        "e": [3239, 3243],
        "f": [3240, 3243],
        "g": [3238, 3244],
        "h": [3239, 3244],
        "i": [3240, 3244],
        "j": [3238, 3245],
        "k": [3239, 3245],
        "l": [3240, 3245],
        "m": [3238, 3246],
        "n": [3239, 3246],
        "o": [3240, 3246],
        "p": [3238, 3247],
        "q": [3239, 3247],
        "r": [3240, 3247],
        "s": [3238, 3248],
        "t": [3239, 3248],
        "u": [3240, 3248],
        "v": [3238, 3249],
        "w": [3239, 3249],
        "x": [3240, 3249],
        "y": [3238, 3250],
        "z": [3239, 3250],
    };
    static #codesPayload = [];

    static #addKeyboardCode(character) {
        const characterCode = this.#kuKeycodes[character.toLowerCase()];
        if (typeof characterCode === "object") {
            for (const code of characterCode) {
                this.#codesPayload.push({
                    device: this.#device_id,
                    code: code,
                    delay: 100,
                    activate: 1,
                    addDepress: "true",
                });
            }
        } else {
            if (characterCode !== undefined)
                this.#codesPayload.push({
                    device: this.#device_id,
                    code: characterCode,
                    delay: 100,
                    activate: 1,
                    addDepress: "true",
                });
        }
    }

    static #addKeyboardValue(character, value) {
        const characterCode = this.#kuKeycodes[character.toLowerCase()];
        if ((characterCode !== undefined) && (value !== undefined)) {
            this.#codesPayload.push({
                device: this.#device_id,
                code: characterCode,
                delay: 100,
                activate: value,
                addDepress: "true",
            });
        }
    }

    static createButtonCommands(waypoints) {
        this.#codesPayload = [];

        // Set mode to LAT/LONG - SelectMode value 0.03
        this.#addKeyboardValue("mode", this.#mode_value);

        // Switch to waypoint page (device this.#device_id, SelectDisplay, value 0.05
        this.#addKeyboardValue("display", this.#display_value);

        // INC, KBD - name, KBD - grid, KBD - 4 + 4?
        for (const waypoint of waypoints) {
            // kbd
            // name
            // kbd
            // lat/long
            // enter

            // increment waypoint
            this.#addKeyboardCode("inc");

            // kbd
            this.#addKeyboardCode("kbd");

            //Type name (max 5 chars)
            for (let i = 0; i < 5; i++) {
                this.#addKeyboardCode(waypoint.name.charAt(i));
            }

            // kbd
            this.#addKeyboardCode("kbd");

            //check if latitude is N or S
            if (waypoint.latHem === "N") {
                this.#codesPayload.push({
                    device: this.#device_id,
                    code: this.#kuKeycodes["n"][1],
                    delay: 100,
                    activate: 1,
                    addDepress: "true",
                });
            } else {
                this.#codesPayload.push({
                    device: this.#device_id,
                    code: this.#kuKeycodes["s"][1],
                    delay: 100,
                    activate: 1,
                    addDepress: "true",
                });
            }
            //Type lat
            for (let i = 0; i < waypoint.lat.length; i++) {
                waypoint.lat.charAt(i) !== "." && this.#addKeyboardCode(waypoint.lat.charAt(i));
            }
            //check if longitude is E or W
            if (waypoint.longHem === "E") {
                this.#codesPayload.push({
                    device: this.#device_id,
                    code: this.#kuKeycodes["e"][1],
                    delay: 100,
                    activate: 1,
                    addDepress: "true",
                });
            } else {
                this.#codesPayload.push({
                    device: this.#device_id,
                    code: this.#kuKeycodes["w"][1],
                    delay: 100,
                    activate: 1,
                    addDepress: "true",
                });
            }
            //Type long
            for (let i = 0; i < waypoint.long.length; i++) {
                waypoint.long.charAt(i) !== "." && this.#addKeyboardCode(waypoint.long.charAt(i));
            }

            // enter
            this.#addKeyboardCode("ent");
        }
        // DEC back to 0?
        for (let i = 0; i < waypoints.length; i++) {
            this.#addKeyboardCode("dec");
        }

        return this.#codesPayload;
    }
}

export default uh60l;