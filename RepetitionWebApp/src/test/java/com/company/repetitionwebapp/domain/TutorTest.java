package com.company.repetitionwebapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.company.repetitionwebapp.web.rest.TestUtil;

public class TutorTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Tutor.class);
        Tutor tutor1 = new Tutor();
        tutor1.setId(1L);
        Tutor tutor2 = new Tutor();
        tutor2.setId(tutor1.getId());
        assertThat(tutor1).isEqualTo(tutor2);
        tutor2.setId(2L);
        assertThat(tutor1).isNotEqualTo(tutor2);
        tutor1.setId(null);
        assertThat(tutor1).isNotEqualTo(tutor2);
    }
}
