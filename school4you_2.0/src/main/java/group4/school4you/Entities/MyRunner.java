package group4.school4you.Entities;

import group4.school4you.Objects.Role;
import group4.school4you.Repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class MyRunner implements CommandLineRunner {

    @Autowired
    private InboxRepository inboxRepository;

    @Override
    public void run(String... userRepository) throws Exception {

        //Create inboxes for each role at first startup only
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

    }
}
