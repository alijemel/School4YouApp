package group4.school4you.Objects;

// Dto representation von einem teacher weil ein teacher objekt sehr groß ist
// als reponse zu http anfragen. Es ist einfach nur ein teacher aber
// zusammesgefasst zu seiner nötigen felder
public class TeacherDto {

    private Long id;
    private String firstName;
    private String lastName;

    public TeacherDto(Long id, String firstName, String lastName) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
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

}
