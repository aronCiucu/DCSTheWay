import main.Utils.CoordinateUtils;
import main.models.DMSCoordinate;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class CoordinateTest {
    @Test
    void shouldConvertDecimalToDMS(){
        //given
        BigDecimal decimalCoord = new BigDecimal("42.360123");

        //when
        DMSCoordinate dmsCoord = CoordinateUtils.decimalToDMS(decimalCoord);

        //then
        assertEquals(dmsCoord.getDegrees(), 42);
        assertEquals(dmsCoord.getMinutes(), 21);
        assertEquals(dmsCoord.getSeconds(), 36);
    }
}
