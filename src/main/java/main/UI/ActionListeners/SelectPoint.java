package main.UI.ActionListeners;

import main.DCSconnection.PortListenerThread;
import main.UI.GUI;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class SelectPoint implements ActionListener {


    @Override
    public void actionPerformed(ActionEvent e) {

        if(GUI.saveCoord(PortListenerThread.getCoordinate())){
            GUI.getClearPointsButton().setEnabled(true);
            GUI.getTransferToDCSButton().setEnabled(true);
        };

    }
}
