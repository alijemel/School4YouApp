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



    @PostMapping (path = "appointment/create")
    public Appointment createAppointment(@RequestBody Appointment
                                                     newAppointment) {
        return appointmentService.createAppointment(newAppointment);
    }

    @GetMapping (path = "/appointment/{id}")
    public Appointment getAppointmentById(@PathVariable Long id) {
        return appointmentService.findAppointmentById(id);
    }

    @GetMapping (path = "/appointment/{classId}/{teacherId}/{date}/{slot}")
    public Appointment
    ByClassIsAndTeacherIdAndDateAndSlot(@PathVariable Long classId,
                                        @PathVariable Long teacherId,
                                        @PathVariable String date,
                                        @PathVariable String slot){
        LocalDate appointmentDate = LocalDate.parse(date);
        return appointmentService.findAppointmentBy(classId,teacherId,
                appointmentDate,slot);
    }

    @Transactional
    @PutMapping (path = "/appointment/{id}/edit/{newSubjectString}")
    public Appointment editAppointmentSubjectById(@PathVariable Long id,
                                                  @PathVariable String newSubjectString) {
        return appointmentService.editAppointment(id,newSubjectString);
    }

//    @DeleteMapping (path = "/appointment/{id}/delete")
//    public ResponseEntity<String> deleteAppointmentById(@PathVariable Long id) {
//        return appointmentService.deleteAppointmentById(id);
//    }

    //RETURN TRUE IF APPOINTMENT IS AVAILABLE TO SET FOR THE TEACHER IN THAT
    // CLASS OR EXISTS IN THAT SPECIFIC CLASS
    //WILL RETURN FALSE IF THE APPOINTMENT IS BOOKED BY ANOTHER CLASS
    @PutMapping(path = "/appointment/availability")
    public boolean checkAvailability(@RequestBody Appointment appointment) {
        System.out.println(appointment);

        return appointmentService.checkAvailability(appointment);
    }

    //gets the status of the represented field in the timetable in Teacher
    // Perspective
    @PutMapping (path = ("/appointment/fieldStatus"))
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
    @GetMapping (path = "/appointment/{classId}/{date}/{slot}")
    public Appointment getAppointmentByClassIdANndDateAndSlot(@PathVariable Long classId,
                                              @PathVariable String date,
                                              @PathVariable String slot) {
        LocalDate appointmentDate = LocalDate.parse(date);
        return appointmentService.findAppointmentBy(classId,
                appointmentDate,slot);
    }

    @GetMapping (path = "/appointment/{classId}/{date}/{slot" +
            "}/availableTeachers")
    public List<TeacherDto> getAvailableTeachers(@PathVariable Long classId,
                                                 @PathVariable String date,
                                                 @PathVariable String slot) {
        LocalDate appointmentDate = LocalDate.parse(date);
        Appointment queryObject = new Appointment(classId,appointmentDate,
                slot);
        return appointmentService.findAvailableTeachers(queryObject);
    }

    //FOR PERSPECTIVE schoolCLASS
    @GetMapping (path = "/appointment/{classId}/{date}/{slot}/fieldStatus")
    public FieldStatus getFieldStatus(@PathVariable Long classId,
                                      @PathVariable String date,
                                      @PathVariable String slot) {
        LocalDate appointmentDate = LocalDate.parse(date);

        return appointmentService.getFieldStatus(classId, appointmentDate, slot);

    }

    //Create a recurrent appointment (can be non recurrent if weeks =0)
    @Transactional
    @PostMapping (path = "/appointment/recurrent/create/{weeks}")
    public Appointment createRecurrentAppointment(@RequestBody Appointment appointment,
                                      @PathVariable Long weeks) {
        Recurrence recurrence = new Recurrence(weeks, appointment.getDate());

        return appointmentService.createRecurrentAppointment(appointment,
                recurrence);

    }

    //when editing an appointment if it is recurrent we will set the
    //recurrence id to null so it is not grouped with the other recurrences
    // anymore

    @Transactional
    @PutMapping (path = "/appointment/{appointmentId}/edit" +
            "/{newTeacherId}/{newTeacherName}/{newSubjectString}")
    public Appointment editRecurrentAppointment(@PathVariable Long appointmentId,
                                                @PathVariable Long newTeacherId,
                                                @PathVariable String newSubjectString,
                                                @PathVariable String newTeacherName
    ) {
        Appointment edited = appointmentService.editAppointment(appointmentId
                ,newSubjectString );
        edited.setTeacherId(newTeacherId);
        edited.setTeacherName(newTeacherName);
        edited.setRecurrenceId(null);
        return edited;
    }

    //Delete : if it is recurrent, recurrence id is not null so we will
    // delete all the future recurrences. If it is not recurrent we only
    // delete this one

    @Transactional
    @DeleteMapping (path = "/appointment/{id}/delete")
    public ResponseEntity<String> deleteRecurrentAppointmentById(@PathVariable Long id) {
        Appointment toDelete = appointmentService.findAppointmentById(id);
        if (toDelete.getRecurrenceId() == null) {
            return appointmentService.deleteAppointmentById(toDelete.getId());
        }
        else return appointmentService.deleteAllFutureRecurrences(toDelete.getRecurrenceId());
    }


    // fuer teacher stundenplan

    @GetMapping (path = "/appointment/teacherTimetable/{teacherId}/{date" +
            "}/{slot}")
    public Appointment
    getAppointmentByTeacherIdAndDateAndSlot(@PathVariable Long teacherId,
                                                               @PathVariable String date,
                                                               @PathVariable String slot
                                                               ) {
        LocalDate appointmentDate = LocalDate.parse(date);
        return appointmentService
                .findAppointmentByTeacherIdAndDateAndSlot(teacherId,
                        appointmentDate,slot);
    }




















}
