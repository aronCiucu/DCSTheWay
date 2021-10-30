package main.Utils;

import main.models.*;

import java.math.BigDecimal;
import java.math.BigInteger;

public class CoordinateUtils {
    public static DMMCoordinate decimalToDMM(BigDecimal decimalCoordinate){
        int degrees = Integer.parseInt(decimalCoordinate.toBigInteger().toString());
        BigDecimal minutes = decimalCoordinate.remainder(BigDecimal.ONE).multiply(new BigDecimal(60));
        return new DMMCoordinate(degrees, minutes);
    }

    public static DMSCoordinate decimalToDMS(BigDecimal decimalCoordinate){
        int degrees = Integer.parseInt(decimalCoordinate.toBigInteger().toString());
        BigDecimal minutesDecimal = decimalCoordinate.remainder(BigDecimal.ONE).multiply(new BigDecimal(60));
        int minutes = Integer.parseInt(minutesDecimal.toBigInteger().toString());
        BigDecimal secondsDecimal = minutesDecimal.remainder(BigDecimal.ONE).multiply(new BigDecimal(60));
        int seconds = Integer.parseInt(secondsDecimal.toBigInteger().toString());
        return new DMSCoordinate(degrees, minutes, seconds);
    }
}
