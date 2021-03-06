package com.codegenerate.budgetmanage.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ibusiness.common.page.HibernateEntityDao;
import com.codegenerate.budgetmanage.entity.Monthplananaly_sEntity;

/**   
 * @Title: Service
 * @Description: 预算月度计划执行情况分析汇总表流程
 * @author JiangBo
 *
 */
@Service
@Transactional
public class Monthplananaly_sService extends HibernateEntityDao<Monthplananaly_sEntity> {
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
    public void remove(Monthplananaly_sEntity entity) {
        super.remove(entity);
    }
}
