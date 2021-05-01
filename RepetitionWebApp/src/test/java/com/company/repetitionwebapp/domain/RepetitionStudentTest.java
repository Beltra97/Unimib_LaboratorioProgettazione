package com.company.repetitionwebapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.company.repetitionwebapp.web.rest.TestUtil;

public class RepetitionStudentTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RepetitionStudent.class);
        RepetitionStudent repetitionStudent1 = new RepetitionStudent();
        repetitionStudent1.setId(1L);
        RepetitionStudent repetitionStudent2 = new RepetitionStudent();
        repetitionStudent2.setId(repetitionStudent1.getId());
        assertThat(repetitionStudent1).isEqualTo(repetitionStudent2);
        repetitionStudent2.setId(2L);
        assertThat(repetitionStudent1).isNotEqualTo(repetitionStudent2);
        repetitionStudent1.setId(null);
        assertThat(repetitionStudent1).isNotEqualTo(repetitionStudent2);
    }
}
