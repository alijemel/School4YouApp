package group4.school4you.Objects;


/**
 * This enum represents the status of a field in the course planer. View means it is only allowed to have a look
 * at this field, edit means there is already an appointment which can be edited and create means the field is free
 * and the secretary can create an appointment there.
 */
public enum FieldStatus {
    UNAVAILABLE, CREATE, EDIT, VIEW, ERROR
}
