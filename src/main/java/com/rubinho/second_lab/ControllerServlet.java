package com.rubinho.second_lab;

import java.io.*;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import jakarta.servlet.ServletContext;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;

@WebServlet(name = "controllerServlet", value = "/control")
public class ControllerServlet extends HttpServlet {
    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        response.setContentType("text/html");
        if (request.getParameter("x") != null && request.getParameter("y") != null && request.getParameter("R") != null) {
            getServletContext().getNamedDispatcher("AreaCheckServlet").forward(request, response);
        } else if (request.getParameter("clear") != null) {
            ServletContext context = getServletContext();
            context.removeAttribute("rows");
            getServletContext().getNamedDispatcher("ForwardServlet").forward(request, response);

        } else {
            response.sendRedirect("/index.jsp");
//            getServletContext().getRequestDispatcher("/index.jsp").forward(request, response);
        }

    }

    public static String getBody(HttpServletRequest request) throws IOException {

        String body = null;
        StringBuilder stringBuilder = new StringBuilder();
        BufferedReader bufferedReader = null;

        try {
            InputStream inputStream = request.getInputStream();
            if (inputStream != null) {
                bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
                char[] charBuffer = new char[128];
                int bytesRead = -1;
                while ((bytesRead = bufferedReader.read(charBuffer)) > 0) {
                    stringBuilder.append(charBuffer, 0, bytesRead);
                }
            } else {
                stringBuilder.append("");
            }
        } catch (IOException ex) {
            throw ex;
        } finally {
            if (bufferedReader != null) {
                try {
                    bufferedReader.close();
                } catch (IOException ex) {
                    throw ex;
                }
            }
        }

        body = stringBuilder.toString();
        return body;
    }

}