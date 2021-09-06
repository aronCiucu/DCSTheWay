package main.models;

import java.math.BigDecimal;

public class DMMCoordinate {
    private final int degrees;
    private final BigDecimal minutes;

    public DMMCoordinate(int degrees, BigDecimal minutes) {
        this.degrees = degrees;
        this.minutes = minutes;
    }

    public int getDegrees() {
        return degrees;
    }

    public BigDecimal getMinutes() {
        return minutes;
    }
}
