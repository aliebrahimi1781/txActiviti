package com.codegenerate.devicemanage.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ibusiness.common.page.HibernateEntityDao;
import com.codegenerate.devicemanage.entity.Device_out_sEntity;

/**   
 * @Title: Service
 * @Description: 设备出库表流程
 * @author JiangBo
 *
 */
@Service
@Transactional
public class Device_out_sService extends HibernateEntityDao<Device_out_sEntity> {
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
    public void remove(Device_out_sEntity entity) {
        super.remove(entity);
    }
}
