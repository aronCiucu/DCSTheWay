package main.DCSconnection;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.SocketException;

import main.models.Coordinate;
import org.json.JSONObject;

public class PortListenerThread implements Runnable {
    private static DatagramSocket socket;
    private static Coordinate coordinate;
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
                synchronized(this) {
                    JSONObject jsonObject = new JSONObject(data);
                    modelName = jsonObject.getString("model");
                    coordinate = new Coordinate(
                            jsonObject.getJSONObject("coords").getString("lat"),
                            jsonObject.getJSONObject("coords").getString("long")
                    );
                }
            }
        } catch (SocketException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (socket != null) {
                socket.close();
            }
        }
    }

    public static Coordinate getCoordinate() {
        return coordinate;
    }

    public static synchronized String getPlaneModel() {
        return modelName;
    }
}
