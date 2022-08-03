package main;

import main.DCSconnection.PortListenerThread;
import main.UI.GUI;
import org.apache.commons.cli.*;
import java.awt.*;

public class Main {
     public static void main(String[] args) throws ParseException  {
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

        GUI.show();
        new Thread(new PortListenerThread()).start();
    }

    private static Options SetCLIArguments(String[] args){
        Options options = new Options();
        //options.addOption("d","display",false,"Number of the display device used for the F10 screen");
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
        options.addOption("?","help",false,"Show Help");
        return options;
    }

    private static void ProcessCLIArgs(CommandLine cmd){
        Rectangle uiAreaAdjustment = new Rectangle();

        if(cmd != null && cmd.hasOption("d")){
            String properties = cmd.getOptionValue("d");
            int displayDevice = Integer.parseInt(properties);
            displayDevice = displayDevice > 0 ? (displayDevice < 10 ? displayDevice : 1) :1; // clamp the display device number
            GUI.SetScreenDeviceIndex(displayDevice);
        } else {
            GUI.SetScreenDeviceIndex(1);
        }

        if(cmd != null && cmd.hasOption("x")){
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
        
        if(cmd != null && cmd.hasOption("y")){
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
        
        if(cmd != null && cmd.hasOption("w")){
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
        
        if(cmd != null && cmd.hasOption("h")){
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
