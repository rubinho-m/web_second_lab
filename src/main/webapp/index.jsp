<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Лабораторная 2</title>

    <style>
        <%@include file='style.css' %>
    </style>

    <%--    <link rel="stylesheet" href="style.css">--%>

    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css">

</head>

<body>
<div class="header">
    <h2>Рубин Михаил Дмитриевич, P3211, Вариант 3103</h2>
    <%--    <form action="/control" method="post">--%>
    <%--        <input name="x">--%>
    <%--        <input name="y">--%>
    <%--        <button>Submit</button>--%>
    <%--    </form>--%>
</div>
<div class="wrapper">
    <div class="left_column">
        <form>
            <div class="x_choose">
                <p>Выберите значение x</p>
                <p><label>
                    <input name="x_button" class="XRadioCheck" onclick="checkX(this)" value="-4" type="checkbox">
                </label>-4</p>
                <p><label>
                    <input name="x_button" class="XRadioCheck" onclick="checkX(this)" value="-3" type="checkbox">
                </label>-3</p>
                <p><label>
                    <input name="x_button" class="XRadioCheck" onclick="checkX(this)" value="-2" type="checkbox">
                </label>-2</p>
                <p><label>
                    <input name="x_button" class="XRadioCheck" onclick="checkX(this)" value="-1" type="checkbox">
                </label>-1</p>
                <p class="zero"><label>
                    <input name="x_button" class="XRadioCheck" onclick="checkX(this)" value="0" type="checkbox">
                </label>0</p>
                <p><label>
                    <input name="x_button" class="XRadioCheck" onclick="checkX(this)" value="1" type="checkbox">
                </label>1</p>
                <p><label>
                    <input name="x_button" class="XRadioCheck" onclick="checkX(this)" value="2" type="checkbox">
                </label>2</p>
                <p><label>
                    <input name="x_button" class="XRadioCheck" onclick="checkX(this)" value="3" type="checkbox">
                </label>3</p>
                <p><label>
                    <input name="x_button" class="XRadioCheck" onclick="checkX(this)" value="4" type="checkbox">
                </label>4</p>
            </div>
            <div class="y_choose">
                <label>
                    Введите значение y <br>
                    <input type="text" name="y_text" id="y_input" placeholder="-5..3">
                </label>
                <br>
            </div>
            <div class="x_choose">
                <p>Выберите значение R</p>
                <p><label>
                    <input name="R_button" class="RRadioCheck" onclick="checkR(this)" value="1" type="checkbox">
                </label>1</p>
                <p><label>
                    <input name="R_button" class="RRadioCheck" onclick="checkR(this)" value="2" type="checkbox">
                </label>2</p>
                <p><label>
                    <input name="R_button" class="RRadioCheck" onclick="checkR(this)" value="3" type="checkbox">
                </label>3</p>
                <p><label>
                    <input name="R_button" class="RRadioCheck" onclick="checkR(this)" value="4" type="checkbox">
                </label>4</p>
                <p><label>
                    <input name="R_button" class="RRadioCheck" onclick="checkR(this)" value="5" type="checkbox">
                </label>5</p>

            </div>
        </form>

        <p><input class="check" id="check_button" type="submit" value="Проверить"></p>


    </div>

    <div class="images">

        <div class="chart">
            <canvas id="chart">
            </canvas>
        </div>
        <!--        <img id="lebron" src="images/lebron.png" alt="">-->

    </div>
</div>
<div id="tableStore">
    <jsp:include page="table.jsp"/>
</div>
<%--<table id="history_table">--%>
<%--    <tr>--%>
<%--        <th>x</th>--%>
<%--        <th>y</th>--%>
<%--        <th>R</th>--%>
<%--        <th>Результат</th>--%>
<%--        <th>Время</th>--%>
<%--        <th>Время выполнения скрипта</th>--%>
<%--    </tr>--%>


<%--</table>--%>


<script type="text/javascript">
    <%@include file="canvasHandler.js"%>
</script>
<script type="text/javascript">
    <%@include file="script.js"%>
</script>
</body>
<!--<script src="script.js"></script>-->
<%--<script src="canvasHandler.js"></script>--%>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
</html>