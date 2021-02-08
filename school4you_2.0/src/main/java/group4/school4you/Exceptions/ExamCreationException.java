package group4.school4you.Exceptions;

import org.apache.tomcat.websocket.server.WsHttpUpgradeHandler;

public class ExamCreationException extends RuntimeException {

    public ExamCreationException (String error) {
        super(error);
    }
}
