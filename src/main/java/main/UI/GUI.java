package main.UI;

import com.formdev.flatlaf.FlatDarkLaf;
import main.Waypoints.WaypointManager;

import javax.swing.*;
import javax.swing.border.EmptyBorder;
import java.awt.*;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;

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
        FlatDarkLaf.setup();
        crosshair = new Crosshair();
        gui = new JPanel(new GridLayout(0, 1, 10, 10));
        gui.setBorder(new EmptyBorder(10, 10, 10, 10));
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
            transferredState();
        });

        selectPointButton.addActionListener(e -> {
            if(WaypointManager.saveWaypointSuccessful()){
                refreshWaypointCount();
                populatedSelectionState();
            } else {
                error("No connection to DCS detected.");
                standbyState();
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
        frame.setResizable(false);
        Dimension dim = Toolkit.getDefaultToolkit().getScreenSize();
        frame.setLocation(0, dim.height-frame.getHeight());
        loadIcon();
        frame.setVisible(true);
    }

    public static void warning(String text){
        JDialog dialog = new JDialog(frame, "Heads up!", true);
        JButton continueButton = new JButton("Continue");
        continueButton.addActionListener(e -> dialog.dispose());
        JButton[] option = {continueButton};
        JOptionPane optionPane = new JOptionPane(text, JOptionPane.WARNING_MESSAGE, JOptionPane.YES_NO_OPTION, null, option, option[0]);

        Point framePoint = frame.getLocation();
        dialog.setLocation((int) framePoint.getX()+frame.getWidth(), (int)framePoint.getY());
        dialog.setContentPane(optionPane);
        dialog.setDefaultCloseOperation(JDialog.DISPOSE_ON_CLOSE);
        dialog.setResizable(false);
        dialog.setFocusableWindowState(false);
        dialog.pack();
        dialog.setVisible(true);
    }

    public static void error(String text){
        JDialog dialog = new JDialog(frame, "Error", true);
        JButton continueButton = new JButton("OK");
        continueButton.addActionListener(e -> dialog.dispose());
        JButton[] option = {continueButton};
        JOptionPane optionPane = new JOptionPane(text, JOptionPane.ERROR_MESSAGE, JOptionPane.YES_NO_OPTION, null, option, option[0]);

        Point framePoint = frame.getLocation();
        dialog.setLocation((int) framePoint.getX()+frame.getWidth(), (int)framePoint.getY());
        dialog.setContentPane(optionPane);
        dialog.setDefaultCloseOperation(JDialog.DISPOSE_ON_CLOSE);
        dialog.setResizable(false);
        dialog.setFocusableWindowState(false);
        dialog.pack();
        dialog.setVisible(true);
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

    private static void transferredState(){
        crosshair.hide();
        selectPointButton.setEnabled(false);
        clearPointsButton.setEnabled(true);
        beginSelectionButton.setEnabled(false);
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

    private static void loadIcon() {
        String iconPath = "resources/TheWayIcon40.png";
        File iconFile = new File(iconPath);
        if (iconFile.exists()) {
            ImageIcon icon = new ImageIcon(iconPath);
            frame.setIconImage(icon.getImage());
        }
        else {
            InputStream inputStream = Thread.currentThread().getContextClassLoader().getResourceAsStream(iconPath);
            try {    
                ImageIcon icon = new ImageIcon(inputStream.readAllBytes());
                frame.setIconImage(icon.getImage());
            } 
            catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
