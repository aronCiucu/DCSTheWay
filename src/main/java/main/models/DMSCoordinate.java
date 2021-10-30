package main.models;

public class DMSCoordinate {
    private final int degrees;
    private final int minutes;
    private final int seconds;

    public DMSCoordinate(int degrees, int minutes, int seconds) {
        this.degrees = degrees;
        this.minutes = minutes;
        this.seconds = seconds;
    }

    public int getDegrees() {
        return degrees;
    }

    public int getMinutes() {
        return minutes;
    }

    public int getSeconds() {
        return seconds;
    }
}
