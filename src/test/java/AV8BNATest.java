import main.Waypoints.PlanesCommands.AV8BNA;
import main.models.Hemisphere;
import main.models.Point;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class AV8BNATest {
    @Test
    void shouldReturnAV8BNACoordinateWhenGivenDCSPoint(){
        //given
        List<Point> dcsPoints = List.of(
                new Point("37.25046487617", "115.80890238447", "1357.7307128906", Hemisphere.NORTH, Hemisphere.WEST)
        );

        //when
        List<Point> av8bnaPoints = AV8BNA.getCoords(dcsPoints);

        //then
        List<Point> expectedPoints = List.of(
                new Point("371501", "1154832", "4454", Hemisphere.NORTH, Hemisphere.WEST)
        );
        assertEquals(av8bnaPoints, expectedPoints);
    }
}
