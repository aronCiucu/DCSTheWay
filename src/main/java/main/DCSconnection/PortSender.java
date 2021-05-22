package main.DCSconnection;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.*;

public class PortSender {
    public static void send(String toSend){
        try {
            Socket socket = new Socket("127.0.0.1", 42070);
            PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
            out.println(toSend);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
