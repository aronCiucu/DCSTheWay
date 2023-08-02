class f15e {
    static slotVariant = ''
    static #f15eNumberCodes = {
        "0": 3036,
        "1": 3020,
        "2": 3021,
        "3": 3022,
        "4": 3025,
        "5": 3026,
        "6": 3027,
        "7": 3030,
        "8": 3031,
        "9": 3032
    };

    static createButtonCommands(waypoints) {
        let f15eUFCDevice;
        if (["F-15ESE_pilotA", "F-15ESE_pilotB"].includes(this.slotVariant)) {
            f15eUFCDevice = 56;
        } else {
            f15eUFCDevice = 57;
        }
        let delay = 100;
        if (((["F-15ESE_pilotA", "F-15ESE_wsoA"].includes(this.slotVariant)))) // A Route Payload
        {
            // Doesnt need to be Splice-Cleared because payload is created *each time* the function is called, and isnt static.
            let payload = [
                { // Clear UFC button
                    device: f15eUFCDevice,
                    code: 3035,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // Clear UFC button
                    device: f15eUFCDevice,
                    code: 3035,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // Clear UFC button
                    device: f15eUFCDevice,
                    code: 3035,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // Menu UFC button
                    device: f15eUFCDevice,
                    code: 3038,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // Enter 1 button 
                    device: f15eUFCDevice,
                    code: this.#f15eNumberCodes[1],
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // Press Shift
                    device: f15eUFCDevice,
                    code: 3033,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },

                { // Press 1 / A
                    device: f15eUFCDevice,
                    code: this.#f15eNumberCodes[1],
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // Enter 1A into UFC button 10
                    device: f15eUFCDevice,
                    code: 3010,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // Press UFC button 10
                    device: f15eUFCDevice,
                    code: 3010,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // Enter 9 button
                    device: f15eUFCDevice,
                    code: this.#f15eNumberCodes[9],
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // Enter 1 button // reason for this is because we currently cannot remove waypoints on ANY route. so we go to an integer high enough that it is extremely improbable to be an issue.
                    device: f15eUFCDevice,
                    code: this.#f15eNumberCodes[1],
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // Press Shift
                    device: f15eUFCDevice,
                    code: 3033,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },

                { // Press 1 / A
                    device: f15eUFCDevice,
                    code: this.#f15eNumberCodes[1],
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // Enter 91A into UFC button 1
                    device: f15eUFCDevice,
                    code: 3001,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },  // this part is a bit weird ROUTE A IMPLEMENTATION CURRENTLY
                // Im going to create a false steerpoint and then select it from this point forward to allow the change of later/current steerpoints.
                { // Press Shift
                    device: f15eUFCDevice,
                    code: 3033,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // NORTH
                    device: f15eUFCDevice,
                    code: this.#f15eNumberCodes[2],
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // Inserting 5 1 times
                    device: f15eUFCDevice,
                    code: this.#f15eNumberCodes[5],
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // Inserting 5 2 times
                    device: f15eUFCDevice,
                    code: this.#f15eNumberCodes[5],
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // Inserting 5 3 times
                    device: f15eUFCDevice,
                    code: this.#f15eNumberCodes[5],
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // Inserting 5 4 times
                    device: f15eUFCDevice,
                    code: this.#f15eNumberCodes[5],
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // Inserting 5 5 times
                    device: f15eUFCDevice,
                    code: this.#f15eNumberCodes[5],
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // Inserting 5 6 times
                    device: f15eUFCDevice,
                    code: this.#f15eNumberCodes[5],
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // Inserting 5 7 times
                    device: f15eUFCDevice,
                    code: this.#f15eNumberCodes[5],
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // enter latitutde into UFC
                    device: f15eUFCDevice,
                    code: 3002,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                // now we need to do the same for the other coordinate
                { // Press Shift
                    device: f15eUFCDevice,
                    code: 3033,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // EAST
                    device: f15eUFCDevice,
                    code: this.#f15eNumberCodes[6],
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // Inserting 0 
                    device: f15eUFCDevice,
                    code: this.#f15eNumberCodes[0],
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // Inserting 5 1 times
                    device: f15eUFCDevice,
                    code: this.#f15eNumberCodes[5],
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // Inserting 5 2 times
                    device: f15eUFCDevice,
                    code: this.#f15eNumberCodes[5],
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // Inserting 5 3 times
                    device: f15eUFCDevice,
                    code: this.#f15eNumberCodes[5],
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // Inserting 5 4 times
                    device: f15eUFCDevice,
                    code: this.#f15eNumberCodes[5],
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // Inserting 5 5 times
                    device: f15eUFCDevice,
                    code: this.#f15eNumberCodes[5],
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // Inserting 5 6 times
                    device: f15eUFCDevice,
                    code: this.#f15eNumberCodes[5],
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // Inserting 5 7 times
                    device: f15eUFCDevice,
                    code: this.#f15eNumberCodes[5],
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // enter longtitude into UFC
                    device: f15eUFCDevice,
                    code: 3003,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                // Now we're finished with the false coordinate, and we can select it in the MENU
                { // Menu UFC button
                    device: f15eUFCDevice,
                    code: 3038,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // Enter 9 button
                    device: f15eUFCDevice,
                    code: this.#f15eNumberCodes[9],
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // Enter 1 button 
                    device: f15eUFCDevice,
                    code: this.#f15eNumberCodes[1],
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // Press Shift
                    device: f15eUFCDevice,
                    code: 3033,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },

                { // Press 1 / A
                    device: f15eUFCDevice,
                    code: this.#f15eNumberCodes[1],
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // Press UFC button 10
                    device: f15eUFCDevice,
                    code: 3010,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // Press UFC button 10
                    device: f15eUFCDevice,
                    code: 3010,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
            ];
            


            for (const waypoint of waypoints) {
                let waypointNumber = waypoints.indexOf(waypoint) + 1;
                for (let i = 0; i < (waypointNumber + '').length; i++) {
                    // eslint-disable-next-line default-case
                    let digit = (waypointNumber + '').charAt(i);
                    payload.push({ // Waypoint Digit
                        device: f15eUFCDevice,
                        code: this.#f15eNumberCodes[digit],
                        delay: delay,
                        activate: 1,
                        addDepress: "true",
                    });
        
                }

                payload.push({ // Press PB 1
                    device: f15eUFCDevice,
                    code: 3001,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                });

                payload.push({ // Press Shift
                    device: f15eUFCDevice,
                    code: 3033,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                });

                if (waypoint.latHem === "N") { // North
                    payload.push({
                        device: f15eUFCDevice,
                        code: this.#f15eNumberCodes[2],
                        delay: delay,
                        activate: 1,
                        addDepress: "true",
                    });
                } else {
                    payload.push({ // South
                        device: f15eUFCDevice,
                        code: this.#f15eNumberCodes[8],
                        delay: delay,
                        activate: 1,
                        addDepress: "true",
                    });
                }

                //Type lat
                for (let i = 0; i < waypoint.lat.length; i++) { // enter each digit of lat into scratchpad
                    // eslint-disable-next-line default-case
                    for (const char of waypoint.lat.charAt(i)) {
                        if (char !== ".") {
                            payload.push({
                                device: f15eUFCDevice,
                                code: this.#f15eNumberCodes[char],
                                delay: delay,
                                activate: 1,
                                addDepress: "true",
                            });
                        }
                    }
                }

                payload.push({ // enter latitutde into UFC
                    device: f15eUFCDevice,
                    code: 3002,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                });

                payload.push({ // Press Shift
                    device: f15eUFCDevice,
                    code: 3033,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                });

                if (waypoint.longHem === "E") { // Type hemisphere into scratchpad
                    payload.push({
                        device: f15eUFCDevice,
                        code: this.#f15eNumberCodes[6],
                        delay: delay,
                        activate: 1,
                        addDepress: "true",
                    });
                } else {
                    payload.push({
                        device: f15eUFCDevice,
                        code: this.#f15eNumberCodes[4],
                        delay: delay,
                        activate: 1,
                        addDepress: "true",
                    });
                }

                for (let i = 0; i < waypoint.long.length; i++) { // enter each digit of longtitude into scratchpad
                    // eslint-disable-next-line default-case
                    for (const char of waypoint.long.charAt(i)) {
                        if (char !== ".") {
                            payload.push({
                                device: f15eUFCDevice,
                                code: this.#f15eNumberCodes[char],
                                delay: delay,
                                activate: 1,
                                addDepress: "true",
                            });
                        }
                    }
                }

                payload.push({ // enter longtitude into UFC
                    device: f15eUFCDevice,
                    code: 3003,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                });

                for (let i = 0; i < waypoint.elev.length; i++) { // enter each digit of elevation into scratchpad
                    // eslint-disable-next-line default-case
                    for (const char of waypoint.elev.charAt(i)) {
                        payload.push({
                            device: f15eUFCDevice,
                            code: this.#f15eNumberCodes[char],
                            delay: delay,
                            activate: 1,
                            addDepress: "true",
                        });
                    }
                }

                payload.push({ // enter elevation into UFC
                    device: f15eUFCDevice,
                    code: 3007,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                });
            }
            payload.push({ // Menu UFC button
                    device: f15eUFCDevice,
                    code: 3038,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // Enter 1 button // reason for this is because we currently cannot remove waypoints on ANY route. so we go to an integer high enough that it is extremely improbable to be non-nil.
                    device: f15eUFCDevice,
                    code: this.#f15eNumberCodes[1],
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // press shift
                    device: f15eUFCDevice,
                    code: 3033,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // press 1 / A
                    device: f15eUFCDevice,
                    code: this.#f15eNumberCodes[1],
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // Waypoint UFC button
                    device: f15eUFCDevice,
                    code: 3010,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },);

            return payload;
        }
        if (((["F-15ESE_pilotB", "F-15ESE_wsoB"].includes(this.slotVariant)))) // B Route Payload
        {
            let payload = [
                { // Clear UFC button
                    device: f15eUFCDevice,
                    code: 3035,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // Clear UFC button
                    device: f15eUFCDevice,
                    code: 3035,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // Clear UFC button
                    device: f15eUFCDevice,
                    code: 3035,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // Menu UFC button
                    device: f15eUFCDevice,
                    code: 3038,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // Enter 1 button
                    device: f15eUFCDevice,
                    code: this.#f15eNumberCodes[1],
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // Press Shift
                    device: f15eUFCDevice,
                    code: 3033,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },

                { // Press 1 / A
                    device: f15eUFCDevice,
                    code: this.#f15eNumberCodes[1],
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // Enter 1A into UFC button 10
                    device: f15eUFCDevice,
                    code: 3010,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // Press UFC button 10
                    device: f15eUFCDevice,
                    code: 3010,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // Enter 1 button
                    device: f15eUFCDevice,
                    code: this.#f15eNumberCodes[1],
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // Press Shift
                    device: f15eUFCDevice,
                    code: 3033,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },

                { // Press 3 / B
                    device: f15eUFCDevice,
                    code: this.#f15eNumberCodes[3],
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // Enter 1B into UFC button 1
                    device: f15eUFCDevice,
                    code: 3001,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
            ];
            for (const waypoint of waypoints) {
                let waypointNumber = waypoints.indexOf(waypoint) + 1;
                for (let i = 0; i < (waypointNumber + '').length; i++) {
                    // eslint-disable-next-line default-case
                    let digit = (waypointNumber + '').charAt(i);
                    payload.push({ // Waypoint Digit
                        device: f15eUFCDevice,
                        code: this.#f15eNumberCodes[digit],
                        delay: delay,
                        activate: 1,
                        addDepress: "true",
                    });
                }

                payload.push({ // Press Shift
                    device: f15eUFCDevice,
                    code: 3033,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                });

                payload.push({ // Press B / 3
                    device: f15eUFCDevice,
                    code: this.#f15eNumberCodes[3],
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                });

                payload.push({ // Press PB 1
                    device: f15eUFCDevice,
                    code: 3001,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                });

                payload.push({ // Press Shift
                    device: f15eUFCDevice,
                    code: 3033,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                });

                if (waypoint.latHem === "N") { // North
                    payload.push({
                        device: f15eUFCDevice,
                        code: this.#f15eNumberCodes[2],
                        delay: delay,
                        activate: 1,
                        addDepress: "true",
                    });
                } else {
                    payload.push({ // South
                        device: f15eUFCDevice,
                        code: this.#f15eNumberCodes[8],
                        delay: delay,
                        activate: 1,
                        addDepress: "true",
                    });
                }

                //Type lat
                for (let i = 0; i < waypoint.lat.length; i++) { // enter each digit of lat into scratchpad
                    // eslint-disable-next-line default-case
                    for (const char of waypoint.lat.charAt(i)) {
                        if (char !== ".") {
                            payload.push({
                                device: f15eUFCDevice,
                                code: this.#f15eNumberCodes[char],
                                delay: delay,
                                activate: 1,
                                addDepress: "true",
                            });
                        }
                    }
                }

                payload.push({ // enter latitutde into UFC
                    device: f15eUFCDevice,
                    code: 3002,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                });

                payload.push({ // Press Shift
                    device: f15eUFCDevice,
                    code: 3033,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                });

                if (waypoint.longHem === "E") { // Type hemisphere into scratchpad
                    payload.push({
                        device: f15eUFCDevice,
                        code: this.#f15eNumberCodes[6],
                        delay: delay,
                        activate: 1,
                        addDepress: "true",
                    });
                } else {
                    payload.push({
                        device: f15eUFCDevice,
                        code: this.#f15eNumberCodes[4],
                        delay: delay,
                        activate: 1,
                        addDepress: "true",
                    });
                }

                for (let i = 0; i < waypoint.long.length; i++) { // enter each digit of longtitude into scratchpad
                    // eslint-disable-next-line default-case
                    for (const char of waypoint.long.charAt(i)) {
                        if (char !== ".") {
                            payload.push({
                                device: f15eUFCDevice,
                                code: this.#f15eNumberCodes[char],
                                delay: delay,
                                activate: 1,
                                addDepress: "true",
                            });
                        }
                    }
                }

                payload.push({ // enter longtitude into UFC
                    device: f15eUFCDevice,
                    code: 3003,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                });

                for (let i = 0; i < waypoint.elev.length; i++) { // enter each digit of elevation into scratchpad
                    // eslint-disable-next-line default-case
                    for (const char of waypoint.elev.charAt(i)) {
                        payload.push({
                            device: f15eUFCDevice,
                            code: this.#f15eNumberCodes[char],
                            delay: delay,
                            activate: 1,
                            addDepress: "true",
                        });
                    }
                }

                payload.push({ // enter elevation into UFC
                    device: f15eUFCDevice,
                    code: 3007,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                });
            }
            payload.push({ // Menu UFC button
                    device: f15eUFCDevice,
                    code: 3038,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // Type 1 into UFC
                    device: f15eUFCDevice,
                    code: this.#f15eNumberCodes[1],
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // press shift
                    device: f15eUFCDevice,
                    code: 3033,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // press 3 / B
                    device: f15eUFCDevice,
                    code: this.#f15eNumberCodes[3],
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },
                { // Waypoint UFC button
                    device: f15eUFCDevice,
                    code: 3010,
                    delay: delay,
                    activate: 1,
                    addDepress: "true",
                },);

            return payload;
        }
    }
}
export default f15e