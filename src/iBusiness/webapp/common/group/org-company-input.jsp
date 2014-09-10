<%@page contentType="text/html;charset=UTF-8"%>
<%@include file="/common/taglibs.jsp"%>
<%pageContext.setAttribute("currentHeader", "group-sys");%>
<%pageContext.setAttribute("currentMenu", "group");%>
<!doctype html>
<html lang="en">

  <head>
    <%@include file="/common/meta.jsp"%>
    <title>编辑公司</title>
    <%@include file="/common/center.jsp"%>
    <script type="text/javascript">
$(function() {
    $("#orgForm").validate({
        submitHandler: function(form) {
			bootbox.animate(false);
			var box = bootbox.dialog('<div class="progress progress-striped active" style="margin:0px;"><div class="bar" style="width: 100%;"></div></div>');
            form.submit();
        },
        errorClass: 'validate-error',
        rules: {
            orgname: {
                remote: {
                    url: 'org-company-checkOrgname.do',
                    data: {
                        <c:if test="${model != null}">
                        id: function() {
                            return $('#org_id').val();
                        }
                        </c:if>
                    }
                }
            }
        },
        messages: {
            orgname: {
                remote: "存在重复公司"
            }
        }
    });
})
    </script>
  </head>

  <body>
    <%@include file="/header/header-portal.jsp"%>

	<!-- start of main -->
	<div class="panel panel-default span10"> 
        <div class="panel-heading"><h4 class="panel-title">编辑公司</h4></div>
        <div class="panel-body">
            <form id="orgForm" method="post" action="org-company-save.do" class="form-horizontal">
				  <c:if test="${model != null}">
				  		<input id="org_id" type="hidden" name="id" value="${model.id}">
				  </c:if>
				  <p>
			    	<label class="control-label" for="org_orgname"><spring:message code="org.org.input.orgname" text="名称"/></label>
				    <input id="org_orgname" type="text" name="name" value="${model.name}" class="text required" >
				   </p>
				    <p>
					      <button id="submitButton" class="btn btn-default a-submit"><spring:message code='core.input.save' text='保存'/></button>
					      <button type="button" onclick="history.back();" class="btn btn-default"><spring:message code='core.input.back' text='返回'/></button>
				    </p>
			</form>
		</div>
      <!-- end of main -->
      </div>
  </body>
</html>
