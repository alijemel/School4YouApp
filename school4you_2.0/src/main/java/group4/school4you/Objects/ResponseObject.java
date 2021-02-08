package group4.school4you.Objects;

// Representiert die reponse vom backend zu einer anfrage von frontent.
// enthält ein ojekt was irgendwas sein kann und ein message zum beispiel
// succes oder invalid oder so
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
