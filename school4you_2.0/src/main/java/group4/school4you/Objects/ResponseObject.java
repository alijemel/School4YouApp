package group4.school4you.Objects;

public class ResponseObject {

    private Object object;
    private String message;

    public ResponseObject(Object object, String message) {
        this.object = object;
        this.message = message;
    }

    public Object getObject() {
        return object;
    }

    public void setObject(Object object) {
        this.object = object;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return "ResponseObject{" +
                "object=" + object +
                ", message='" + message + '\'' +
                '}';
    }
}
