package group4.school4you.Entities;

import group4.school4you.Objects.Role;
import group4.school4you.Objects.Subject;
import group4.school4you.Repositories.*;
import group4.school4you.Services.AppointmentService;
import group4.school4you.Services.ExamService;
import group4.school4you.Services.FamilyService;
import group4.school4you.Services.PresenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class MyRunner implements CommandLineRunner {

//    private static final Logger logger = (Logger) LoggerFactory.getLogger(MyRunner.class);

    @Autowired
    private UserJpaRepository userRepository;
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private TeacherRepository teacherRepository;
    @Autowired
    private SecretaryRepository secretaryRepository;
    @Autowired
    private ParentRepository parentRepository;
    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private InboxRepository inboxRepository;
    @Autowired
    private AppointmentRepository appointmentRepository;
    @Autowired
    AppointmentService appointmentService;
    @Autowired
    SchoolClassRepository schoolClassRepository;
    @Autowired
    PresenceService presenceService;
    @Autowired
    PresenceRepository presenceRepository;
    @Autowired
    ExamRepository examRepository;
    @Autowired
    ExamService examService;
    @Autowired
    FamilyRepository familyRepository;
    @Autowired
    FamilyService familyService;

    @Override
    public void run(String... userRepository) throws Exception {

        if (!inboxRepository.existsByRole(Role.SECRETARY)) {
            inboxRepository.save(new Inbox(Role.SECRETARY));
        }
        if (!inboxRepository.existsByRole(Role.TEACHER)) {
            inboxRepository.save(new Inbox(Role.TEACHER));
        }

        if (!inboxRepository.existsByRole(Role.STUDENT)) {
            inboxRepository.save(new Inbox(Role.STUDENT));
        }
        if (!inboxRepository.existsByRole(Role.PARENT)) {
            inboxRepository.save(new Inbox(Role.PARENT));
        }



        //presenceRepository.deleteAll();

//        appointmentRepository.deleteAll();

//        System.out.println(presenceService.findPresenceByAppointmentIdAndStudentId(
//                new Long("5"), new Long("6"))
//        );
//




//        System.out.println(appointmentService.findAvailableTeachers(
//                appointmentRepository.findById(new Long("92")).get()
//        ));

//        SchoolClass testClass = schoolClassRepository.findById(new Long("17")).get();
//        List<Long> teacherIds = appointmentService.getTeacherIds(testClass);
//        System.out.println(teacherIds);







//        Exam testExam = new Exam(new Long(17),
//                new Long(7), LocalDate.now(),"12:00 _ 14:00",Subject.CHEMIE );
//        examRepository.save(testExam);
//
//        Appointment appointment1 = new Appointment(new Long(17),
//                new Long(7), LocalDate.now(),"14:00 _ 16:00", Subject.CHEMIE );
//        appointmentRepository.save(appointment1);
//
//        Exam exam2 = new Exam(new Long(21),
//                new Long(7), LocalDate.now(),"10:00 _ 12:00", Subject.CHEMIE );
//        examRepository.save(exam2);
//
//        Exam exam1 = new Exam(new Long(17),
//                new Long(7), LocalDate.now(),"14:00 _ 16:00", Subject.CHEMIE );
//        System.out.println("Exam creation test : " + examService.createExam(exam1));

//        schoolClassRepository.deleteById(new Long("2042"));
//        schoolClassRepository.deleteById(new Long("2181"));










        System.out.println(examService.findAllByClassId(new Long("17")));
        System.out.println(examService.getUnavailableByTeacherAndClass(new Long("7"),new Long("17")));


        System.out.println( "status is : " +
                appointmentService.getFieldStatus(
                        new Appointment(new Long(21),
                                new Long(7), LocalDate.now(),"12:00 _ 14:00" )
                ) );


       List<Appointment> testUnavailable =
                appointmentRepository.findAllByTeacherIdAndDateAndSlotAndClassIdNot(new Long(7),
                        LocalDate.now(),"12:00 _ 14:00",new Long("36"));

        System.out.println(testUnavailable.size());

        System.out.println(appointmentService.checkAvailability(new Appointment(new Long(17),
                new Long(7),LocalDate.now(),"08:00 _ 10:00")));

        System.out.println(familyService.findAvailableChildren());






//        userRepository.findAll().forEach((city) -> {
//            logger.info("{}", city);
//        });
    }
}
