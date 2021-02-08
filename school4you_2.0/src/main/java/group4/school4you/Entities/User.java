package group4.school4you.Entities;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Objects;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class User {
    @Id
    @GeneratedValue
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    @JsonIgnore
    private String password;
    private String role;
    //DATES USING DATE TIME API
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate creationDate = LocalDate.now();
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthDate;
    private boolean approved = false;
    private String resetToken;

    public String getResetToken() {
        return resetToken;
    }

    public void setResetToken(String resetToken) {
        this.resetToken = resetToken;
    }

    public User(){}

    public User(String firstName, String lastName, String email,String password
            , String role, LocalDate birthDate) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.role = role;
        this.birthDate = birthDate;
        this.password = password;
    }


    @JsonIgnore
    public String getPassword() {
        return password;
    }


    @JsonProperty
    public void setPassword(String password) {
        this.password = password;
    }

    public User(String firstName, String role) {
        super();
        this.firstName = firstName;
        this.role=role;
    }

    public Long getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getRole() {
        return role;
    }

    public boolean getApproved(){ return approved;}

    public void setApproved(boolean isApproved){
        this.approved = isApproved;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }



    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return id.equals(user.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", role='" + role + '\'' +
                ", creationDate=" + creationDate +
                ", birthDate=" + birthDate +
                ", approved=" + approved +
                '}';
    }
}