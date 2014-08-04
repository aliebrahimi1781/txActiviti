package com.mossle.workcal.domain;

// Generated by Hibernate Tools
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * WorkcalPart .
 * 
 * @author Lingo
 */
@Entity
@Table(name = "WORKCAL_PART")
public class WorkcalPart implements java.io.Serializable {
    private static final long serialVersionUID = 0L;

    /** null. */
    private Long id;

    /** null. */
    private WorkcalRule workcalRule;

    /** null. */
    private Integer shift;

    /** null. */
    private String startTime;

    /** null. */
    private String endTime;

    public WorkcalPart() {
    }

    public WorkcalPart(WorkcalRule workcalRule, Integer shift,
            String startTime, String endTime) {
        this.workcalRule = workcalRule;
        this.shift = shift;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    /** @return null. */
    @Id
    @GeneratedValue
    @Column(name = "ID", unique = true, nullable = false)
    public Long getId() {
        return this.id;
    }

    /**
     * @param id
     *            null.
     */
    public void setId(Long id) {
        this.id = id;
    }

    /** @return null. */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "RULE_ID")
    public WorkcalRule getWorkcalRule() {
        return this.workcalRule;
    }

    /**
     * @param workcalRule
     *            null.
     */
    public void setWorkcalRule(WorkcalRule workcalRule) {
        this.workcalRule = workcalRule;
    }

    /** @return null. */
    @Column(name = "SHIFT")
    public Integer getShift() {
        return this.shift;
    }

    /**
     * @param shift
     *            null.
     */
    public void setShift(Integer shift) {
        this.shift = shift;
    }

    /** @return null. */
    @Column(name = "START_TIME", length = 5)
    public String getStartTime() {
        return this.startTime;
    }

    /**
     * @param startTime
     *            null.
     */
    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    /** @return null. */
    @Column(name = "END_TIME", length = 5)
    public String getEndTime() {
        return this.endTime;
    }

    /**
     * @param endTime
     *            null.
     */
    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }
}
