import main.Waypoints.PlanesCommands.A10CII;
import main.Waypoints.PlanesCommands.F16;
import main.models.Hemisphere;
import main.models.Point;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;


public class A10Test {
    @Test
    void shouldReturnA10CoordinateWhenGivenDCSPoint(){
//        Point{latitude='42.183497367618', longitude='42.473207155172', elevation='45.021884918213', latitudeHemisphere=NORTH, longitudeHemisphere=EAST}
//Point{latitude='4211010', longitude='04228392', elevation='148', latitudeHemisphere=NORTH, longitudeHemisphere=EAST}

//Point{latitude='13.623442649642', longitude='144.86221158987', elevation='159.00015258789', latitudeHemisphere=NORTH, longitudeHemisphere=EAST}
//Point{latitude='1337407', longitude='14451733', elevation='522', latitudeHemisphere=NORTH, longitudeHemisphere=EAST}

//Point{latitude='37.246455634035', longitude='115.81345551727', elevation='1359.2989501953', latitudeHemisphere=NORTH, longitudeHemisphere=WEST}
//Point{latitude='3714787', longitude='11548807', elevation='4459', latitudeHemisphere=NORTH, longitudeHemisphere=WEST}

        //given
        List<Point> dcsPoints = List.of(
                new Point("37.25046487617", "115.80890238447", "1357.7307128906", Hemisphere.NORTH, Hemisphere.WEST)
        );

        //when
        List<Point> a10Points = A10CII.getCoords(dcsPoints);

        //then
        List<Point> expectedPoints = List.of(
                new Point("3715028", "11548534", "4454", Hemisphere.NORTH, Hemisphere.WEST)
        );
        assertEquals(a10Points, expectedPoints);
    }
}
