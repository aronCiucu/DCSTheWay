package main.DCSconnection;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;

import org.json.JSONObject;

public class PortListenerThread implements Runnable {
    private static DatagramSocket socket;
    private static String latitude;
    private static String longitude;
    private static String elevation;
    private static String modelName;
    private static Double x;
    private static Double z;
    private static Double selfX;
    private static Double selfZ;

    @Override
    public void run() {
        try {
            socket = new DatagramSocket(42069);
            byte[] buffer = new byte[65508];

            while (true) {
                DatagramPacket packet = new DatagramPacket(buffer, buffer.length);
                socket.receive(packet);
                String data = new String(packet.getData());
                synchronized (this) {
                    JSONObject jsonObject = new JSONObject(data);
                    modelName = jsonObject.getString("model");
                    latitude = jsonObject.getJSONObject("coords").getString("lat");
                    longitude = jsonObject.getJSONObject("coords").getString("long");
                    elevation = jsonObject.getString("elev");
                    // avoid crashing if the export script is of older version which does not provide x/y
                    if (jsonObject.has("self"))
                    {
                        x = jsonObject.getJSONObject("coords").getDouble("x");
                        z = jsonObject.getJSONObject("coords").getDouble("z");
                        selfX = jsonObject.getJSONObject("self").getDouble("x");
                        selfZ = jsonObject.getJSONObject("self").getDouble("z");
                    }
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (socket != null) {
                socket.close();
            }
        }
    }

    public static String getLatitude() {
        return latitude;
    }

    public static String getLongitude() {
        return longitude;
    }

    public static String getElevation() {
        return elevation;
    }

    public static synchronized String getPlaneModel() {
        return modelName;
    }
    
    public static Double getX() {
        return x;
    }

    public static Double getZ() {
        return z;
    }    

    public static Double getSelfX() {
        return selfX;
    }    
        
    public static Double getSelfZ() {
        return selfZ;
    }    
}
