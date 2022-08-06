package main.models;

import java.util.Objects;

public class Point {
    private String latitude;
    private String longitude;
    private String elevation;
    private Hemisphere latitudeHemisphere;
    private Hemisphere longitudeHemisphere;
    private String waypointType = "WP";
    private String waypointTypeIdentification = "";
    private String waypointTypeFreeText = "";

    public Point(){
        this("0", "0", "0", Hemisphere.NORTH, Hemisphere.EAST, "WP", "", "");
    }
    public Point(String lat, String lng, String elev, Hemisphere latHemisphere, Hemisphere lngHemisphere) {
        this(lat, lng, elev, latHemisphere, lngHemisphere, "WP", "", "");
    } 
    public Point(String lat, String lng, String elev, Hemisphere latHemisphere, Hemisphere lngHemisphere, String wpType, String wpIdent, String wpFreeText) {
        latitude = lat;
        longitude = lng;
        elevation = elev;
        latitudeHemisphere = latHemisphere;
        longitudeHemisphere = lngHemisphere;
        waypointType = wpType;
        waypointTypeIdentification = wpIdent;
        waypointTypeFreeText = wpFreeText;
    }
   
    public String getLatitude() {
        return latitude;
    }
    public void setLatitude(String value) {
        latitude = value;
    }
    public String getLongitude() {
        return longitude;
    }
    public void setLongitude(String value) {
        longitude = value;
    }
    public String getElevation() {
        return elevation;
    }
    public void setElevation(String value) {
        elevation = value;
    }
    public Hemisphere getLatitudeHemisphere() {
        return latitudeHemisphere;
    }
    public void setLatitudeHemisphere(Hemisphere value) {
        latitudeHemisphere = value;
    }
    public Hemisphere getLongitudeHemisphere() {
        return longitudeHemisphere;
    }
    public void setLongitudeHemisphere(Hemisphere value) {
        longitudeHemisphere = value;
    }
    public String getWayPointType() {
        return waypointType;
    }
    public void setWaypointType(String value) {
        waypointType = value;
    }
    public String getWayPointTypeIdentification() {
        return waypointTypeIdentification;
    }
    public void setWaypointTypeIdentification(String value) {
        waypointTypeIdentification = value;
    }
    public String getWayPointTypeFreeText() {
        return waypointTypeFreeText;
    }
    public void setWaypointTypeFreeText(String value) {
        waypointTypeFreeText = value;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Point point = (Point) o;
        return latitude.equals(point.latitude) && longitude.equals(point.longitude) && elevation.equals(point.elevation) && latitudeHemisphere == point.latitudeHemisphere && longitudeHemisphere == point.longitudeHemisphere && waypointType == point.waypointType && waypointTypeIdentification == point.waypointTypeIdentification && waypointTypeFreeText == point.waypointTypeFreeText;
    }

    @Override
    public int hashCode() {
        return Objects.hash(latitude, longitude, elevation, latitudeHemisphere, longitudeHemisphere, waypointType, waypointTypeIdentification, waypointTypeFreeText);
    }

    @Override
    public String toString() {
        return "Point{" +
                "latitude='" + latitude + '\'' +
                ", longitude='" + longitude + '\'' +
                ", elevation='" + elevation + '\'' +
                ", latitudeHemisphere=" + latitudeHemisphere +
                ", longitudeHemisphere=" + longitudeHemisphere +
                ", waypointType=" + waypointType +
                ", waypointTypeIdentification=" + waypointTypeIdentification +
                ", waypointTypeFreeText=" + waypointTypeFreeText +
                '}';
    }
}
