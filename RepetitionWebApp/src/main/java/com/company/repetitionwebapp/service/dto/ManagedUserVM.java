package com.company.repetitionwebapp.service.dto;

import java.util.ArrayList;
//import java.util.Set;
import java.util.Date;
import java.util.Set;
import javax.validation.constraints.Size;

// import com.company.repetitionwebapp.domain.Subject;

/**
 * View Model extending the UserDTO, which is meant to be used in the user management UI.
 */
public class ManagedUserVM extends UserDTO {
    public static final int PASSWORD_MIN_LENGTH = 4;

    public static final int PASSWORD_MAX_LENGTH = 100;

    @Size(min = PASSWORD_MIN_LENGTH, max = PASSWORD_MAX_LENGTH)
    private String password;

    private boolean isStudent;

    private ArrayList<Number> subject;

    // private String subject;

    private String degree;

    private Date birthdate;

    public ManagedUserVM() {
        // Empty constructor needed for Jackson.
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setIsStudent(boolean isStudent) {
        this.isStudent = isStudent;
    }

    public boolean getIsStudent() {
        return isStudent;
    }

    public void setDegree(String degree) {
        this.degree = degree;
    }

    public String getDegree() {
        return degree;
    }

    public void setBirthdate(Date birthdate) {
        this.birthdate = birthdate;
    }

    public Date getBirthdate() {
        return birthdate;
    }

    public ArrayList<Number> getSubject() {
        return subject;
    }

    // public String getSubject() {
    //     return subject;
    // }

    public void setSubject(ArrayList<Number> subject) {
        this.subject = subject;
    }

    // public void setSubject(String subject) {
    //     this.subject = subject;
    // }

    // prettier-ignore
    @Override
    public String toString() {
        return "ManagedUserVM{" + super.toString() + "} ";
    }
}
