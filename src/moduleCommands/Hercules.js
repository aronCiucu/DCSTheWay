class hercules {
	static extraDelay = 0;
	static #device_id = 20;
	static #delay_value = 50 + this.extraDelay;
	static #kuKeycodes = {
		"NavCTRL": 3213,
		"L1": 3201,
		"L2": 3202,
		"L3": 3203,
		"L4": 3204,
		"L5": 3205,
		"L6": 3206,
		"R1": 3207,
		"R2": 3208,
		"R3": 3209,
		"R4": 3210,
		"R5": 3211,
		"R6": 3212,
		"1": 3214,
		"2": 3215,
		"3": 3216,
		"4": 3217,
		"5": 3218,
		"6": 3219,
		"7": 3220,
		"8": 3221,
		"9": 3222,
		"0": 3223,
		//letters
		"a": 3224,
		"b": 3225,
		"c": 3226,
		"d": 3227,
		"e": 3228,
		"f": 3229,
		"g": 3230,
		"h": 3231,
		"i": 3232,
		"j": 3233,
		"k": 3234,
		"l": 3235,
		"m": 3236,
		"n": 3237,
		"o": 3238,
		"p": 3239,
		"q": 3240,
		"r": 3241,
		"s": 3242,
		"t": 3243,
		"u": 3244,
		"v": 3245,
		"w": 3246,
		"x": 3247,
		"y": 3248,
		"z": 3249,
		" ": 3250
	};
	static #codesPayload = [];

	static #addKeyboardCode(character) {
		const characterCode = this.#kuKeycodes[character.toLowerCase()];
		if (typeof characterCode === "object") {
		 	 for (const code of characterCode) {
				this.#codesPayload.push({
				device: this.#device_id,
				code: code,
			  	delay: this.#delay_value,
			  	activate: 1,
			  	addDepress: "false",
			});
		  }
		} 
		else {
		  	if (characterCode !== undefined)
				this.#codesPayload.push({
			  		device: this.#device_id,
			  		code: characterCode,
			  		delay: this.#delay_value,
			  		activate: 1,
			  		addDepress: "false",
				});
		}
	}

	static createButtonCommands(waypoints) {
		this.#codesPayload = [];
		// Go to WP page
		this.#codesPayload.push(
			{
				device: this.#device_id,
				code: this.#kuKeycodes["NavCTRL"],
				delay: this.#delay_value,
				activate: 1,
				addDepress: "false",
			}
		)
			
		for (const waypoint of waypoints) {

			//Type name (max 8 chars on display)
			for (let i = 0; i < 8; i++) {
			this.#addKeyboardCode(waypoint.name.charAt(i));
			};
					
			// Select L2 to store WP name
			this.#codesPayload.push({
				device: this.#device_id,
				code: this.#kuKeycodes["L2"],
				delay: this.#delay_value,
				activate: 1,
				addDepress: "false",
			});

			//check if latitude is N or S
			if (waypoint.latHem === "N") {
					this.#codesPayload.push({
						device: this.#device_id,
						code: this.#kuKeycodes["n"],
						delay: this.#delay_value,
						activate: 1,
						addDepress: "false",
					});
				} 	else {
					this.#codesPayload.push({
						device: this.#device_id,
						code: this.#kuKeycodes["s"],
						delay: this.#delay_value,
						activate: 1,
						addDepress: "false",
					});
				}
				
			//Type lat
			for (let i = 0; i < waypoint.lat.length; i++) {
				waypoint.lat.charAt(i) !== "." &&
					this.#addKeyboardCode(waypoint.lat.charAt(i));
			}
			
			// Select L5 to store Lat
			this.#codesPayload.push({
				device: this.#device_id,
				code: this.#kuKeycodes["L5"],
				delay: this.#delay_value,
				activate: 1,
				addDepress: "false",
			});

			//check if longitude is E or W
			if (waypoint.longHem === "E") {
					this.#codesPayload.push({
						device: this.#device_id,
						code: this.#kuKeycodes["e"],
						delay: this.#delay_value,
						activate: 1,
						addDepress: "false",
					});
				} else {
					this.#codesPayload.push({
						device: this.#device_id,
						code: this.#kuKeycodes["w"],
						delay: this.#delay_value,
						activate: 1,
						addDepress: "false",
					});
				}
				
			//Type long
			for (let i = 0; i < waypoint.long.length; i++) {
				waypoint.long.charAt(i) !== "." &&
					this.#addKeyboardCode(waypoint.long.charAt(i));
			}

			// Select L6 to store Long
			this.#codesPayload.push({
				device: this.#device_id,
				code: this.#kuKeycodes["L6"],
				delay: this.#delay_value, 
				activate: 1,
				addDepress: "false",
			})

			//increment WP
			this.#codesPayload.push({
				device: this.#device_id,
				code: this.#kuKeycodes["R1"],
				delay: this.#delay_value,
				activate: 1,
				addDepress: "false",
			});
        }
		// DEC back to WP 1
		for (let i = 0; i < waypoints.length; i++) {
			this.#codesPayload.push({
				device: this.#device_id,
				code: this.#kuKeycodes["R2"],
				delay: this.#delay_value, 
				activate: 1,
				addDepress: "false",
			})
		}

		return this.#codesPayload;
	}
}

export default hercules;