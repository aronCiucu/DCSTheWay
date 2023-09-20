class miragef1 {
    static #kuKeycodes = {
        "1": 3698,
        "2": 3699, // N
        "3": 3700,
        "4": 3701, // W
        "5": 3702,
        "6": 3703, // E
        "7": 3704,
        "8": 3705, // S
        "9": 3706,
        "0": 3697,
        "INSER": 3711,
        "MODE": 3692,
        "PARAM": 3690,
        "WAYPOINT": 3694
    }
    static #codesPayload = [];
    
    static #keypadPress(key, value = 1, depress = true) {
        return {
            device: 1,
            code: this.#kuKeycodes[key],
            delay: 100,
            activate: value,
            addDepress: depress ? "true" : "false",
        };
    }

    static createButtonCommands(waypoints) {
        this.#codesPayload = [];
        this.#codesPayload.push(
            //Mode NAV
            this.#keypadPress("MODE", 0.1, false),
            //Parameter POS
            this.#keypadPress("PARAM", 0, false)
        );
        for (const waypoint of waypoints) {
            //Increment waypoint
            this.#codesPayload.push(this.#keypadPress("WAYPOINT", 0.111, false));

            //Hemisphere
            if (waypoint.latHem === "N") {
                this.#codesPayload.push(this.#keypadPress(2));
            } else {
                this.#codesPayload.push(this.#keypadPress(8));
            }

            //Latitude
            for (const c of waypoint.lat) {
                if (isNaN(c)) continue;
                this.#codesPayload.push(this.#keypadPress(parseInt(c)));
            }

            //Insert
            this.#codesPayload.push(this.#keypadPress("INSER"));

            //Hemisphere
            if (waypoint.longHem === "E") {
                this.#codesPayload.push(this.#keypadPress(6));
            } else {
                this.#codesPayload.push(this.#keypadPress(4));
            }

            //Longitude
            for (const c of waypoint.long) {
                if (isNaN(c)) continue;
                this.#codesPayload.push(this.#keypadPress(parseInt(c)));
            }

            //Insert
            this.#codesPayload.push(this.#keypadPress("INSER"));
        }

        //Parameter PP
        this.#codesPayload.push(this.#keypadPress("PARAM", 0.2, false))
        return this.#codesPayload;
    }
}

export default miragef1