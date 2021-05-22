package main.UI.ActionListeners;

import main.UI.Crosshair;
import main.UI.GUI;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class ShowCrosshair implements ActionListener {
    private final Crosshair crosshair;

    public ShowCrosshair(Crosshair crosshair) {
        this.crosshair = crosshair;
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        crosshair.show();
        GUI.getSelectPointButton().setEnabled(true);
    }
}
