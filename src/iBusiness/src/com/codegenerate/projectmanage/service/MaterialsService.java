package com.codegenerate.projectmanage.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ibusiness.common.page.HibernateEntityDao;
import com.codegenerate.projectmanage.entity.MaterialsEntity;

/**   
 * @Title: Service
 * @Description: 物料表
 * @author JiangBo
 *
 */
@Service
@Transactional
public class MaterialsService extends HibernateEntityDao<MaterialsEntity> {
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
    public void remove(MaterialsEntity entity) {
        super.remove(entity);
    }
}
