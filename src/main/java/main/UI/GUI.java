package main.UI;

import main.Waypoints.WaypointManager;

import javax.swing.*;
import javax.swing.border.EmptyBorder;
import java.awt.*;

public class GUI {
    static private JPanel gui;
    static private JFrame frame;
    static private Crosshair crosshair;
    static private JTextArea textArea;
    static private JButton beginSelectionButton;
    static private JButton selectPointButton;
    static private JButton transferToDCSButton;
    static private JButton clearPointsButton;


    public static void show(){
        crosshair = new Crosshair();
        gui = new JPanel(new GridLayout(0, 1, 10, 10));
        gui.setBorder(new EmptyBorder(20, 20, 20, 20));
        beginSelectionButton = new JButton("Start selecting on map");
        textArea = new JTextArea(1, 10);
        transferToDCSButton = new JButton("Begin transfer to DCS");
        selectPointButton = new JButton("Select point");
        clearPointsButton = new JButton("Discard points");

        beginSelectionButton.addActionListener(e -> {
            emptySelectionState();
        });
        transferToDCSButton.addActionListener(e -> {
            WaypointManager.transfer();
        });

        selectPointButton.addActionListener(e -> {
            if(WaypointManager.saveWaypointSuccessful()){
                refreshWaypointCount();
                populatedSelectionState();
            } else {
                textArea.setText("No connection to DCS.");
            }
        });

        clearPointsButton.addActionListener(e -> {
            standbyState();
            WaypointManager.clearWaypoints();
            refreshWaypointCount();
        });

        gui.add(beginSelectionButton);
        gui.add(textArea);
        gui.add(selectPointButton);
        gui.add(clearPointsButton);
        gui.add(transferToDCSButton);

        standbyState();
        frame = new JFrame("The Way");
        frame.add(gui);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setAlwaysOnTop(true);
        frame.setFocusableWindowState(false);
        frame.pack();
        frame.setVisible(true);
    }

    private static void standbyState(){
        crosshair.hide();
        beginSelectionButton.setEnabled(true);
        clearPointsButton.setEnabled(false);
        transferToDCSButton.setEnabled(false);
        selectPointButton.setEnabled(false);
    }

    private static void emptySelectionState(){
        crosshair.show();
        beginSelectionButton.setEnabled(false);
        selectPointButton.setEnabled(true);
    }

    private static void populatedSelectionState(){
        clearPointsButton.setEnabled(true);
        transferToDCSButton.setEnabled(true);
    }

    private static void refreshWaypointCount(){
        int count = WaypointManager.getSelectedWaypointsCount();
        if (count>0){
            if (count==1){
                textArea.setText("1 waypoint selected");
            } else {
                textArea.setText(count+" waypoints selected");
            }
        } else {
            textArea.setText("No waypoints selected");
        }
    }
}
