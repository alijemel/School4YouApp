package group4.school4you.Entities;

import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.Objects;

@Entity
public class Recurrence {

    @Id
    @GeneratedValue
    private Long recurrenceId;
    private long weeks;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate begin;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate end;
    private DayOfWeek dayOfWeek;
    private String slot;
    private Long classId;
    private Long teacherId;


    public Recurrence(){}

    public Recurrence (long weeks) {
        this.weeks=weeks;
    }

    public Recurrence(long weeks, LocalDate begin ) {
        this.weeks = weeks;
        this.begin = begin;
        this.dayOfWeek = begin.getDayOfWeek();
        this.end = begin.plusWeeks(weeks);
    }

    public Long getRecurrenceId() {
        return recurrenceId;
    }

    public void setRecurrenceId(Long recurrenceId) {
        this.recurrenceId = recurrenceId;
    }

    public long getWeeks() {
        return weeks;
    }

    public void setWeeks(long weeks) {
        this.weeks = weeks;
    }

    public LocalDate getBegin() {
        return begin;
    }

    public void setBegin(LocalDate begin) {
        this.begin = begin;
    }

    public LocalDate getEnd() {
        return end;
    }

    public void setEnd(LocalDate end) {
        this.end = end;
    }

    public DayOfWeek getDayOfWeek() {
        return dayOfWeek;
    }

    public void setDayOfWeek(DayOfWeek dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }

    public String getSlot() {
        return slot;
    }

    public void setSlot(String slot) {
        this.slot = slot;
    }

    public Long getClassId() {
        return classId;
    }

    public void setClassId(Long classId) {
        this.classId = classId;
    }

    public Long getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(Long teacherId) {
        this.teacherId = teacherId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Recurrence that = (Recurrence) o;
        return weeks == that.weeks &&
                recurrenceId.equals(that.recurrenceId) &&
                begin.equals(that.begin) &&
                end.equals(that.end) &&
                dayOfWeek == that.dayOfWeek;
    }

    @Override
    public int hashCode() {
        return Objects.hash(recurrenceId, weeks, begin, end, dayOfWeek);
    }
}
