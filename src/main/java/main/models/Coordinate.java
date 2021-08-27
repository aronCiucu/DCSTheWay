package main.models;

public final class Coordinate {


    private final String latitude;
    private final String longitude;
    private final String elevation;

    public Coordinate(String latitude, String longitude, String elevation) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.elevation = elevation;
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

    @Override
    public String toString() {
        return "Coordinate{" +
                "latitude='" + latitude + '\'' +
                ", longitude='" + longitude + '\'' +
                ", elevation='" + elevation + '\'' +
                '}';
    }
}
