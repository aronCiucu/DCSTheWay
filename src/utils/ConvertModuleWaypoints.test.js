import ConvertModuleWaypoints from "./ConvertModuleWaypoints";

let dcsWaypoints;
beforeAll(() => {
    dcsWaypoints = [
        {"id": 5, "name": "W1", "lat": 43.999756838301, "long": 40.143417541493, "elev": 735.44140625}
    ];
});
describe("converting DMM coordinates", () => {
    test("00.00.000", function () {
        const converted = ConvertModuleWaypoints(dcsWaypoints, "F-16C_50");
        const expected = [
            {
                "id": 5,
                "name": "W1",
                "lat": "43.59.985",
                "latHem": "N",
                "long": "040.08.605",
                "longHem": "E",
                "elev": "2412"
            }
        ];
        expect(converted).toEqual(expected);
    });
    test("00.00.00", function () {
        const converted = ConvertModuleWaypoints(dcsWaypoints, "AH-64D_BLK_II");
        const expected = [
            {
                "id": 5,
                "name": "W1",
                "lat": "43.59.99",
                "latHem": "N",
                "long": "040.08.61",
                "longHem": "E",
                "elev": "2412"
            }
        ];
        expect(converted).toEqual(expected);
    });
    test.skip("00.00.0", function () {
        const converted = ConvertModuleWaypoints(dcsWaypoints, "Ka-50");
        const expected = [
            {
                "id": 5,
                "name": "W1",
                "lat": "44.00.0",
                "latHem": "N",
                "long": "040.08.6",
                "longHem": "E",
                "elev": "2412"
            }
        ];
        expect(converted).toEqual(expected);
    });
});
