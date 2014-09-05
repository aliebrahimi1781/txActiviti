package com.ibusiness.component.portal.rs;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.ibusiness.component.form.dao.ConfFormDao;
import com.ibusiness.component.form.entity.ConfForm;
import com.ibusiness.component.portal.dao.ComponentDao;
import com.ibusiness.component.portal.entity.ConfComponent;
import com.ibusiness.component.table.dao.TableDao;
import com.ibusiness.component.table.entity.ConfTable;
/**
 * 业务模块组件 左边树
 * @author JiangBo
 *
 */
@Component
@Path("component")
public class ComponentResource {
    private static Logger logger = LoggerFactory.getLogger(ComponentResource.class);
    private ComponentDao componentDao;
    private TableDao tableDao;
    private ConfFormDao confFormDao;

    @SuppressWarnings("unchecked")
    @POST
    @Path("tree")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Map<String, Object>> tree(@QueryParam("parentId") String parentId) {
        String hql = "from ConfComponent where parentid = 0 ";
        List<ConfComponent> entities = componentDao.find(hql);
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("id", 0);
        map.put("name", "业务模块(增删改)");
        map.put("packageName", "root");
        map.put("typeId", "root");
        map.put("open", "true");
        map.put("children",generateEntities(entities));
        List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        list.add(map);
        return list;
    }
    /**
     * 循环插入节点
     * @param entities
     * @param partyStructTypeId
     * @return
     */
    private List<Map<String, Object>> generateEntities(List<ConfComponent> entities) {
        if (entities == null) {
            return null;
        }
        List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        try {
            for (ConfComponent entity : entities) {
                list.add(generateEntity(entity));
            }
        } catch (Exception ex) {
            logger.error(ex.getMessage(), ex);
        }
        return list;
    }

    /**
     * 配置节点,递归调用子节点
     * 
     * @param component
     * @param partyStructTypeId
     * @return
     */
    @SuppressWarnings("unchecked")
    private Map<String, Object> generateEntity(ConfComponent component) {
        Map<String, Object> map = new HashMap<String, Object>();
        try {
            map.put("id", component.getId());
            map.put("name", component.getModulename());
            map.put("packageName", component.getPackagename());
            map.put("typeId", component.getTypeid());
            map.put("open", "true");
            // 子节点--表
            if ("Table".equals(component.getTypeid())) {
                String hql = "from ConfTable where packageName = ? ";
                List<ConfTable> tables = tableDao.find(hql, component.getPackagename());
                // 循环
                List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
                for (ConfTable confTable : tables) {
                    Map<String, Object> tableMap = new HashMap<String, Object>();
                    tableMap.put("id", confTable.getId());
                    tableMap.put("name", confTable.getTableNameComment());
                    tableMap.put("packageName", confTable.getPackageName());
                    tableMap.put("typeId", "tables");
                    tableMap.put("open", "true");
                    list.add(tableMap);
                }
                map.put("children", list);
            } else if ("Form".equals(component.getTypeid())) {
                // 子节点--表单
                String hql = "from ConfForm where packageName = ? ";
                List<ConfForm> forms = confFormDao.find(hql, component.getPackagename());
                // 循环
                List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
                for (ConfForm confForm : forms) {
                    Map<String, Object> formMap = new HashMap<String, Object>();
                    formMap.put("id", confForm.getId());
                    formMap.put("name", confForm.getFormTitle());
                    formMap.put("packageName", confForm.getPackageName());
                    formMap.put("typeId", "forms");
                    formMap.put("open", "true");
                    list.add(formMap);
                }
                map.put("children", list);
            } else {
                // 查询子节点
                String hql = "from ConfComponent where parentid = ? ";
                List<ConfComponent> entities = componentDao.find(hql, component.getId());
                // 循环
                map.put("children", generateEntities(entities));
            }
            return map;
        } catch (Exception e) {
            logger.error(e.getMessage(), e);

            return map;
        }
    }

    // ==================================================
    @Resource
    public void setComponentDao(ComponentDao componentDao) {
        this.componentDao = componentDao;
    }
    @Resource
    public void setTableDao(TableDao tableDao) {
        this.tableDao = tableDao;
    }
    @Resource
    public void setConfFormDao(ConfFormDao confFormDao) {
        this.confFormDao = confFormDao;
    }
}
