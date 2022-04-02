package main.DCSconnection;

import java.io.IOException;
import java.math.BigDecimal;
import java.net.DatagramPacket;
import java.net.DatagramSocket;

import org.json.JSONObject;

public class PortListenerThread implements Runnable {
    private static DatagramSocket socket;
    private static String latitude;
    private static String longitude;
    private static String elevation;
    private static String modelName;
    private static BigDecimal x;
    private static BigDecimal z;
    private static BigDecimal selfX;
    private static BigDecimal selfZ;

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
                        x = jsonObject.getJSONObject("coords").getBigDecimal("x");
                        z = jsonObject.getJSONObject("coords").getBigDecimal("z");
                        selfX = jsonObject.getJSONObject("self").getBigDecimal("x");
                        selfZ = jsonObject.getJSONObject("self").getBigDecimal("z");
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

    public static synchronized String getLatitude() {
        return latitude;
    }

    public static synchronized String getLongitude() {
        return longitude;
    }

    public static synchronized String getElevation() {
        return elevation;
    }

    public static synchronized String getPlaneModel() {
        return modelName;
    }
    
    public static synchronized BigDecimal getX() {
        return x;
    }

    public static synchronized BigDecimal getZ() {
        return z;
    }    

    public static synchronized BigDecimal getSelfX() {
        return selfX;
    }    
        
    public static synchronized BigDecimal getSelfZ() {
        return selfZ;
    }    
}
