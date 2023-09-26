package com.rubinho.second_lab;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;

import java.io.IOException;

@WebServlet(name = "ForwardServlet", value = "/ForwardServlet")
public class ForwardServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if (request.getParameter("path").equals("jsp")){
            getServletContext().getRequestDispatcher("/result_page.jsp").forward(request, response);
        } else {
            getServletContext().getRequestDispatcher("/table.jsp").forward(request, response);
//            getServletContext().getRequestDispatcher("/index.jsp").forward(request, response);
        }
    }
}
