package com.mossle.cms.domain;

// Generated by Hibernate Tools
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * CmsComment .
 * 
 * @author Lingo
 */
@Entity
@Table(name = "CMS_COMMENT")
public class CmsComment implements java.io.Serializable {
    private static final long serialVersionUID = 0L;

    /** null. */
    private Long id;

    /** null. */
    private CmsArticle cmsArticle;

    /** null. */
    private String title;

    /** null. */
    private String content;

    /** null. */
    private Integer status;

    /** null. */
    private Date createTime;

    /** null. */
    private String userId;

    /** . */
    private Set<CmsFavorite> cmsFavorites = new HashSet<CmsFavorite>(0);

    public CmsComment() {
    }

    public CmsComment(CmsArticle cmsArticle, String title, String content,
            Integer status, Date createTime, String userId,
            Set<CmsFavorite> cmsFavorites) {
        this.cmsArticle = cmsArticle;
        this.title = title;
        this.content = content;
        this.status = status;
        this.createTime = createTime;
        this.userId = userId;
        this.cmsFavorites = cmsFavorites;
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
    @JoinColumn(name = "ARTICLE_ID")
    public CmsArticle getCmsArticle() {
        return this.cmsArticle;
    }

    /**
     * @param cmsArticle
     *            null.
     */
    public void setCmsArticle(CmsArticle cmsArticle) {
        this.cmsArticle = cmsArticle;
    }

    /** @return null. */
    @Column(name = "TITLE", length = 200)
    public String getTitle() {
        return this.title;
    }

    /**
     * @param title
     *            null.
     */
    public void setTitle(String title) {
        this.title = title;
    }

    /** @return null. */
    @Column(name = "CONTENT", length = 200)
    public String getContent() {
        return this.content;
    }

    /**
     * @param content
     *            null.
     */
    public void setContent(String content) {
        this.content = content;
    }

    /** @return null. */
    @Column(name = "STATUS")
    public Integer getStatus() {
        return this.status;
    }

    /**
     * @param status
     *            null.
     */
    public void setStatus(Integer status) {
        this.status = status;
    }

    /** @return null. */
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "CREATE_TIME", length = 26)
    public Date getCreateTime() {
        return this.createTime;
    }

    /**
     * @param createTime
     *            null.
     */
    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    /** @return null. */
    @Column(name = "USER_ID", length = 200)
    public String getUserId() {
        return this.userId;
    }

    /**
     * @param userId
     *            null.
     */
    public void setUserId(String userId) {
        this.userId = userId;
    }

    /** @return . */
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "cmsComment")
    public Set<CmsFavorite> getCmsFavorites() {
        return this.cmsFavorites;
    }

    /**
     * @param cmsFavorites
     *            .
     */
    public void setCmsFavorites(Set<CmsFavorite> cmsFavorites) {
        this.cmsFavorites = cmsFavorites;
    }
}
