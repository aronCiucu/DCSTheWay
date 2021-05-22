package main.UI;

import java.awt.*;

public class Crosshair {
    private final Window w;

    public Crosshair() {
        this.w=new Window(null){
            @Override
            public void paint(Graphics g)
            {
                int width = getWidth();
                int height = getHeight();
                g.setColor(Color.MAGENTA);

                g.fillOval(width/2, height/2, 10, 10);
            }
            @Override
            public void update(Graphics g)
            {
                paint(g);
            }
        };

        w.setAlwaysOnTop(true);
        w.setBounds(w.getGraphicsConfiguration().getBounds());
        w.setBackground(new Color(0, true));
    }

    public void show(){
        w.setVisible(true);
    }

    public void hide(){
        w.setVisible(false);
    }
}
