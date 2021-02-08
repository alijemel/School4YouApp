package group4.school4you.Resources;

import group4.school4you.Entities.Appointment;
import group4.school4you.Entities.Recurrence;
import group4.school4you.Entities.Teacher;
import group4.school4you.Objects.FieldStatus;
import group4.school4you.Objects.TeacherDto;
import group4.school4you.Repositories.AppointmentRepository;
import group4.school4you.Repositories.RecurrenceRepository;
import group4.school4you.Services.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class AppointmentResource {

    @Autowired
    AppointmentService appointmentService;
    @Autowired
    RecurrenceRepository recurrenceRepository;


    /**
     * Creates a new appointment.
     *
     * @param newAppointment appointment to be created.
     * @return the created appointment.
     */
    @PostMapping(path = "appointment/create")
    public Appointment createAppointment(@RequestBody Appointment
                                                 newAppointment) {
        return appointmentService.createAppointment(newAppointment);
    }

    /**
     * Gets an appointment by its Id.
     *
     * @param id Id of the appointment.
     * @return Appointment corresponding to this Id.
     */
    @GetMapping(path = "/appointment/{id}")
    public Appointment getAppointmentById(@PathVariable Long id) {
        return appointmentService.findAppointmentById(id);
    }

    /**
     * Identifies and gets an appointment.
     *
     * @param classId   Id of the school-class.
     * @param teacherId Id of the teachers who makes this appointment.
     * @param date      date of the appointment.
     * @param slot      time slot of the appointment.
     * @return the appointment.
     */
    @GetMapping(path = "/appointment/{classId}/{teacherId}/{date}/{slot}")
    public Appointment
    ByClassIsAndTeacherIdAndDateAndSlot(@PathVariable Long classId,
                                        @PathVariable Long teacherId,
                                        @PathVariable String date,
                                        @PathVariable String slot) {
        LocalDate appointmentDate = LocalDate.parse(date);
        return appointmentService.findAppointmentBy(classId, teacherId,
                appointmentDate, slot);
    }

    /**
     * Identifies appointment by its id and edits the subject.
     *
     * @param id               Id of the appointment to modify.
     * @param newSubjectString new subject to set to the appointment.
     * @return the appointment after being edited.
     */
    @Transactional
    @PutMapping(path = "/appointment/{id}/edit/{newSubjectString}")
    public Appointment editAppointmentSubjectById(@PathVariable Long id,
                                                  @PathVariable String newSubjectString) {
        return appointmentService.editAppointment(id, newSubjectString);
    }

    //RETURN TRUE IF APPOINTMENT IS AVAILABLE TO SET FOR THE TEACHER IN THAT
    // CLASS OR EXISTS IN THAT SPECIFIC CLASS
    //WILL RETURN FALSE IF THE APPOINTMENT IS BOOKED BY ANOTHER CLASS

    /**
     * Checks if an appointment can be created.
     *
     * @param appointment appointment to be created.
     * @return true if it can be created, false if not.
     */
    @PutMapping(path = "/appointment/availability")
    public boolean checkAvailability(@RequestBody Appointment appointment) {
        System.out.println(appointment);

        return appointmentService.checkAvailability(appointment);
    }

    //gets the status of the represented field in the timetable in Teacher
    // Perspective

    /**
     * Gets the field-status in the representation of timetable of a teacher.
     *
     * @param appointment appointment represented by a timetable field.
     * @return field-status of the timetable field that represents the
     * appointment.
     */
    @PutMapping(path = ("/appointment/fieldStatus"))
    public FieldStatus getFieldStatusForTeacher(@RequestBody Appointment appointment) {
        return appointmentService.getFieldStatus(appointment);
    }


    // Class Perspective timetable *********************


    //we call this when we know the appointment Id => when edit or delete
//    @GetMapping (path = "/appointment/{appointmentId}/availableTeachers")
//    public List<Teacher> getAvailableTeachers(@PathVariable Long appointmentId) {
//        Appointment currentAppointment =
//                appointmentService.findAppointmentById(appointmentId);
//        return appointmentService.findAvailableTeachers(currentAppointment);
//    }

    //We call this when we create

    /**
     * Gets an appointment that takes place for a specific class at a
     * specific time.
     *
     * @param classId Id of the class corresponding to the appointment.
     * @param date    date of the appointment.
     * @param slot    time-slot of the appointment.
     * @return the appointment.
     */
    @GetMapping(path = "/appointment/{classId}/{date}/{slot}")
    public Appointment getAppointmentByClassIdANndDateAndSlot(@PathVariable Long classId,
                                                              @PathVariable String date,
                                                              @PathVariable String slot) {
        LocalDate appointmentDate = LocalDate.parse(date);
        return appointmentService.findAppointmentBy(classId,
                appointmentDate, slot);
    }

    /**
     * Gets available teachers that could take an appointment for a class at
     * a specific date ant time.
     *
     * @param classId Id of the class.
     * @param date    date of the appointment.
     * @param slot    time-slot of the appointment.
     * @return List of available teachers.
     */
    @GetMapping(path = "/appointment/{classId}/{date}/{slot" +
            "}/availableTeachers")
    public List<TeacherDto> getAvailableTeachers(@PathVariable Long classId,
                                                 @PathVariable String date,
                                                 @PathVariable String slot) {
        LocalDate appointmentDate = LocalDate.parse(date);
        Appointment queryObject = new Appointment(classId, appointmentDate,
                slot);
        return appointmentService.findAvailableTeachers(queryObject);
    }

    //FOR PERSPECTIVE schoolCLASS

    /**
     * Gets field-status for the class timetable perspective.
     *
     * @param classId
     * @param date
     * @param slot
     * @return
     */
    @GetMapping(path = "/appointment/{classId}/{date}/{slot}/fieldStatus")
    public FieldStatus getFieldStatus(@PathVariable Long classId,
                                      @PathVariable String date,
                                      @PathVariable String slot) {
        LocalDate appointmentDate = LocalDate.parse(date);

        return appointmentService.getFieldStatus(classId, appointmentDate, slot);

    }

    //Create a recurrent appointment (can be non recurrent if weeks =0)

    /**
     * Creates an appointment ans assigns a recurrence to it if it should be
     * recurrent.
     *
     * @param appointment appointment to create.
     * @param weeks       number of weeks to repeat the appointment.
     * @return the created appointment.
     */
    @Transactional
    @PostMapping(path = "/appointment/recurrent/create/{weeks}")
    public Appointment createRecurrentAppointment(@RequestBody Appointment appointment,
                                                  @PathVariable Long weeks) {
        Recurrence recurrence = new Recurrence(weeks, appointment.getDate());

        return appointmentService.createRecurrentAppointment(appointment,
                recurrence);
    }

    /**
     * Edits an appointment. When editing an appointment if it is recurrent we
     * will set the recurrence id to null so it is not grouped with the other
     * recurrences anymore.
     *
     * @param appointmentId    Id of the appointment to edit.
     * @param newTeacherId     Id of teacher of the appointment.
     * @param newSubjectString String representation of the subject.
     * @param newTeacherName   name of the teacher.
     * @return the appointment after editing.
     */
    @Transactional
    @PutMapping(path = "/appointment/{appointmentId}/edit" +
            "/{newTeacherId}/{newTeacherName}/{newSubjectString}")
    public Appointment editRecurrentAppointment(@PathVariable Long appointmentId,
                                                @PathVariable Long newTeacherId,
                                                @PathVariable String newSubjectString,
                                                @PathVariable String newTeacherName
    ) {
        Appointment edited = appointmentService.editAppointment(appointmentId
                , newSubjectString);
        edited.setTeacherId(newTeacherId);
        edited.setTeacherName(newTeacherName);
        edited.setRecurrenceId(null);
        return edited;
    }


    /**
     * Deletes an appointment by Id.
     * if it is recurrent, recurrence id is not null so we will
     * delete all the future recurrences. If it is not recurrent we only
     * delete this one.
     *
     * @param id
     * @return
     */
    @Transactional
    @DeleteMapping(path = "/appointment/{id}/delete")
    public ResponseEntity<String> deleteRecurrentAppointmentById(@PathVariable Long id) {
        Appointment toDelete = appointmentService.findAppointmentById(id);
        if (toDelete.getRecurrenceId() == null) {
            return appointmentService.deleteAppointmentById(toDelete.getId());
        } else
            return appointmentService.deleteAllFutureRecurrences(toDelete.getRecurrenceId());
    }

    // fuer teacher stundenplan

    @GetMapping(path = "/appointment/teacherTimetable/{teacherId}/{date" +
            "}/{slot}")
    public Appointment
    getAppointmentByTeacherIdAndDateAndSlot(@PathVariable Long teacherId,
                                            @PathVariable String date,
                                            @PathVariable String slot
    ) {
        LocalDate appointmentDate = LocalDate.parse(date);
        return appointmentService
                .findAppointmentByTeacherIdAndDateAndSlot(teacherId,
                        appointmentDate, slot);
    }

}
