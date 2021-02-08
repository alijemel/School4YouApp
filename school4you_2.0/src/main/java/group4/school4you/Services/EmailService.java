package group4.school4you.Services;

import org.springframework.mail.SimpleMailMessage;

public interface EmailService {

    public void sendEmail(SimpleMailMessage email);
}
