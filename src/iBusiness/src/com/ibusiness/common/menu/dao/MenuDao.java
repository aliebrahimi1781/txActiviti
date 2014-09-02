package com.ibusiness.common.menu.dao;

import org.springframework.stereotype.Service;

import com.ibusiness.common.menu.entity.Menu;
import com.ibusiness.common.page.HibernateEntityDao;
/**
 * 资源访问权限表DAO
 * 
 * @author JiangBo
 *
 */
@Service
public class MenuDao extends HibernateEntityDao<Menu> {
}
