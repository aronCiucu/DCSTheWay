package main.UI.ActionListeners;

import main.UI.Crosshair;
import main.UI.GUI;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class ClearPoints implements ActionListener {
    private final Crosshair crosshair;

    public ClearPoints(Crosshair crosshair) {
        this.crosshair = crosshair;
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        GUI.clearCoords();
        crosshair.hide();
        GUI.getClearPointsButton().setEnabled(false);
        GUI.getTransferToDCSButton().setEnabled(false);
        GUI.getSelectPointButton().setEnabled(false);
    }
}
