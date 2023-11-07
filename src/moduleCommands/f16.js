import createButtonPress from "../models/ButtonPress";

class f16 {
    static #kuKeycodes = {
        "1": 3003,
        "2": 3004,
        "3": 3005,
        "4": 3006,
        "5": 3007,
        "6": 3008,
        "7": 3009,
        "8": 3010,
        "9": 3011,
        "0": 3002,
    };
    static #codesPayload = [];

    static #addKeyboardCode(character) {
        const characterCode = this.#kuKeycodes[character.toLowerCase()];
        if (characterCode !== undefined)
            this.#codesPayload.push(createButtonPress(17, characterCode,10));
    }

    static createButtonCommands(waypoints) {
        this.#codesPayload = [];
        this.#codesPayload.push(
            createButtonPress(17, 3032, 100, -1),
            createButtonPress(17, 3006, 100),
        );
        for (const waypoint of waypoints) {
            this.#codesPayload.push(
                createButtonPress(17, 3030, 100),
                createButtonPress(17, 3035, 100, -1),
                createButtonPress(17, 3035, 100, -1)
            );
            //Type hem
            if (waypoint.latHem === "N") {
                this.#codesPayload.push(createButtonPress(17, 3004, 10));
            } else {
                this.#codesPayload.push(createButtonPress(17, 3010, 10));
            }

            for (let i = 0; i < waypoint.lat.length; i++) { // Type Latitude into UFC
                this.#addKeyboardCode(waypoint.lat.charAt(i));
            }

            //enter
            this.#codesPayload.push(createButtonPress(17, 3016, 10));
            //dobber to long
            this.#codesPayload.push(createButtonPress(17, 3035, 100, -1));
            //Type hem
            if (waypoint.longHem === "E") {
                this.#codesPayload.push(createButtonPress(17, 3008, 10));
            } else {
                this.#codesPayload.push(createButtonPress(17, 3006, 10));
            }

            //type long
            for (let i = 0; i < waypoint.long.length; i++) { // Type Longtitude into UFC
                this.#addKeyboardCode(waypoint.long.charAt(i));
            }

            //enter
            this.#codesPayload.push(createButtonPress(17, 3016, 10));
            //dobber to elev
            this.#codesPayload.push(createButtonPress(17, 3035, 100, -1));

            //type elev
            for (let i = 0; i < waypoint.elev.length; i++) { // Type Elevation into UFC
                this.#addKeyboardCode(waypoint.elev.charAt(i));
            }

            //enter
            this.#codesPayload.push(createButtonPress(17, 3016, 10));
            //back to steerpoint field
            this.#codesPayload.push(
                createButtonPress(17, 3034, 100),
                createButtonPress(17, 3034, 100),
                createButtonPress(17, 3034, 100),
                createButtonPress(17, 3034, 100),
            );
        }

        //main page
        this.#codesPayload.push(createButtonPress(17, 3032, 100, -1));

        return this.#codesPayload;
    }
}

export default f16