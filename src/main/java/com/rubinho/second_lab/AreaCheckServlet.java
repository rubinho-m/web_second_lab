package com.rubinho.second_lab;

import com.rubinho.second_lab.exceptions.InvalidDataException;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;

import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@WebServlet(name = "AreaCheckServlet", urlPatterns = {})
public class AreaCheckServlet extends HttpServlet {

    private List<Double> valuesX = Arrays.asList(-4.0, -3.0, -2.0, -1.0, 0.0, 1.0, 2.0, 3.0, 4.0);
    private List<Double> valuesR = Arrays.asList(1.0, 2.0, 3.0, 4.0, 5.0);

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html");

        long startTime = System.nanoTime();


        String x = request.getParameter("x");
        String y = request.getParameter("y");
        String R = request.getParameter("R");


        try {
            if (x == null || x.isEmpty()) {
                throw new InvalidDataException("x is not set");
            }
            if (y == null || y.isEmpty()) {
                throw new InvalidDataException("y is not set");
            }
            if (R == null || R.isEmpty()) {
                throw new InvalidDataException("R is not set");
            }
            Double doubleX = parseNumeric(x);
            Double doubleY = parseNumeric(y);
            Double doubleR = parseNumeric(R);

            if (request.getParameter("mouse") == null){
                if (!valuesX.contains(doubleX)) {
                    throw new InvalidDataException("X is not in the right range");
                }

                if (doubleY <= -5 || doubleY >= 3) {
                    throw new InvalidDataException("Y is not in the right range");
                }

                if (!valuesR.contains(doubleR)) {
                    throw new InvalidDataException("R is not in the right range");
                }
            }



            boolean is_hit = check(doubleX, doubleY, doubleR);

            ServletContext context = getServletContext();

            LocalDateTime currentDateTime = LocalDateTime.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
            String formattedDateTime = currentDateTime.format(formatter);

            String msTime = String.format("%.6f", ((System.nanoTime() - startTime) / 1_000_000.0)).replace(',', '.');

            Row row = new Row(String.valueOf(doubleX), String.valueOf(doubleY), String.valueOf(doubleR), formattedDateTime, msTime, String.valueOf(is_hit));
            Object attributeValue = context.getAttribute("rows");
            List<Row> rows;
            if (attributeValue != null) {
                rows = (List<Row>) context.getAttribute("rows");
            } else {
                rows = new ArrayList<>();
            }
            rows.add(row);
            context.setAttribute("rows", rows);

            getServletContext().getRequestDispatcher("/result_page.jsp").forward(request, response);
//


        } catch (InvalidDataException e) {
            System.out.println(e.getMessage());
            request.setAttribute("error_message", e.getMessage());
        }
    }

    private double parseNumeric(String str) throws InvalidDataException {
        try {
            return Double.parseDouble(str);
        } catch (NumberFormatException e) {
            throw new InvalidDataException("Incorrect value");
        }
    }

    private boolean check(Double x, Double y, Double R) {
        return isInCircle(x, y, R) || isInTriangle(x, y, R) || isInRectangle(x, y, R);
    }

    private boolean isInCircle(double x, double y, double r) {
        return x >= 0 && y <= 0 && x * x + y * y <= r * r;
    }


    private boolean isInRectangle(double x, double y, double r) {
        return x <= 0 && y <= 0 && x >= -r / 2 && y >= -r;
    }


    private boolean isInTriangle(double x, double y, double r) {
        return x <= 0 && y >= 0 && y <= 0.5 * x + r / 2;
    }
}
