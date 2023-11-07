import {Box, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import ModalContainer from "react-modal-promise";

import SourceSelector from "./components/SourceSelector";
import WaypointList from "./components/WaypointList";
import {waypointsActions} from "./store/waypoints";
import theWayTheme from "./theme/TheWayTheme";
import TransferControls from "./components/TransferControls";
import TitleBar from "./components/TitleBar";
import ConvertModuleWaypoints from "./utils/ConvertModuleWaypoints";
import GetModuleCommands from "./moduleCommands/GetModuleCommands";
import askUserAboutSeat from "./moduleCommands/askUserAboutSeat";
import useElectronIpcListeners from "./hooks/useElectronIpcListeners";
import SettingsDialog from "./components/SettingsDialog";

const {ipcRenderer} = window.require("electron");

const theme = createTheme(theWayTheme);

function App() {
    const dispatch = useDispatch();
    const {module, lat, long, elev} = useSelector((state) => state.dcsPoint);
    const dcsWaypoints = useSelector((state) => state.waypoints.dcsWaypoints);
    const userPreferences = useSelector(state => state.ui.userPreferences);
    const [settingsModalOpen, setSettingsModalOpen] = useState(false);

    const latRef = useRef();
    const longRef = useRef();
    const elevRef = useRef();
    const moduleRef = useRef();
    const dcsWaypointsRef = useRef();
    useEffect(() => {
        latRef.current = lat;
        longRef.current = long;
        elevRef.current = elev;
        moduleRef.current = module;
        dcsWaypointsRef.current = dcsWaypoints;
    }, [lat, long, elev, module, dcsWaypoints]);

    useElectronIpcListeners();
    useEffect(() => {
        ipcRenderer.on("saveWaypoint", () => {
            dispatch(
                waypointsActions.addDcsWaypoint({
                    lat: latRef.current,
                    long: longRef.current,
                    elev: elevRef.current,
                })
            );
        });
        ipcRenderer.on("transferWaypoints", handleTransfer);
        return () => {
            ipcRenderer.removeAllListeners("saveWaypoint");
            ipcRenderer.removeAllListeners("transferWaypoints");
        }
    }, [userPreferences]);

    const handleTransfer = async () => {
        const moduleWaypoints = ConvertModuleWaypoints(
            dcsWaypointsRef.current,
            moduleRef.current
        );
        const chosenSeat = await askUserAboutSeat(moduleRef.current, userPreferences);
        const commands = GetModuleCommands(chosenSeat, moduleWaypoints);
        ipcRenderer.send("transfer", commands);
    };

    const handleFileSave = () => {
        ipcRenderer.send("saveFile", JSON.stringify(dcsWaypoints));
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme/>
            <TitleBar openSettingsHandler={() => setSettingsModalOpen(true)}/>
            <ModalContainer/>
            <Box sx={{height: "100vh"}}>
                <SettingsDialog open={settingsModalOpen} closeHandler={() => setSettingsModalOpen(false)}/>
                <Box sx={{height: "25%"}}>
                    <SourceSelector/>
                </Box>
                <Box sx={{height: "60%", paddingX: 2}}>
                    <WaypointList/>
                </Box>
                <Box sx={{height: "15%"}}>
                    <TransferControls
                        onTransfer={handleTransfer}
                        onSaveFile={handleFileSave}
                    />
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default App;
