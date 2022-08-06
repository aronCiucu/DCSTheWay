package main.Waypoints;

import java.util.LinkedHashMap;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.Path;

public class KeyCommands {
    ///
    /// Uses DCS interface definitions from the https://github.com/HeliosVirtualCockpit/HeliosInterfaces repo which is added to this
    /// repo as a submodule.  This class builds a table of command codes to be used for a particular vehicle.  
    /// Adding additional vehicles will require changes to the
    /// packaging of the project to include the new interface (see assembly.xml)
    ///
    public static LinkedHashMap<String,String> Build(String vehicle, String device){ return Build(vehicle, new String[][] {{device,""}});}
    public static LinkedHashMap<String,String> Build(String vehicle, String[] device){ return Build(vehicle, new String[][] {{device[0],device[1]}});}
    public static LinkedHashMap<String,String> Build(String vehicle, String[][] devices){
        LinkedHashMap<String,String> keyboard = new LinkedHashMap<String,String>();
        try{
            Path path = Paths.get("resources", "DCSInterfaces",vehicle + ".hif.json");
            JSONObject jo = new JSONObject(Files.readString(path, StandardCharsets.UTF_8));
            JSONArray ja = (JSONArray) jo.get("functions");
            for(String[] device : devices){
                ja.forEach(o -> {
                    JSONObject jo1 = (JSONObject) o;
                    if(jo1.getString("device").contains(device[0]) && jo1.getString("name").contains(device[1])){
                        JSONArray buttons = (JSONArray) jo1.get("buttons");
                        keyboard.put(jo1.getString("name").substring(device[1].length()),buttons.getJSONObject(0).getString("pushId"));
                    }
                });
            }
        } catch (IOException ex){
            ex.printStackTrace();
        }
        // for(String key : keyboard.keySet()){
        //      System.out.printf("keyname: \"%s\" code: \"%s\"\n",key, keyboard.get(key));
        // }
        return keyboard;
    }   
}