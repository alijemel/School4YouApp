package group4.school4you.Services;

import group4.school4you.Entities.*;
import group4.school4you.Objects.FieldStatus;
import group4.school4you.Objects.Subject;
import group4.school4you.Objects.TeacherDto;
import group4.school4you.Repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
/**
 * This service provides some helping methods for the appointment resource.
 */
public class AppointmentService {

    @Autowired
    AppointmentRepository appointmentRepository;
    @Autowired
    SchoolClassRepository schoolClassRepository;
    @Autowired
    RecurrenceRepository recurrenceRepository;
    @Autowired
    UserJpaRepository userRepository;

    /**
     * This method checks if a passed appointment is available or not.
     * @param appointment The appointment which is to be checked.
     * @return true: if the appointment is available, false: if it's not available
     */
    public boolean checkAvailability(Appointment appointment) {
        List<Appointment> unavailableList = appointmentRepository.findAllByTeacherIdAndDateAndSlotAndClassIdNot(
                appointment.getTeacherId(),appointment.getDate(),
                appointment.getSlot(),appointment.getClassId());
        return !unavailableList.contains(appointment);
    }

    /**
     * This method returns if a certain field of a weekly planner is already occupied. It uses the help method
     * "checkAvailability()".
     * @param appointment the appointment of which the field should be checked.
     * @return UNAVAILABLE: if the field is already occupied, EDIT: if there is some appointment which can be edited
     *         CREATE: if it is possible to create a new appointment in the field, ERROR: if an error occupies by
     *         editing a field
     */
    public FieldStatus getFieldStatus(Appointment appointment) {
        boolean available = checkAvailability(appointment);
        if (! available) {
            return FieldStatus.UNAVAILABLE;
        } else if (currentFieldIsSet(appointment)) {
            return FieldStatus.EDIT;
        } else if (! currentFieldIsSet(appointment)) {
            return FieldStatus.CREATE;
        }
        else return FieldStatus.ERROR;
    }

    /**
     * This method checks if a certain field is set with an appointment or not.
     * @param appointment The appointment field which is to be checked.
     * @return true: if the current field is set, false: if it is not set yet
     */
    private boolean currentFieldIsSet(Appointment appointment) {
        return appointmentRepository.existsByTeacherIdAndDateAndSlotAndClassId(
                appointment.getTeacherId(),appointment.getDate(),
                appointment.getSlot(),appointment.getClassId()
        );
    }

    /**
     * This method is used by a teacher to create a new appointment.
     * @param newAppointment The new appointment which is created by the teacher.
     * @return The saved repository with the new appointment in it.
     */
    public Appointment createAppointment(Appointment newAppointment) {
        User currentTeacher = userRepository
                .findById(newAppointment.getTeacherId()).get();
        newAppointment.setTeacherName(currentTeacher.getFirstName()+ " " + currentTeacher.getLastName());

        return appointmentRepository.save(newAppointment);
    }

    /**
     * This method finds an appointment in the repository by searching it by it's id.
     * @param id The id of the appointment which is wanted to be found in the database.
     * @return The appointment which is associated to the id.
     */
    public Appointment findAppointmentById(Long id) {
        return appointmentRepository.findById(id).get();
    }

    /**
     * This method is for editing an existing appointment. It takes a id and after finding the associated appointment
     * from the database it edits the subject from the appointment.
     * @param id The id of the appointment whose subject is going to be edited.
     * @param newSubjectString The String which contains the new subject of the appointment.
     * @return The appointment with an edited subject.
     */
    public Appointment editAppointment(Long id, String newSubjectString) {
        Appointment toEdit = findAppointmentById(id);
        //TRY CONVERTING SUBJECTSTRING TO ENUM IF NOT POSSIBLE
        // EXCEPTION WRONG ARMUMENTS
        //TRY CATCH
        Subject newSubject = Subject.valueOf(newSubjectString);
        toEdit.setSubject(newSubject);
        return toEdit;
    }

    /**
     * This method deletes an appointment from the database by searching it with its id.
     * @param id The id of the appointment which is to be deleted from the database.
     * @return A response entitiy if the delete was successfully or not.
     */
    public ResponseEntity<String> deleteAppointmentById(Long id) {
        if (appointmentRepository.existsById(id)) {
            appointmentRepository.deleteById(id);
            return new ResponseEntity<>("Deleted Appointment with id :  "
            + id , HttpStatus.OK);
        } else {
            //NO SUCH ELEMENT EXCEPTION try catch
            return new ResponseEntity<>("No such element",
                    HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * This method is searching for a certain appointment. It is searched by the arguments classID, teacherID,
     * date and a certain slot.
     * @param classId The class id of the class which the appointment is assigned to.
     * @param teacherId The teacher id of the teacher which the appointment is assigned to.
     * @param date A certain date which the appointment contains.
     * @param slot A certain slot where the appointment is set.
     * @return The appointment if it is found by all the arguments.
     */
    public Appointment findAppointmentBy(Long classId, Long teacherId,
                                         LocalDate date, String slot) {
        return appointmentRepository
                .findByClassIdAndTeacherIdAndDateAndSlot(classId, teacherId,
                        date,slot
                );
    }




    // FOR STUNDEN PLAN BY CLASS

    /**
     * This method gets all teachers which are teaching a certain class.
     * @param currentClass the class whose teachers are searched.
     * @return a list of all teachers of a certain class.
     */
    public List<Long> getTeacherIds(SchoolClass currentClass) {
        List<Long> teacherIds = new ArrayList<>();
        if(! currentClass.getTeachers().isEmpty()) {
            for (Teacher teacher : currentClass.getTeachers()) {
                teacherIds.add(teacher.getId());
            }
        }
        return teacherIds;
    }

    /**
     * This method is looking for available teachers for a certain appointment.
     * @param appointment The appointment where we want all available teachers.
     * @return A list of all available teachers for the appointment.
     */
    public List<TeacherDto> findAvailableTeachers(Appointment appointment){
        SchoolClass currentClass =
                schoolClassRepository.findById(appointment.getClassId()).get();
        List<Teacher> classTeachers = currentClass.getTeachers();
        List<Long> classTeacherIds = getTeacherIds(currentClass);

        //we get appointments where teachers of this class are booked in
        // other class
        List<Appointment> unavailableAppointments = appointmentRepository.
                findAllByDateAndSlotAndClassIdNotAndTeacherIdIn(
                        appointment.getDate(), appointment.getSlot(),
                        appointment.getClassId(),classTeacherIds
                );
        List<Long> unavailableTeacherIds = new ArrayList<>();

        if(!unavailableAppointments.isEmpty()) {
            for (Appointment unavailable : unavailableAppointments) {
                unavailableTeacherIds.add(unavailable.getTeacherId());
            }
        }

            List<TeacherDto> availableClassTeachers = new ArrayList<>();

        if (! classTeachers.isEmpty()) {
            for (Teacher teacher : classTeachers) {
                if (! unavailableTeacherIds.contains(teacher.getId())) {
                    availableClassTeachers.add(new TeacherDto(teacher.getId()
                            ,teacher.getFirstName(), teacher.getLastName()));
                }
            }
        }

        //WE RETURN THE CLASS TEACHERS THAT DO NOT HAVE APPOINTMENTS IN OTHER
        // CLASSES AT THAT TIME
        return availableClassTeachers;
    }

    /**
     * This method is searching for a certain appointment. It is searched by the arguments classID, appointmentDate,
     * a certain slot.
     * @param classId The classID of the class where the appointment is assigned to.
     * @param appointmentDate The date of the appointment.
     * @param slot the slot where the appointment is set.
     * @return The appointment with all the matching arguments.
     */
    public Appointment findAppointmentBy(Long classId, LocalDate appointmentDate,
                               String slot) {
        return appointmentRepository.findByClassIdAndDateAndSlot(classId,
                appointmentDate,slot);
    }

    /**
     * This method checks if at a given class, a given date and a given slot an appointment exists.
     * @param classId The class to check.
     * @param date The date to check.
     * @param slot The slot to check.
     * @return true: if there exists an appointment, false: if there is no such appointment
     */
    public boolean isSetAppointment(Long classId, LocalDate date, String slot) {
        return appointmentRepository
                .existsByClassIdAndDateAndSlot(classId,date,slot);
    }


    /**
     * To get the field status of a given class, date and slot when we plan for a certain class and not a teacher.
     * @param classId The class id from the class we are planning for.
     * @param date The date we want to check.
     * @param slot The slot we want to check.
     * @return EDIT: if the field is ready to edit, UNAVAILABLE: if there is no teacher available to teach this
     * course to this time, CREATE: if the field is ready to create a new appointment
     */
    public FieldStatus getFieldStatus(Long classId, LocalDate date, String slot) {
        boolean isSet = isSetAppointment(classId, date, slot);

        if (isSet) {
            return FieldStatus.EDIT;
        } else if (findAvailableTeachers(new Appointment(classId,date,slot)).isEmpty()) {
            return FieldStatus.UNAVAILABLE;
        } else return FieldStatus.CREATE;

    }

    /**
     * This method is for creating a reccuring appointment in the scheduler.
     * @param appointment The appointment we want to reccure.
     * @param recurrence The recurrence we want the appointment to have.
     * @return The created appointment with a certain recurrence.
     */
    public Appointment createRecurrentAppointment(Appointment appointment,
                                                  Recurrence recurrence) {
        //only one week
        if (recurrence.getWeeks() == 0) {
            return createAppointment(appointment);
        }
        else {
            Appointment toReturn = new Appointment();
            Recurrence appointmentRecurrence =
                    recurrenceRepository.save(recurrence);
            long weeks = recurrence.getWeeks();

            for (long i =0; i < weeks ; i++) {
                Long classId = appointment.getClassId();
                Long teacherId = appointment.getTeacherId();
                LocalDate date = appointment.getDate();
                String slot = appointment.getSlot();

                if(!appointmentRepository.existsByClassIdAndDateAndSlot(classId, date.plusWeeks(i), slot)
                        && !appointmentRepository.existsByTeacherIdAndDateAndSlot(teacherId, date.plusWeeks(i), slot)) {
                    Appointment currentAppointment =
                            appointmentRepository.save(new Appointment(classId,
                                    teacherId,
                                    date.plusWeeks(i),
                                    slot,appointment.getSubject()));
                    currentAppointment.setRecurrenceId(appointmentRecurrence.getRecurrenceId());
                    User currentTeacher = userRepository
                            .findById(currentAppointment.getTeacherId()).get();
                    currentAppointment.setTeacherName(currentTeacher.getFirstName()+ " " + currentTeacher.getLastName() );
                    if (i == 0) {
                        toReturn = currentAppointment;
                    }

                }


            }
            return toReturn;
        }

    }

    /**
     * This method deletes all future recurrences with a certain id.
     * @param recurrenceId The id of the recurrence we want to delete.
     * @return A response entitiy in form of a string if the deleting was successfully or not.
     */
    public ResponseEntity<String> deleteAllFutureRecurrences(Long recurrenceId) {

        //Only will delete the dates in the future
        LocalDate deletionBegin = LocalDate.now();
        appointmentRepository.deleteAllByRecurrenceIdAndDateIsGreaterThanEqual(recurrenceId
                ,deletionBegin);
        //Delete the recurrences from the recurrence table
        recurrenceRepository.deleteById(recurrenceId);

        return new ResponseEntity<String>("Deleted all future recurrences",
                HttpStatus.OK);
    }

    /**
     * This method is searching for a certain appointment. It is searched by the arguments teacherID,
     * appointmentDate and a certain slot.
     * @param teacherId The teacher where the appointment is assigned to.
     * @param appointmentDate The date of the appointment.
     * @param slot The slot at where we are searching the appointment.
     * @return The appointment with matching arguments from the database.
     */
    public Appointment
    findAppointmentByTeacherIdAndDateAndSlot(Long teacherId,
                                             LocalDate appointmentDate, String slot) {
        return appointmentRepository.findByTeacherIdAndDateAndSlot(teacherId,
                appointmentDate, slot);
    }
}
