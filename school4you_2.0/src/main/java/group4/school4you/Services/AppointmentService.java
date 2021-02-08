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
public class AppointmentService {

    @Autowired
    AppointmentRepository appointmentRepository;
    @Autowired
    SchoolClassRepository schoolClassRepository;
    @Autowired
    RecurrenceRepository recurrenceRepository;
    @Autowired
    UserJpaRepository userRepository;

    public boolean checkAvailability(Appointment appointment) {
        List<Appointment> unavailableList = appointmentRepository.findAllByTeacherIdAndDateAndSlotAndClassIdNot(
                appointment.getTeacherId(),appointment.getDate(),
                appointment.getSlot(),appointment.getClassId());
        return !unavailableList.contains(appointment);
    }

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

    private boolean currentFieldIsSet(Appointment appointment) {
        return appointmentRepository.existsByTeacherIdAndDateAndSlotAndClassId(
                appointment.getTeacherId(),appointment.getDate(),
                appointment.getSlot(),appointment.getClassId()
        );
    }

    public Appointment createAppointment(Appointment newAppointment) {
        User currentTeacher = userRepository
                .findById(newAppointment.getTeacherId()).get();
        newAppointment.setTeacherName(currentTeacher.getFirstName()+ " " + currentTeacher.getLastName());

        return appointmentRepository.save(newAppointment);
    }

    public Appointment findAppointmentById(Long id) {
        return appointmentRepository.findById(id).get();
    }


    public Appointment editAppointment(Long id, String newSubjectString) {
        Appointment toEdit = findAppointmentById(id);
        //TRY CONVERTING SUBJECTSTRING TO ENUM IF NOT POSSIBLE
        // EXCEPTION WRONG ARMUMENTS
        //TRY CATCH
        Subject newSubject = Subject.valueOf(newSubjectString);
        toEdit.setSubject(newSubject);
        return toEdit;
    }

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

    public Appointment findAppointmentBy(Long classId, Long teacherId,
                                         LocalDate date, String slot) {
        return appointmentRepository
                .findByClassIdAndTeacherIdAndDateAndSlot(classId, teacherId,
                        date,slot
                );
    }




    // FOR STUNDEN PLAN BY CLASS

    public List<Long> getTeacherIds(SchoolClass currentClass) {
        List<Long> teacherIds = new ArrayList<>();
        if(! currentClass.getTeachers().isEmpty()) {
            for (Teacher teacher : currentClass.getTeachers()) {
                teacherIds.add(teacher.getId());
            }
        }
        return teacherIds;
    }

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

    public Appointment findAppointmentBy(Long classId, LocalDate appointmentDate,
                               String slot) {
        return appointmentRepository.findByClassIdAndDateAndSlot(classId,
                appointmentDate,slot);
    }

    public boolean isSetAppointment(Long classId, LocalDate date, String slot) {
        return appointmentRepository
                .existsByClassIdAndDateAndSlot(classId,date,slot);
    }


    //FOR THE CASE WHERE WE PLAN FOR THE CLASS NOT THE TEACHER
    public FieldStatus getFieldStatus(Long classId, LocalDate date, String slot) {
        boolean isSet = isSetAppointment(classId, date, slot);

        if (isSet) {
            return FieldStatus.EDIT;
        } else if (findAvailableTeachers(new Appointment(classId,date,slot)).isEmpty()) {
            //no teacher in this class are available to do this course in
            // this time
            return FieldStatus.UNAVAILABLE;
        } else return FieldStatus.CREATE;

    }

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

    public Appointment
    findAppointmentByTeacherIdAndDateAndSlot(Long teacherId,
                                             LocalDate appointmentDate, String slot) {
        return appointmentRepository.findByTeacherIdAndDateAndSlot(teacherId,
                appointmentDate, slot);
    }
}
