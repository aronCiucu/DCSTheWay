package main;

import main.UI.GUI;
import main.Waypoints.WaypointManager;
import main.Waypoints.FileInteraction;

import org.apache.commons.cli.*;

import java.awt.*;
import java.nio.file.Paths;

public class CliArguments {

    public static void ProcessCommandLineArguments(String[] args) {
        Options options = SetCLIArguments(args);
        CommandLineParser parser = new DefaultParser();
        CommandLine cmd = null;
        try {
           cmd = parser.parse( options, args);
        }
        catch (ParseException exp) {
                System.err.println("Parsing failed.  Reason: " + exp.getMessage());
        }
        if(cmd != null && cmd.hasOption("?")){
            HelpFormatter fmt = new HelpFormatter();
            fmt.printHelp("Help", options);
            System.exit(0);
        }
        ProcessCLIArgs(cmd);
    }

    private static Options SetCLIArguments(String[] args){
        Options options = new Options();
        Option nodcsoutput = Option.builder("s")
        .longOpt("suppressdcsoutput")
        .argName("" )
        .required(false)
        .hasArg()
        .valueSeparator()
        .numberOfArgs(0)
        .desc("Used to stop waypoints being sent to DCS." )
        .build();
        options.addOption(nodcsoutput);        
        Option inputWayPointFileName = Option.builder("i")
        .longOpt("inputfilename")
        .argName("filename" )
        .required(false)
        .hasArg()
        .valueSeparator()
        .numberOfArgs(1)
        .desc("filename of the file containing saved waypoints." )
        .build();
        options.addOption(inputWayPointFileName);
        Option outputWayPointFileName = Option.builder("o")
        .longOpt("outputfilename")
        .argName("filename" )
        .required(false)
        .hasArg()
        .valueSeparator()
        .numberOfArgs(1)
        .desc("filename of the file which will contain the collected waypoints." )
        .build();
        options.addOption(outputWayPointFileName);
        Option displayNumberOption = Option.builder("d")
        .longOpt("displaynumber")
        .argName("displaynumber" )
        .required(false)
        .hasArg()
        .valueSeparator()
        .numberOfArgs(1)
        .desc("Number of the display device used for the F10 screen" )
        .build();
        options.addOption(displayNumberOption);
        Option widthOption = Option.builder("w")
        .longOpt("width")
        .argName("width")
        .required(false)
        .hasArg()
        .valueSeparator()
        .numberOfArgs(1)
        .desc("Width of the UI display area used for the F10 map" )
        .build();
        options.addOption(widthOption);
        Option heightOption = Option.builder("h")
        .longOpt("height")
        .argName("height")
        .required(false)
        .hasArg()
        .valueSeparator()
        .numberOfArgs(1)
        .desc("Height of the UI display area used for the F10 map" )
        .build();
        options.addOption(heightOption);
        Option leftOption = Option.builder("x")
        .longOpt("left")
        .argName("left")
        .required(false)
        .hasArg()
        .valueSeparator()
        .numberOfArgs(1)
        .desc("Left position of the start of the UI display area used for the F10 map" )
        .build();
        options.addOption(leftOption);
        Option topOption = Option.builder("y")
        .longOpt("top")
        .argName("top")
        .required(false)
        .hasArg()
        .valueSeparator()
        .numberOfArgs(1)
        .desc("Top position of the start of the UI display area used for the F10 map" )
        .build();
        options.addOption(topOption);
        Option windowPositionOption = Option.builder("c")
        .longOpt("cornerposition")
        .argName("TL | TR | BL | BR" )
        .required(false)
        .hasArg()
        .valueSeparator()
        .numberOfArgs(1)
        .desc("Corner position where the \"The Way\" window is placed.  <TopLeft | TopRight | BottomLeft | BottomRight>" )
        .build();
        options.addOption(windowPositionOption);
        options.addOption("?","help",false,"Show Help");
        return options;
    }

    private static void ProcessCLIArgs(CommandLine cmd){
        Rectangle uiAreaAdjustment = new Rectangle();

        if(cmd != null){
            if(cmd.hasOption("i")){
                FileInteraction.setReadWaypoints(Paths.get(cmd.getOptionValue("i")));
                WaypointManager.restoreWaypointsFromFile();
            }

            if(cmd.hasOption("o")){
                FileInteraction.setWriteWaypoints(Paths.get(cmd.getOptionValue("o")));
            }

            if(cmd.hasOption("s")){
                WaypointManager.setNoDcsOutput(true);
            }

            if(cmd.hasOption("c")){
                String windowPosition = cmd.getOptionValue("c").toUpperCase();
                switch(windowPosition){
                    case "TL":
                    case "TOPLEFT":
                        GUI.SetWindowPosition(3);
                    break;
                    case "BL":
                    case "BOTLEFT":
                    case "BOTTOMLEFT":
                        GUI.SetWindowPosition(0);
                    break;
                    case "TR":
                    case "TOPRIGHT":
                        GUI.SetWindowPosition(2);
                    break;
                    case "BR":
                    case "BOTRIGHT":
                    case "BOTTOMRIGHT":
                        GUI.SetWindowPosition(1);
                    break;
                }
            }

            if(cmd.hasOption("d")){
                String properties = cmd.getOptionValue("d");
                int displayDevice = Integer.parseInt(properties);
                displayDevice = displayDevice > 0 ? (displayDevice < 10 ? displayDevice : 1) :1; // clamp the display device number
                GUI.SetScreenDeviceIndex(displayDevice);
            } else {
                GUI.SetScreenDeviceIndex(1);
            }

            if(cmd.hasOption("x")){
                String properties = cmd.getOptionValue("x");
                try {
                    uiAreaAdjustment.x = Integer.parseInt(properties);
                }
                catch (NumberFormatException  exp) {
                    uiAreaAdjustment.x = 0;
                    System.err.println("Parsing failed.  Reason: " + exp.getMessage());
                }
            } else {
                uiAreaAdjustment.x = 0;
            }
            
            if(cmd.hasOption("y")){
                String properties = cmd.getOptionValue("y");
                try {
                    uiAreaAdjustment.y = Integer.parseInt(properties);
                }
                catch (NumberFormatException  exp) {
                    uiAreaAdjustment.y = 0;
                    System.err.println("Parsing failed.  Reason: " + exp.getMessage());
                }
            } else {
                uiAreaAdjustment.y = 0;
            }
            
            if(cmd.hasOption("w")){
                String properties = cmd.getOptionValue("w");
                try {
                    uiAreaAdjustment.width = Integer.parseInt(properties);
                }
                catch (NumberFormatException  exp) {
                    uiAreaAdjustment.width = 0;
                    System.err.println("Parsing failed.  Reason: " + exp.getMessage());
                }
            } else {
                uiAreaAdjustment.width = 0;
            }
            
            if(cmd.hasOption("h")){
                String properties = cmd.getOptionValue("h");
                try {
                    uiAreaAdjustment.height = Integer.parseInt(properties);
                }
                catch (NumberFormatException  exp) {
                    uiAreaAdjustment.height = 0;
                    System.err.println("Parsing failed.  Reason: " + exp.getMessage());
                }
            } else {
                uiAreaAdjustment.height = 0;
            }

            GUI.SetUiAreaAdjustment(uiAreaAdjustment);
        }
    }
   
}
