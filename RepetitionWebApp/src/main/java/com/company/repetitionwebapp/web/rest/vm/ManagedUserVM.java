package com.company.repetitionwebapp.web.rest.vm;

import com.company.repetitionwebapp.service.dto.UserDTO;
import javax.validation.constraints.Size;

/**
 * View Model extending the UserDTO, which is meant to be used in the user management UI.
 */
public class ManagedUserVM extends UserDTO {
    public static final int PASSWORD_MIN_LENGTH = 4;

    public static final int PASSWORD_MAX_LENGTH = 100;

    @Size(min = PASSWORD_MIN_LENGTH, max = PASSWORD_MAX_LENGTH)
    private String password;

    private boolean isStudent;

    private Set<String> subject;

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

    public void setIsStudent(boolean isStudent){
        this.isStudent = isStudent;
    }

    public boolean getItStudent(){
        return isStudent;
    }

    public void setDegree(String degree){
        this.degree = degree;
    }

    public String getDegree(){
        return degree;
    }

    public void setBirthdate(Date birthdate){
        this.birthdate = birthdate;
    }

    public Date getBirthdate(){
        return degree;
    }

    public Set<String> getSubject() {
        return subject;
    }

    public void setSubject(Set<String> subject) {
        this.subject = subject;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ManagedUserVM{" + super.toString() + "} ";
    }
}
