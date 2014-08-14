package com.tx.common.dao;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.tx.common.hibernate.HibernateEntityDao;

/**
 * 公用DAO
 */
@Component
@Transactional(rollbackFor = Exception.class)
public class CommonDao<T> extends HibernateEntityDao<T> {
    
}
