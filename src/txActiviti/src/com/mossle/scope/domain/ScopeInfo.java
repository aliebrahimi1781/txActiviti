package com.mossle.scope.domain;

// Generated by Hibernate Tools
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * ScopeInfo .
 * 
 * @author Lingo
 */
@Entity
@Table(name = "SCOPE_INFO")
public class ScopeInfo implements java.io.Serializable {
    private static final long serialVersionUID = 0L;

    /** null. */
    private Long id;

    /** null. */
    private String name;

    /** null. */
    private String code;

    /** null. */
    private String ref;

    /** null. */
    private Integer shared;

    /** null. */
    private String userRepoRef;

    /** null. */
    private Integer type;

    public ScopeInfo() {
    }

    public ScopeInfo(String name, String code, String ref, Integer shared,
            String userRepoRef, Integer type) {
        this.name = name;
        this.code = code;
        this.ref = ref;
        this.shared = shared;
        this.userRepoRef = userRepoRef;
        this.type = type;
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
    @Column(name = "NAME", length = 50)
    public String getName() {
        return this.name;
    }

    /**
     * @param name
     *            null.
     */
    public void setName(String name) {
        this.name = name;
    }

    /** @return null. */
    @Column(name = "CODE", length = 50)
    public String getCode() {
        return this.code;
    }

    /**
     * @param code
     *            null.
     */
    public void setCode(String code) {
        this.code = code;
    }

    /** @return null. */
    @Column(name = "REF", length = 50)
    public String getRef() {
        return this.ref;
    }

    /**
     * @param ref
     *            null.
     */
    public void setRef(String ref) {
        this.ref = ref;
    }

    /** @return null. */
    @Column(name = "SHARED")
    public Integer getShared() {
        return this.shared;
    }

    /**
     * @param shared
     *            null.
     */
    public void setShared(Integer shared) {
        this.shared = shared;
    }

    /** @return null. */
    @Column(name = "USER_REPO_REF", length = 50)
    public String getUserRepoRef() {
        return this.userRepoRef;
    }

    /**
     * @param userRepoRef
     *            null.
     */
    public void setUserRepoRef(String userRepoRef) {
        this.userRepoRef = userRepoRef;
    }

    /** @return null. */
    @Column(name = "TYPE")
    public Integer getType() {
        return this.type;
    }

    /**
     * @param type
     *            null.
     */
    public void setType(Integer type) {
        this.type = type;
    }
}