<%@ page import="com.rubinho.second_lab.Row" %>
<%@ page import="java.util.List" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Лабораторная 2</title>
    <style>
        <%@include file='style.css' %>
    </style>

</head>
<body>
<%List<Row> rows = (List<Row>) application.getAttribute("rows");%>
<table id="history_table">
    <tr>
        <th>x</th>
        <th>y</th>
        <th>R</th>
        <th>Результат</th>
        <th>Время</th>
        <th>Время выполнения скрипта</th>
    </tr>
    <%
        if (rows != null) {
            for (Row row : rows) {
    %>
    <tr>
        <td><%=row.getX()%></td>
        <td><%=row.getY()%></td>
        <td><%=row.getR()%></td>
        <td><%=row.isHit()%></td>
        <td><%=row.getCurrentTime()%></td>
        <td><%=row.getExecutionTime()%></td>
    </tr>
    <%
            }
        }
    %>
</table>
<p><input class="check" id="clear_button" type="submit" value="Очистить"></p>
<script type="text/javascript">
    <%@include file="clearTable.js"%>
</script>
</body>
</html>
