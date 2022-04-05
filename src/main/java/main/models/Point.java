package main.models;

import java.math.BigDecimal;
import java.util.Objects;

public class Point {
    private final String latitude;
    private final String longitude;
    private final String elevation;
    private final Hemisphere latitudeHemisphere;
    private final Hemisphere longitudeHemisphere;
    private final BigDecimal x;
    private final BigDecimal z;

    public Point(String latitude, String longitude, String elevation, Hemisphere latitudeHemisphere, Hemisphere longitudeHemisphere) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.elevation = elevation;
        this.latitudeHemisphere = latitudeHemisphere;
        this.longitudeHemisphere = longitudeHemisphere;
        this.x = null;
        this.z = null;
    }

    public Point(String latitude, String longitude, String elevation, Hemisphere latitudeHemisphere, Hemisphere longitudeHemisphere, BigDecimal x, BigDecimal z) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.elevation = elevation;
        this.latitudeHemisphere = latitudeHemisphere;
        this.longitudeHemisphere = longitudeHemisphere;
        this.x = x;
        this.z = z;
    }
    
    
    public String getLatitude() {
        return latitude;
    }

    public String getLongitude() {
        return longitude;
    }

    public String getElevation() {
        return elevation;
    }

    public Hemisphere getLatitudeHemisphere() {
        return latitudeHemisphere;
    }

    public Hemisphere getLongitudeHemisphere() {
        return longitudeHemisphere;
    }

    public BigDecimal getX() {
        return x;
    }
    
    public BigDecimal getZ() {
        return z;
    }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Point point = (Point) o;
        return latitude.equals(point.latitude) && longitude.equals(point.longitude) && elevation.equals(point.elevation) && latitudeHemisphere == point.latitudeHemisphere && longitudeHemisphere == point.longitudeHemisphere;
    }

    @Override
    public int hashCode() {
        return Objects.hash(latitude, longitude, elevation, latitudeHemisphere, longitudeHemisphere);
    }

    @Override
    public String toString() {
        return "Point{" +
                "latitude='" + latitude + '\'' +
                ", longitude='" + longitude + '\'' +
                ", elevation='" + elevation + '\'' +
                ", latitudeHemisphere=" + latitudeHemisphere +
                ", longitudeHemisphere=" + longitudeHemisphere +
                ", x=" + x +
                ", z=" + z +
                '}';
    }
}
