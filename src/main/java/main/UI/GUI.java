package main.UI;

import main.UI.ActionListeners.ClearPoints;
import main.UI.ActionListeners.EndSelection;
import main.UI.ActionListeners.SelectPoint;
import main.UI.ActionListeners.ShowCrosshair;
import main.models.Coordinate;

import javax.swing.*;
import javax.swing.border.EmptyBorder;
import java.awt.*;
import java.util.ArrayList;

public class GUI {
    static private final JPanel gui;
    static private final JFrame frame;
    static private final Crosshair crosshair;
    static private final JTextArea waypointCountTextArea;
    static private int noOfWaypoints = 0;
    static private ArrayList<Coordinate> waypoints = new ArrayList<>();
    static private JButton selectPointButton;
    static private JButton transferToDCSButton;
    static private JButton clearPointsButton;

    static {
        crosshair = new Crosshair();

        gui = new JPanel(new GridLayout(0, 1, 10, 10));
        gui.setBorder(new EmptyBorder(20, 20, 20, 20));
        var showCrosshairButton = new JButton("Start selecting on map");
        showCrosshairButton.addActionListener(new ShowCrosshair(crosshair));
        waypointCountTextArea = new JTextArea(1, 10);
        transferToDCSButton = new JButton("Begin transfer to DCS");
        transferToDCSButton.addActionListener(new EndSelection(crosshair));
        transferToDCSButton.setEnabled(false);
        selectPointButton = new JButton("Select point");
        selectPointButton.addActionListener(new SelectPoint());
        selectPointButton.setEnabled(false);
        clearPointsButton = new JButton("Discard points");
        clearPointsButton.addActionListener(new ClearPoints(crosshair));
        clearPointsButton.setEnabled(false);
        gui.add(showCrosshairButton);
        gui.add(waypointCountTextArea);
        gui.add(selectPointButton);
        gui.add(clearPointsButton);
        gui.add(transferToDCSButton);


        frame = new JFrame("DCS The Way");
        frame.add(gui);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setAlwaysOnTop(true);
        frame.setFocusableWindowState(false);
        frame.pack();
    }

    public static void show(){
        frame.setVisible(true);
    }


    public static boolean saveCoord(Coordinate coordinate) {
        if(coordinate != null){
            waypoints.add(coordinate);
            noOfWaypoints++;
            updateTextArea(noOfWaypoints+" selected for transfer.");
            return true;
        } else {
            return false;
        }

    }

    public static void clearCoords(){
        waypoints.clear();
        noOfWaypoints = 0;
        updateTextArea(noOfWaypoints+" selected for transfer.");
    }

    public static void updateTextArea(String text){
        waypointCountTextArea.setText(text);
    }

    public static ArrayList<Coordinate> getWaypoints() {
        return waypoints;
    }

    public static JButton getSelectPointButton() {
        return selectPointButton;
    }

    public static JButton getTransferToDCSButton() {
        return transferToDCSButton;
    }

    public static JButton getClearPointsButton() {
        return clearPointsButton;
    }
}
