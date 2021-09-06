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
}
