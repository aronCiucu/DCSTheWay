package main.UI.ActionListeners;

import main.UI.Crosshair;
import main.UI.GUI;
import main.Waypoints.WaypointManager;
import main.models.Coordinate;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.ArrayList;

public class EndSelection implements ActionListener {
    private final Crosshair crosshair;

    public EndSelection(Crosshair crosshair) {
        this.crosshair = crosshair;
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        crosshair.hide();
        ArrayList<Coordinate> wpts = GUI.getWaypoints();
        WaypointManager.send(wpts);
//        GUI.clearCoords();
//        GUI.getTransferToDCSButton().setEnabled(false);
//        GUI.getClearPointsButton().setEnabled(false);
//        GUI.getSelectPointButton().setEnabled(false);
    }
}
