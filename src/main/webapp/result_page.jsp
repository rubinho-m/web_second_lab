<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Лабораторная 2</title>
</head>
<body>
<div>
    <form method="post" action="index.jsp">
        <input class= "check" id="cancelButton" type="submit" value='Main page' >
    </form>
</div>
<br>
<br>
<div>
    <jsp:include page="table.jsp"/>
</div>
</body>
</html>
