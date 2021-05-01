package com.company.repetitionwebapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.company.repetitionwebapp.web.rest.TestUtil;

public class RepetitionTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Repetition.class);
        Repetition repetition1 = new Repetition();
        repetition1.setId(1L);
        Repetition repetition2 = new Repetition();
        repetition2.setId(repetition1.getId());
        assertThat(repetition1).isEqualTo(repetition2);
        repetition2.setId(2L);
        assertThat(repetition1).isNotEqualTo(repetition2);
        repetition1.setId(null);
        assertThat(repetition1).isNotEqualTo(repetition2);
    }
}
