package com.ibusiness.component.table.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.ibusiness.common.util.CommonUtils;
import com.ibusiness.component.table.dao.TableColumnsDao;
import com.ibusiness.component.table.entity.ConfTable;
import com.ibusiness.component.table.entity.ConfTableColumns;
import com.ibusiness.component.table.service.TableService;
import com.ibusiness.core.spring.MessageHelper;

/**
 * 数据库表结构管理
 * 
 * @author JiangBo
 * 
 */
@Controller
@RequestMapping("table")
public class TableController {

    // 共用Service,可以查询热力站,热源,BPM等基础信息
    private TableService tableService;
    private TableColumnsDao tableColumnsDao;
    private MessageHelper messageHelper;

    /**
     * 业务表管理表信息查询
     * 
     * @return
     */
    @RequestMapping("conf-table-list")
    public String confTableShow(@RequestParam("packageName") String packageName, Model model) {
        // 取得表结构信息。
        List<ConfTable> list = tableService.queryConfTableList(packageName,"2");
        // 表结构信息
        model.addAttribute("tableInfoList", list);
        model.addAttribute("packageName", packageName);
        
        return "component/table/conf-table-list.jsp"; 
    }
    @RequestMapping("conf-bpmTable-list")
    public String confBpmTableShow(@RequestParam("packageName") String packageName, Model model) {
        // 取得表结构信息。
        List<ConfTable> list = tableService.queryConfTableList(packageName,"1");
        // 表结构信息
        model.addAttribute("tableInfoList", list);
        model.addAttribute("packageName", packageName);
        
        return "component/table/conf-bpmTable-list.jsp"; 
    }
    
    /**
     * 表列字段结构管理表信息查询
     * 
     * @return
     */
    @RequestMapping("conf-table-column-list")
    public String queryConfTableDetail(@RequestParam("tableName") String tableName, Model model) {
    	// 取得表结构信息
        List<ConfTableColumns> list = tableService.queryConfTableColumns(tableName);
        // 表结构信息
        model.addAttribute("tableInfoList", list);
        model.addAttribute("tableName", tableName);
        // 取得表结构信息
        return "component/table/conf-table-column-list.jsp";
    }
    /**
     * 表列字段结构管理表信息查询
     * 
     * @return
     */
    @RequestMapping("conf-table-column-input")
    public String queryConfTableColumn(@RequestParam("tableName") String tableName, @RequestParam("columnValue") String columnValue, Model model) {
    	// 取得表结构信息
        ConfTableColumns bean = tableService.queryConfTableColumn(tableName, columnValue);
        // 表结构信息
        model.addAttribute("beanInfo", bean);
        model.addAttribute("tableName", tableName);
        // 取得表结构信息
        return "component/table/conf-table-column-input.jsp";
    }
    /**
     * 新建一张业务表页面跳转
     * 
     * @return
     */
    @RequestMapping("conf-table-insert")
    public String confTableInsert(@RequestParam("packageName") String packageName, @RequestParam("isBpmTable") String isBpmTable, Model model) {
        model.addAttribute("packageName", packageName);
        model.addAttribute("isBpmTable", isBpmTable);
        
        return "component/table/conf-table-insert.jsp"; 
    }
    
    /**
     * 保存业务表信息
     * 
     * @return
     */
    @RequestMapping("conf-table-save")
    public String confTableSave(@ModelAttribute ConfTable confTable, RedirectAttributes redirectAttributes) {
    	confTable.setId(UUID.randomUUID().toString());
    	confTable.setTableName("IB_" + confTable.getTableName().toUpperCase());//转成大写
    	tableService.getDao().saveInsert(confTable);
    	
    	// 先删后建
        dropTable("DROP TABLE IF EXISTS " + confTable.getTableName() + "");
	    // 判断是流程表还是非流程表
        if (1 == confTable.getIsBpmTable()) {
            // 主表
            if ("1".equals(confTable.getTableType())) {
                // 在数据库中创建一张业务表
                createTable("CREATE TABLE " + confTable.getTableName() + " (ID VARCHAR(64) NOT NULL, EXECUTIONID VARCHAR(64), CREATEDATEBPM DATE, NODENAME VARCHAR(128), ASSIGNEEUSER VARCHAR(128), TASKTITLE VARCHAR(256), DONEFLAG INT DEFAULT 0, PRIMARY KEY (ID))");
                // 删除字段
                String tcHql = "from ConfTableColumns where tableName=?";
                tableColumnsDao.removeAll(tableColumnsDao.find(tcHql, confTable.getTableName()));
                // 流程用主表--列字段 -- 流程表埋多个字段
                ConfTableColumns confTableColumns = createTableColumn(confTable.getTableName(),"ID","UUID主键",1,"VARCHAR","64","否");
                tableColumnsDao.saveInsert(confTableColumns);
                confTableColumns = createTableColumn(confTable.getTableName(),"EXECUTIONID","流程执行实例ID",2,"VARCHAR","64","是");
                tableColumnsDao.saveInsert(confTableColumns);
                confTableColumns = createTableColumn(confTable.getTableName(),"CREATEDATEBPM","流程创建时间",3,"DATE","","是");
                tableColumnsDao.saveInsert(confTableColumns);
                confTableColumns = createTableColumn(confTable.getTableName(),"NODENAME","流程节点名",4,"VARCHAR","128","是");
                tableColumnsDao.saveInsert(confTableColumns);
                confTableColumns = createTableColumn(confTable.getTableName(),"ASSIGNEEUSER","负责人",5,"VARCHAR","64","是");
                tableColumnsDao.saveInsert(confTableColumns);
                confTableColumns = createTableColumn(confTable.getTableName(),"TASKTITLE","流程实例标题",5,"VARCHAR","256","是");
                tableColumnsDao.saveInsert(confTableColumns);
                confTableColumns = createTableColumn(confTable.getTableName(),"DONEFLAG","流程结束标记",7,"INT","4","是");
                tableColumnsDao.saveInsert(confTableColumns);
            } else {
                // 子表
                // 在数据库中创建一张业务表
                createTable("CREATE TABLE " + confTable.getTableName() + " (ID VARCHAR(64) NOT NULL, PARENTID VARCHAR(64), PRIMARY KEY (ID))");
                // 删除字段
                String tcHql = "from ConfTableColumns where tableName=?";
                tableColumnsDao.removeAll(tableColumnsDao.find(tcHql, confTable.getTableName()));
                // 流程用子表--列字段 -- 流程表埋多个字段
                ConfTableColumns confTableColumns = createTableColumn(confTable.getTableName(),"ID","UUID主键",1,"VARCHAR","64","否");
                tableColumnsDao.saveInsert(confTableColumns);
                confTableColumns = createTableColumn(confTable.getTableName(),"PARENTID","主表UUID",2,"VARCHAR","64","否");
                tableColumnsDao.saveInsert(confTableColumns);
            }
            // 
            messageHelper.addFlashMessage(redirectAttributes, "core.success.save", "保存成功");
            return "redirect:/table/conf-bpmTable-list.do?packageName="+confTable.getPackageName();
        } else {
            // 主表
            if ("1".equals(confTable.getTableType())) {
                // 在数据库中创建一张业务表
                createTable("CREATE TABLE " + confTable.getTableName() + " (ID VARCHAR(64) NOT NULL, PRIMARY KEY (ID))");
                // 删除字段
                String tcHql = "from ConfTableColumns where tableName=?";
                tableColumnsDao.removeAll(tableColumnsDao.find(tcHql, confTable.getTableName()));
                // 非流程用主表--列字段 -- 非流程表只埋一个UUID字段
                ConfTableColumns confTableColumns = createTableColumn(confTable.getTableName(),"ID","UUID主键",1,"VARCHAR","64","否");
                // 插入
                tableColumnsDao.saveInsert(confTableColumns);
            } else {
                // 子表
                // 在数据库中创建一张业务表
                createTable("CREATE TABLE " + confTable.getTableName() + " (ID VARCHAR(64) NOT NULL, PARENTID VARCHAR(64), PRIMARY KEY (ID))");
                // 删除字段
                String tcHql = "from ConfTableColumns where tableName=?";
                tableColumnsDao.removeAll(tableColumnsDao.find(tcHql, confTable.getTableName()));
                // 非流程用子表--列字段 -- 流程表埋多个字段
                ConfTableColumns confTableColumns = createTableColumn(confTable.getTableName(),"ID","UUID主键",1,"VARCHAR","64","否");
                tableColumnsDao.saveInsert(confTableColumns);
                confTableColumns = createTableColumn(confTable.getTableName(),"PARENTID","主表UUID",2,"VARCHAR","64","否");
                tableColumnsDao.saveInsert(confTableColumns);
            }
            // 
            messageHelper.addFlashMessage(redirectAttributes, "core.success.save", "保存成功");
            return "redirect:/table/conf-table-list.do?packageName="+confTable.getPackageName();
        }
    }
    
    /**
     * 插入/变更/修改表列字段管理表信息
     * 
     * @return
     */
    @RequestMapping("conf-table-columns-update")
    public String confTableColumnsUpdate(@ModelAttribute ConfTableColumns confTableColumns, @RequestParam("tableName") String tableName, RedirectAttributes redirectAttributes) {
        // 取得表结构信息
        ConfTableColumns bean = tableService.queryConfTableColumn(tableName, confTableColumns.getColumnValue());
        if (null == bean) {
            List<ConfTableColumns> list = new ArrayList<ConfTableColumns>();
            confTableColumns.setTableName(tableName.toUpperCase());//转成大写
            confTableColumns.setColumnValue(confTableColumns.getColumnValue().toUpperCase());//转成大写
            list.add(confTableColumns);
            // 插入
            tableService.insertConfTableColumns(list);
            // 在数据库中修改(更新/追加)指定的业务表的数据列
            alterTableColumn(confTableColumns);
        } else {
            confTableColumns.setColumnValue(confTableColumns.getColumnValue().toUpperCase());
            tableService.updateConfTableColumns(tableName, confTableColumns);
            messageHelper.addFlashMessage(redirectAttributes, "core.success.update", "更新成功");
            // 更改表结构
            alterTableColumn(confTableColumns);
        }
        return "redirect:/table/conf-table-column-list.do?tableName=" + tableName;
    }
    /**
     * 删除业务表管理表信息
     * 
     * @return
     */
    @RequestMapping("conf-table-remove")
    public String confTableRemove(@RequestParam("selectedItem") List<String> selectedItem, @RequestParam("packageName") String packageName, RedirectAttributes redirectAttributes) {
        ConfTable confTable = tableService.getDao().get(selectedItem.get(0));
        Integer isBpmTable = confTable.getIsBpmTable();
        // 去数据库中drop掉表
        dropTable("DROP TABLE IF EXISTS " + confTable.getTableName() + "");
        // 删除
        tableService.deleteConfTable(selectedItem);
    	messageHelper.addFlashMessage(redirectAttributes, "core.success.delete", "删除成功");
    	// 判断跳转
    	if (null != isBpmTable && isBpmTable == 1) {
    	    return "redirect:/table/conf-bpmTable-list.do?packageName="+packageName;
    	} else {
    	    return "redirect:/table/conf-table-list.do?packageName="+packageName;
    	}
        
    }
    /**
     * 删除表列字段管理表信息
     * 
     * @return
     */
    @RequestMapping("conf-table-columns-remove")
    public String confTableColumnsRemove(@RequestParam("selectedItem") List<String> selectedItem, @RequestParam("tableName") String tableName, RedirectAttributes redirectAttributes) {
    	tableService.deleteConfColumnsTable(selectedItem, tableName);
    	messageHelper.addFlashMessage(redirectAttributes, "core.success.delete", "删除成功");
    	// 在数据库中(删除)指定的业务表的数据列
    	for (String columnValue : selectedItem) {
    		alterDropTableColumns(tableName, columnValue);
    	}
        return "redirect:/table/conf-table-column-list.do?tableName=" + tableName;
    }
    /**
     * 在数据库中创建一张业务表
     * @param list
     */
    private void createTable(String sql) {
        if (0 == tableService.execute(sql)) {
            return;
        }
    }
    /**
     * 在数据库中删除一张业务表
     * @param list
     */
    private void dropTable(String sql) {
        if (0 == tableService.execute(sql)) {
            return;
        }
    }
    /**
     * 在数据库中修改(更新/追加)指定的业务表的数据列
     * @param list
     */
    private void alterTableColumn(ConfTableColumns bean) {
    	String defaultStr = "";
    	if (bean.getColumnType().indexOf("number") >= 0) {
		    defaultStr = " default 0";
	    }
    	// 插入数据列
		if (CommonUtils.isNull(bean.getColumnValueOld())) {
			String sql = "ALTER TABLE " + bean.getTableName() + " ADD " + bean.getColumnValue() + " " + bean.getColumnType();
			if (!CommonUtils.isNull(bean.getColumnSize())) {
				sql = sql + "(" + bean.getColumnSize() + ")";
			}
			sql = sql + defaultStr;
			if (0 == tableService.execute(sql)) {
				return;
			}
		} else {
			// 修改数据列名
		    if (!bean.getColumnValue().equals(bean.getColumnValueOld())) {
		    	String sql = "ALTER TABLE " + bean.getTableName() + " RENAME COLUMN " + bean.getColumnValueOld() + " TO " + bean.getColumnValue();
		        if (0 == tableService.execute(sql)) {
		            return;
		        }
		    }
	    	
		    // 修改数据列类型
			if (!bean.getColumnType().equals(bean.getColumnTypeOld())
					|| (CommonUtils.isNull(bean.getColumnSize()) && !bean.getColumnSize().equals(bean.getColumnSizeOld()))) {
				String sql = "ALTER TABLE " + bean.getTableName() + " MODIFY " + bean.getColumnValue() + " " + bean.getColumnType();
				if (!CommonUtils.isNull(bean.getColumnSize())) {
					sql = sql + "(" + bean.getColumnSize() + ")";
				}
				if (0 == tableService.execute(sql)) {
		            return;
		        }
			}
		}
    }
    /**
     * 删除指定表中的指定列字段-在指定表的表结构中删除列
     * @param tableName
     * @param columnValue
     */
    private void alterDropTableColumns(String tableName, String columnValue) {
    	String sql = "ALTER TABLE " + tableName + " DROP COLUMN " + columnValue;
        if (0 == tableService.execute(sql)) {
            return;
        }
	}
    /**
     * 创建一个 表字段结构Bean 对象
     * 
     * @param confTable
     * @return
     */
    private ConfTableColumns createTableColumn(String tableName, String columnValue,
            String columnName, Integer columnNo, String columnType, String columnSize, String isNull) {
        ConfTableColumns confTableColumns = new ConfTableColumns();
        confTableColumns.setTableName(tableName);
        confTableColumns.setColumnValue(columnValue);
        confTableColumns.setColumnName(columnName);
        confTableColumns.setColumnNo(columnNo);
        confTableColumns.setColumnType(columnType);
        confTableColumns.setColumnSize(columnSize);
        confTableColumns.setIsNull(isNull);
        return confTableColumns;
    }
    /**
     * 注入 table service
     */
    @Resource
	public void setTableService(TableService tableService) {
		this.tableService = tableService;
	}
    @Resource
    public void setTableColumnsDao(TableColumnsDao tableColumnsDao) {
        this.tableColumnsDao = tableColumnsDao;
    }
    @Resource
    public void setMessageHelper(MessageHelper messageHelper) {
        this.messageHelper = messageHelper;
    }
}
