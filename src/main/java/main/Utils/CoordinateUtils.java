package main.Utils;

import main.models.Coordinate;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.text.DecimalFormat;
import java.util.ArrayList;

public class CoordinateUtils {
    public static ArrayList<Coordinate> convertDDMMmmmCoords(ArrayList<Coordinate> decimalCoords){
        ArrayList<Coordinate> finalCoords = new ArrayList<>();
        for(Coordinate c: decimalCoords) {
            BigDecimal DdLat = new BigDecimal(c.getLatitude());
            BigDecimal DdLong = new BigDecimal(c.getLongitude());
            BigInteger DLat = new BigDecimal(c.getLatitude()).toBigInteger();
            BigInteger DLong = new BigDecimal(c.getLongitude()).toBigInteger();
            BigDecimal dLat = DdLat.subtract(new BigDecimal(DLat.toString()));
            BigDecimal dLong = DdLong.subtract(new BigDecimal(DLong.toString()));
            BigDecimal MmLat = dLat.multiply(new BigDecimal(60));
            BigDecimal MmLong = dLong.multiply(new BigDecimal(60));

            DecimalFormat df = new DecimalFormat("00.000");
            String latitude = DLat+"."+df.format(MmLat);
            String longitude = DLong+"."+df.format(MmLong);
            //convert elevation to ft
            BigDecimal elevM = new BigDecimal(c.getElevation());
            BigInteger elevFt = elevM.multiply(new BigDecimal("3.281")).toBigInteger();

            finalCoords.add(new Coordinate(latitude, longitude, elevFt.toString()));
        }
        return finalCoords;
    }

    public static ArrayList<Coordinate> convertDDMMmmCoords(ArrayList<Coordinate> decimalCoords){
        ArrayList<Coordinate> finalCoords = new ArrayList<>();
        for(Coordinate c: decimalCoords) {
            BigDecimal DdLat = new BigDecimal(c.getLatitude());
            BigDecimal DdLong = new BigDecimal(c.getLongitude());
            BigInteger DLat = new BigDecimal(c.getLatitude()).toBigInteger();
            BigInteger DLong = new BigDecimal(c.getLongitude()).toBigInteger();
            BigDecimal dLat = DdLat.subtract(new BigDecimal(DLat.toString()));
            BigDecimal dLong = DdLong.subtract(new BigDecimal(DLong.toString()));
            BigDecimal MmLat = dLat.multiply(new BigDecimal(60));
            BigDecimal MmLong = dLong.multiply(new BigDecimal(60));

            DecimalFormat df = new DecimalFormat("00.00");
            String latitude = DLat+"."+df.format(MmLat);
            String longitude = DLong+"."+df.format(MmLong);
            //convert elevation to ft
            BigDecimal elevM = new BigDecimal(c.getElevation());
            BigInteger elevFt = elevM.multiply(new BigDecimal("3.281")).toBigInteger();

            finalCoords.add(new Coordinate(latitude, longitude, elevFt.toString()));
        }
        return finalCoords;
    }

    public static ArrayList<Coordinate> convertDDMMmmmmCoords(ArrayList<Coordinate> decimalCoords){
        ArrayList<Coordinate> finalCoords = new ArrayList<>();
        for(Coordinate c: decimalCoords) {
            BigDecimal DdLat = new BigDecimal(c.getLatitude());
            BigDecimal DdLong = new BigDecimal(c.getLongitude());
            BigInteger DLat = new BigDecimal(c.getLatitude()).toBigInteger();
            BigInteger DLong = new BigDecimal(c.getLongitude()).toBigInteger();
            BigDecimal dLat = DdLat.subtract(new BigDecimal(DLat.toString()));
            BigDecimal dLong = DdLong.subtract(new BigDecimal(DLong.toString()));
            BigDecimal MmLat = dLat.multiply(new BigDecimal(60));
            BigDecimal MmLong = dLong.multiply(new BigDecimal(60));

            DecimalFormat df = new DecimalFormat("00.0000");
            String latitude = DLat+"."+df.format(MmLat);
            String longitude = DLong+"."+df.format(MmLong);
            //convert elevation to ft
            BigDecimal elevM = new BigDecimal(c.getElevation());
            BigInteger elevFt = elevM.multiply(new BigDecimal("3.281")).toBigInteger();

            finalCoords.add(new Coordinate(latitude, longitude, elevFt.toString()));
        }
        return finalCoords;
    }
}
