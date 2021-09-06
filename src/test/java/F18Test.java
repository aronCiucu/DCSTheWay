import main.Waypoints.PlanesCommands.F18;
import main.models.Hemisphere;
import main.models.Point;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;


public class F18Test {
    @Test
    void shouldReturnF18CoordinateWhenGivenDCSPoint(){
        //given
        List<Point> dcsPoints = List.of(
                new Point("42.183494347447", "42.473202920741", "45.021690368652", Hemisphere.NORTH, Hemisphere.EAST),
                new Point("37.249870638054", "115.81474936457", "1359.2165527344", Hemisphere.NORTH, Hemisphere.WEST)
        );

        //when
        List<Point> f18Points = F18.getCoords(dcsPoints);

        //then
        List<Point> expectedPoints = List.of(
                new Point("42110097", "42283922", "148", Hemisphere.NORTH, Hemisphere.EAST),
                new Point("37149922", "115488850", "4459", Hemisphere.NORTH, Hemisphere.WEST)
        );
        assertEquals(f18Points, expectedPoints);
    }
}
