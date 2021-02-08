package group4.school4you.Entities;

import group4.school4you.Objects.Role;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@Entity
public class SchoolClassAnnouncement {

        @Id
        @GeneratedValue
        private Long id;

        private Long classId;
        private String creatorFirstName;
        private String creatorLastName;
        private String subject;
        @Lob
        @Column(length=2000)
        private String content;
        @DateTimeFormat(pattern = "yyyy-MM-dd")
        private LocalDate creationDate = LocalDate.now();

        public SchoolClassAnnouncement(){}

        public SchoolClassAnnouncement(Long classId, String creatorFirstName,
                                       String creatorLastName, String subject, String content) {
                this.classId = classId;
                this.creatorFirstName = creatorFirstName;
                this.creatorLastName = creatorLastName;
                this.subject = subject;
                this.content = content;
        }

        public Long getId() {
                return id;
        }

        public void setId(Long id) {
                this.id = id;
        }

        public Long getClassId() {
                return classId;
        }

        public void setClassId(Long classId) {
                this.classId = classId;
        }

        public String getCreatorFirstName() {
                return creatorFirstName;
        }

        public void setCreatorFirstName(String creatorFirstName) {
                this.creatorFirstName = creatorFirstName;
        }

        public String getCreatorLastName() {
                return creatorLastName;
        }

        public void setCreatorLastName(String creatorLastName) {
                this.creatorLastName = creatorLastName;
        }

        public String getSubject() {
                return subject;
        }

        public void setSubject(String subject) {
                this.subject = subject;
        }

        public String getContent() {
                return content;
        }

        public void setContent(String content) {
                this.content = content;
        }

        public LocalDate getCreationDate() {
                return creationDate;
        }

        public void setCreationDate(LocalDate creationDate) {
                this.creationDate = creationDate;
        }

        @Override
        public boolean equals(Object o) {
                if (this == o) return true;
                if (o == null || getClass() != o.getClass()) return false;
                SchoolClassAnnouncement that = (SchoolClassAnnouncement) o;
                return id.equals(that.id) &&
                        classId.equals(that.classId) &&
                        Objects.equals(creatorFirstName, that.creatorFirstName) &&
                        Objects.equals(creatorLastName, that.creatorLastName) &&
                        Objects.equals(subject, that.subject) &&
                        Objects.equals(content, that.content) &&
                        creationDate.equals(that.creationDate);
        }

        @Override
        public int hashCode() {
                return Objects.hash(id, classId, creatorFirstName, creatorLastName, subject, content, creationDate);
        }

        @Override
        public String toString() {
                return "SchoolClassAnnouncement{" +
                        "id=" + id +
                        ", classId=" + classId +
                        ", creatorFirstName='" + creatorFirstName + '\'' +
                        ", creatorLastName='" + creatorLastName + '\'' +
                        ", subject='" + subject + '\'' +
                        ", content='" + content + '\'' +
                        ", creationDate=" + creationDate +
                        '}';
        }
}
