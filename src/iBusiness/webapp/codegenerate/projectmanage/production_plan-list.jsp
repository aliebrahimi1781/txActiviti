<%@page contentType="text/html;charset=UTF-8"%>
<%@include file="/common/taglibs.jsp"%>
<!doctype html>
<html>

  <head>
    <%@include file="/common/meta.jsp"%>
    <title>列表</title>
    <%@include file="/common/center.jsp"%>
    <script type="text/javascript">
		var config = {
		    id: 'codeGrid',
		    pageNo: ${page.pageNo},
		    pageSize: ${page.pageSize},
		    totalCount:${page.totalCount},
		    resultSize: ${page.resultSize},
		    pageCount: ${page.pageCount},
		    orderBy: '${page.orderBy == null ? '' : page.orderBy}',
		    asc: ${page.asc},
		    params: {
		        'filter_LIKES_id': '${param.filter_LIKES_id}'
		    },
			selectedItemClass: 'selectedItem',
			gridFormId: 'gridForm',
	        exportUrl: 'production_plan-export.do'
		};

		var table;
		$(function() {
			table = new Table(config);
		    table.configPagination('.m-pagination');
		    table.configPageInfo('.m-page-info');
		    table.configPageSize('.m-page-size');
		});
		
    </script>
  </head>

  <body>
    <%@include file="/ibusiness/header/header-portal.jsp"%>
    <div class="row">
    <div class="col-lg-1"></div>
	<!-- start of main -->
	<div class="panel panel-default col-lg-10">
	<!-- 查询条件 -->
        <div class="panel-heading"><h4 class="panel-title">查询</h4></div>
          <div class="panel-body">
	          <div id="search" class="content content-inner">
				  <form name="cgForm" method="post" action="production_plan-list.do" class="form-inline">
				    <div class="form-group">
				                <label for="code_table_projectname">项目名称:</label>
				                <input type="text" id="code_table_projectname" name="filter_LIKES_projectname" value="${param.filter_LIKES_projectname}">
					    <button class="btn btn-default btn-sm" onclick="document.cgForm.submit()">查询</button>
					</div>
				 </form>
			  </div>
		  </div>
	   <div class="panel-heading"><h4 class="panel-title">列表</h4></div>
       <div class="panel-body">
		    <div class="pull-left">
			    <button class="btn btn-default btn-sm a-insert" onclick="location.href='production_plan-input.do'">新建</button>
			    <button class="btn btn-default btn-sm a-remove" onclick="table.removeAll()">删除</button>
			    <button class="btn btn-default btn-sm" onclick="table.exportExcel()">导出Excel</button>
            
			</div>
			<div class="pull-right">
			  每页显示
			  <select class="m-page-size">
			    <option value="10">10</option>
			    <option value="20">20</option>
			    <option value="50">50</option>
			  </select>
			  条
			</div>
		    <div class="m-clear"></div>
	   </div>
	   <div class="content">
			<form id="gridForm" name="gridForm" method='post' action="production_plan-remove.do" class="m-form-blank">
			  <table id="codeGrid" class="table table-hover table-bordered">
			      <thead>
				      <tr>
				        <th width="10" class="m-table-check"><input type="checkbox" name="checkAll" onchange="toggleSelectedItems(this.checked)"></th>
					                <th class="sorting">项目编号</th>
					                <th class="sorting">项目名称</th>
					                <th class="sorting">项目类型</th>
					                <th class="sorting">客户名称</th>
					                <th class="sorting">项目负责人</th>
					                <th class="sorting">批次号</th>
					                <th class="sorting">生产类型</th>
					                <th class="sorting">生成方式</th>
					                <th class="sorting">生成场地</th>
					                <th class="sorting">产品类型</th>
					                <th class="sorting">产品件号</th>
					                <th class="sorting">产品编号</th>
					                <th class="sorting">产品名</th>
					                <th class="sorting">规格型号</th>
					                <th class="sorting">工作日</th>
					                <th class="sorting">总开始时间</th>
					                <th class="sorting">总结束时间</th>
					                <th class="sorting">采购开始时间</th>
					                <th class="sorting">采购结束时间</th>
					                <th class="sorting">生产开始时间</th>
					                <th class="sorting">生产结束时间</th>
					                <th class="sorting">生产外协开始时间</th>
					                <th class="sorting">生产外协结束时间</th>
				        <th width="80">&nbsp;</th>
				      </tr>
				    </thead>
					    <tbody>
					      <c:forEach items="${page.result}" var="item">
					      <tr>
					        <td><input type="checkbox" class="selectedItem a-check" name="selectedItem" value="${item.id}"></td>
						            <td>${item.projectno}</td>
						            <td>${item.projectname}</td>
						            <td>${item.projecttype}</td>
						            <td>${item.customername}</td>
						            <td>${item.productmanage}</td>
						            <td>${item.batchno}</td>
						            <td>${item.productiontype}</td>
						            <td>${item.productionmode}</td>
						            <td>${item.productionaddress}</td>
						            <td>${item.producttype}</td>
						            <td>${item.productflowid}</td>
						            <td>${item.productno}</td>
						            <td>${item.productname}</td>
						            <td>${item.productmodel}</td>
						            <td>${item.workingday}</td>
						            <td>${item.starttime}</td>
						            <td>${item.endtime}</td>
						            <td>${item.buystarttime}</td>
						            <td>${item.buyendtime}</td>
						            <td>${item.prodstarttime}</td>
						            <td>${item.prodendtime}</td>
						            <td>${item.prodoutstarttime}</td>
						            <td>${item.prodoutendtime}</td>
					        <td>
					          <a href="production_plan-input.do?id=${item.id}" class="a-update"><spring:message code="core.list.edit" text="编辑"/></a>
					        </td>
					      </tr>
					      </c:forEach>
					    </tbody>
					  </table>
					</form>
	        </div>
		  <article>
		    <div class="m-page-info pull-left">
			  共100条记录 显示1到10条记录
			</div>
			<div class="btn-group m-pagination pull-right">
			  <button class="btn btn-small">&lt;</button>
			  <button class="btn btn-small">1</button>
			  <button class="btn btn-small">&gt;</button>
			</div>
		    <div class="m-clear"></div>
	      </article>
	  </div>
	<!-- end of main -->
	</div>
  </body>
</html>
