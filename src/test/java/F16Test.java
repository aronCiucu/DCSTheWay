import main.Waypoints.PlanesCommands.F16;
import main.models.DMMCoordinate;
import main.models.Hemisphere;
import main.models.Point;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;


public class F16Test {
    @Test
    void shouldReturnF16CoordinateWhenGivenDCSPoint(){
        //given
        List<Point> dcsPoints = List.of(
                new Point("37.25046487617", "115.80890238447", "1357.7307128906", Hemisphere.NORTH, Hemisphere.WEST)
        );

        //when
        List<Point> f16Points = F16.getCoords(dcsPoints);

        //then
        List<Point> expectedPoints = List.of(
                new Point("3715028", "11548534", "4456", Hemisphere.NORTH, Hemisphere.WEST)
        );
        assertEquals(f16Points, expectedPoints);
    }
}
