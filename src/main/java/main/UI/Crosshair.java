package main.UI;

import java.awt.*;

public class Crosshair {
    private final Window w;
    private static Rectangle uiAreaAdjustment = new Rectangle(0,0,0,0);

    public Crosshair(int screenDeviceIndex) {
        GraphicsConfiguration gcF10 = null;
        GraphicsEnvironment ge = GraphicsEnvironment.
                getLocalGraphicsEnvironment();
        GraphicsDevice[] gs =
                ge.getScreenDevices();
        if( screenDeviceIndex <= gs.length-1){

            GraphicsConfiguration[] gc =
                gs[screenDeviceIndex].getConfigurations();
                gcF10 = gc[0];                
        }
        this.w=new Window(null, gcF10){
            @Override
            public void paint(Graphics g)
            {
                int width = uiAreaAdjustment.width == 0 ? getWidth()-uiAreaAdjustment.x:uiAreaAdjustment.width;
                int height = uiAreaAdjustment.height == 0 ? getHeight()-uiAreaAdjustment.y:uiAreaAdjustment.height;
                g.setColor(Color.MAGENTA);
                g.drawLine(width/2 -10 + uiAreaAdjustment.x,height/2 + uiAreaAdjustment.y,width/2 - 2 + uiAreaAdjustment.x,height/2 + uiAreaAdjustment.y);
                g.drawLine(width/2 +10 + uiAreaAdjustment.x,height/2 + uiAreaAdjustment.y,width/2 + 2 + uiAreaAdjustment.x,height/2 + uiAreaAdjustment.y);
                g.drawLine(width/2 + uiAreaAdjustment.x,height/2 -10 + uiAreaAdjustment.y,width/2 + uiAreaAdjustment.x,height/2 - 2 + uiAreaAdjustment.y);
                g.drawLine(width/2 + uiAreaAdjustment.x ,height/2 +10 + uiAreaAdjustment.y,width/2 + uiAreaAdjustment.x,height/2 + 2 + uiAreaAdjustment.y);
                g.drawOval(width/2-5 + uiAreaAdjustment.x, height/2-5 + uiAreaAdjustment.y, 10, 10);
                g.drawOval(width/2-6 + uiAreaAdjustment.x, height/2-6 + uiAreaAdjustment.y, 12, 12);
                if(!uiAreaAdjustment.equals(new Rectangle(0,0,0,0))){
                    g.drawRect(uiAreaAdjustment.x,uiAreaAdjustment.y,width,height);
                }
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
    
    public void SetUiAreaAdjustment(Rectangle rect){
        uiAreaAdjustment = rect;
    }
}
