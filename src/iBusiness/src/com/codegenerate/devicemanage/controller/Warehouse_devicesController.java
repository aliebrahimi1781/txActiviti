package com.codegenerate.devicemanage.controller;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import net.sf.json.JSONObject;

import javax.annotation.Resource;
import java.io.File;
import javax.servlet.http.HttpServletResponse;
import org.springframework.web.multipart.MultipartFile;
import com.ibusiness.common.export.ExcelCommon;
import com.ibusiness.common.export.TableModel;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.ibusiness.security.util.SpringSecurityUtils;
import com.ibusiness.common.model.ConfSelectItem;
import com.ibusiness.common.service.CommonBusiness;
import com.ibusiness.component.form.entity.ConfFormTableColumn;
import com.ibusiness.common.service.FormulaCommon;

import com.ibusiness.core.spring.MessageHelper;
import com.ibusiness.common.page.PropertyFilter;
import com.ibusiness.common.page.Page;
import com.ibusiness.common.util.CommonUtils;

import com.codegenerate.devicemanage.entity.Warehouse_devicesEntity;
import com.codegenerate.devicemanage.service.Warehouse_devicesService;

/**   
 * @Title: Controller
 * @Description: 设备库存管理表页面
 * @author JiangBo
 *
 */
@Controller
@RequestMapping("warehouse_devices")
public class Warehouse_devicesController {

    private MessageHelper messageHelper;
    private com.ibusiness.doc.store.StoreConnector storeConnector;
    private Warehouse_devicesService warehouse_devicesService;
   /**
     * 列表
     */
    @RequestMapping("warehouse_devices-list")
    public String list(@ModelAttribute Page page, @RequestParam Map<String, Object> parameterMap, Model model) {
        // 查询条件Filter过滤器
        List<PropertyFilter> propertyFilters = PropertyFilter.buildFromMap(parameterMap);
        // 添加当前公司(用户范围)ID查询
    	propertyFilters = CommonBusiness.getInstance().editPFByScopeId(propertyFilters);
        // 根据条件查询数据
        page = warehouse_devicesService.pagedQuery(page, propertyFilters);
        model.addAttribute("page", page);
        // 返回JSP
        return "codegenerate/devicemanage/warehouse_devices-list.jsp";
    }
    
    /**
     * 插入
     * @param id
     * @param model
     * @return
     */
    @RequestMapping("warehouse_devices-input")
    public String input(@RequestParam(value = "id", required = false) String id, Model model) {
        Warehouse_devicesEntity entity = null;
        if (!CommonUtils.isNull(id)) {
            entity = warehouse_devicesService.get(id);
        } else {
            entity = new Warehouse_devicesEntity();
        }
        
        // 默认值公式
        entity = (Warehouse_devicesEntity) new FormulaCommon().defaultValue(entity, "IB_WAREHOUSE_DEVICES");
        
        model.addAttribute("model", entity);
        
        // 在controller中设置页面控件用的数据
        return "codegenerate/devicemanage/warehouse_devices-input.jsp";
    }

    /**
     * 保存
     * 
     * @return
     * @throws Exception
     */
    @RequestMapping("warehouse_devices-save")
    public String save(@ModelAttribute Warehouse_devicesEntity entity, RedirectAttributes redirectAttributes) throws Exception {
        // 先进行校验
        // 再进行数据复制
        String id = entity.getId();
        if (CommonUtils.isNull(id)) {
            entity.setId(UUID.randomUUID().toString());
            warehouse_devicesService.insert(entity);
        } else {
            warehouse_devicesService.update(entity);
        }
        messageHelper.addFlashMessage(redirectAttributes, "core.success.save", "保存成功");
        return "redirect:/warehouse_devices/warehouse_devices-list.do";
    }
   /**
     * 删除
     * @param selectedItem
     * @param redirectAttributes
     * @return
     */
    @RequestMapping("warehouse_devices-remove")
    public String remove(@RequestParam("selectedItem") List<String> selectedItem, RedirectAttributes redirectAttributes) {
        List<Warehouse_devicesEntity> entitys = warehouse_devicesService.findByIds(selectedItem);
        for (Warehouse_devicesEntity entity : entitys) {
            warehouse_devicesService.remove(entity);
        }
        messageHelper.addFlashMessage(redirectAttributes, "core.success.delete", "删除成功");

        return "redirect:/warehouse_devices/warehouse_devices-list.do";
    }
    /**
     * 控件添加的方法 ========
     */
    
    /**
     * excel导出
     */
    @SuppressWarnings("unchecked")
    @RequestMapping("warehouse_devices-export")
    public void excelExport(@ModelAttribute Page page, @RequestParam Map<String, Object> parameterMap, HttpServletResponse response) {
        List<PropertyFilter> propertyFilters = PropertyFilter.buildFromMap(parameterMap);
        // 根据当前公司(用户范围)ID进行查询
    	propertyFilters = CommonBusiness.getInstance().editPFByScopeId(propertyFilters);
        page = warehouse_devicesService.pagedQuery(page, propertyFilters);
        List<Warehouse_devicesEntity> beans = (List<Warehouse_devicesEntity>) page.getResult();

        TableModel tableModel = new TableModel();
        // excel文件名
        tableModel.setExcelName("设备库存管理表页面"+CommonUtils.getInstance().getCurrentDateTime());
        // 列名
        tableModel.addHeaders("devicetypeno", "deviceno", "devicename", "devicemodel", "deviceprice", "deviceunit", "devicenum", "warehouseno", "warehousename", "id", "scopeid");
        tableModel.setTableName("IB_WAREHOUSE_DEVICES");
        tableModel.setData(beans);
        try {
            new ExcelCommon().exportExcel(response, tableModel);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    /**
     * excel导入
     */
    @RequestMapping("warehouse_devices-importExcel")
    public String importExport(@RequestParam("attachment") MultipartFile attachment, HttpServletResponse response) {
        try {
            File file = new File("test.xls"); 
            attachment.transferTo(file);
            // 
            TableModel tableModel = new TableModel();
            // 列名
            tableModel.addHeaders("devicetypeno", "deviceno", "devicename", "devicemodel", "deviceprice", "deviceunit", "devicenum", "warehouseno", "warehousename", "id", "scopeid");
            // 导入
            new ExcelCommon().uploadExcel(file, tableModel, "com.codegenerate.devicemanage.entity.Warehouse_devicesEntity");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "redirect:/warehouse_devices/warehouse_devices-list.do";
    }
    // ======================================================================
    @Resource
    public void setMessageHelper(MessageHelper messageHelper) {
        this.messageHelper = messageHelper;
    }
    @Resource
    public void setWarehouse_devicesService(Warehouse_devicesService warehouse_devicesService) {
        this.warehouse_devicesService = warehouse_devicesService;
    }
    @Resource
	public void setStoreConnector(com.ibusiness.doc.store.StoreConnector storeConnector) {
	    this.storeConnector = storeConnector;
	}
}
