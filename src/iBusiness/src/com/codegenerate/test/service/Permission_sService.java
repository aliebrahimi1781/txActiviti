package com.codegenerate.test.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.codegenerate.test.entity.Permission_sEntity;
import com.ibusiness.common.page.HibernateEntityDao;

/**   
 * @Title: Service
 * @Description: 审批权限流程表
 * @author JiangBo
 *
 */
@Service
@Transactional
public class Permission_sService extends HibernateEntityDao<Permission_sEntity> {
    /**
     * 插入
     * @param entity
     */
    public <T> void insert(T entity) {
        super.saveInsert(entity);
    }
    /**
     * 删除
     * @param entity
     */
    public void remove(Permission_sEntity entity) {
        super.remove(entity);
    }
}