package group4.school4you.Objects;

import java.time.LocalDate;
import java.util.Objects;

public class DateAndSlot {

    private LocalDate date;
    private String slot;

    public DateAndSlot(LocalDate date, String slot) {
        this.date = date;
        this.slot = slot;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getSlot() {
        return slot;
    }

    public void setSlot(String slot) {
        this.slot = slot;
    }

    @Override
    public String toString() {
        return "DateAndSlot{" +
                "date=" + date +
                ", slot='" + slot + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        DateAndSlot that = (DateAndSlot) o;
        return date.equals(that.date) &&
                slot.equals(that.slot);
    }

    @Override
    public int hashCode() {
        return Objects.hash(date, slot);
    }
}
