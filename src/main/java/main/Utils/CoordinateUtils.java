package main.Utils;

import main.models.*;

import java.math.BigDecimal;

public class CoordinateUtils {
    public static DMMCoordinate decimalToDMM(BigDecimal decimalCoordinate){
        int degrees = Integer.parseInt(decimalCoordinate.toBigInteger().toString());
        BigDecimal minutes = decimalCoordinate.remainder(BigDecimal.ONE).multiply(new BigDecimal(60));
        return new DMMCoordinate(degrees, minutes);
    }
}
