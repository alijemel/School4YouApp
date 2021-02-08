package group4.school4you.Objects;

//representiert status eines feldes im stundenplan, view bedeutet man kann
// nur sehen zb bei studenten und eltern , edit bedeutet es gibt ein
// appointment und create bedeutet es ist frei und das sekretariat kann da
// was planen.
public enum FieldStatus {
    UNAVAILABLE, CREATE, EDIT, VIEW, ERROR
}
