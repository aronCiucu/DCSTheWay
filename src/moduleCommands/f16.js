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
            this.#codesPayload.push({
                device: 17,
                code: characterCode,
                delay: 10,
                activate: 1,
                addDepress: "true",
            });
    }

    static createButtonCommands(waypoints) {
        // honestly about to be the dumbest fix for https://forum.dcs.world/topic/272110-transfer-steerpoints-from-the-f10-map-into-the-aircraft-dcs-the-way/?do=findComment&comment=5264640
        this.#codesPayload.splice(0, this.#codesPayload.length); // this is the f16 fix. it wasnt clearing its payload. so it just persisted. honestly this pull request is quickly overextending its scope.
        this.#codesPayload.push(
            {
                device: 17,
                code: 3032,
                delay: 100,
                activate: -1,
                addDepress: "true",
            },
            {
                device: 17,
                code: 3006,
                delay: 100,
                activate: 1,
                addDepress: "true",
            },
        );
        for (const waypoint of waypoints) {
            this.#codesPayload.push(
                {
                    device: 17,
                    code: 3030,
                    delay: 100,
                    activate: 1,
                    addDepress: "true",
                },
                {
                    device: 17,
                    code: 3035,
                    delay: 100,
                    activate: -1,
                    addDepress: "true",
                },
                {
                    device: 17,
                    code: 3035,
                    delay: 100,
                    activate: -1,
                    addDepress: "true",
                }
            );
            //Type hem
            if (waypoint.latHem === "N") {
                this.#codesPayload.push({
                    device: 17,
                    code: 3004,
                    delay: 10,
                    activate: 1,
                    addDepress: "true",
                });
            } else {
                this.#codesPayload.push({
                    device: 17,
                    code: 3010,
                    delay: 10,
                    activate: 1,
                    addDepress: "true",
                });
            }

            for (let i = 0; i < waypoint.lat.length; i++) { // Type Latitude into UFC
                this.#addKeyboardCode(waypoint.lat.charAt(i));
            }

            //enter
            this.#codesPayload.push({
                device: 17,
                code: 3016,
                delay: 10,
                activate: 1,
                addDepress: "true",
            });
            //dobber to long
            this.#codesPayload.push({
                device: 17,
                code: 3035,
                delay: 100,
                activate: -1,
                addDepress: "true",
            });
            //Type hem
            if (waypoint.longHem === "E") {
                this.#codesPayload.push({
                    device: 17,
                    code: 3008,
                    delay: 10,
                    activate: 1,
                    addDepress: "true",
                });
            } else {
                this.#codesPayload.push({
                    device: 17,
                    code: 3006,
                    delay: 10,
                    activate: 1,
                    addDepress: "true",
                });
            }

            //type long
            for (let i = 0; i < waypoint.long.length; i++) { // Type Longtitude into UFC
                this.#addKeyboardCode(waypoint.long.charAt(i));
            }

            //enter
            this.#codesPayload.push({
                device: 17,
                code: 3016,
                delay: 10,
                activate: 1,
                addDepress: "true",
            });
            //dobber to elev
            this.#codesPayload.push({
                device: 17,
                code: 3035,
                delay: 100,
                activate: -1,
                addDepress: "true",
            });

            //type elev
            for (let i = 0; i < waypoint.elev.length; i++) { // Type Elevation into UFC
                this.#addKeyboardCode(waypoint.elev.charAt(i));
            }

            //enter
            this.#codesPayload.push({
                device: 17,
                code: 3016,
                delay: 10,
                activate: 1,
                addDepress: "true",
            });
            //back to steerpoint field
            this.#codesPayload.push(
                {
                    device: 17,
                    code: 3034,
                    delay: 100,
                    activate: 1,
                    addDepress: "true",
                },
                {
                    device: 17,
                    code: 3034,
                    delay: 100,
                    activate: 1,
                    addDepress: "true",
                },
                {
                    device: 17,
                    code: 3034,
                    delay: 100,
                    activate: 1,
                    addDepress: "true",
                },
                {
                    device: 17,
                    code: 3034,
                    delay: 100,
                    activate: 1,
                    addDepress: "true",
                }
            );
        }

        //main page
        this.#codesPayload.push({
            device: 17,
            code: 3032,
            delay: 100,
            activate: -1,
            addDepress: "true",
        });

        return this.#codesPayload;
    }
}

export default f16