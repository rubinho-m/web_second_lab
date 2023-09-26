package com.rubinho.second_lab;

import jakarta.servlet.*;
import jakarta.servlet.annotation.*;

import java.io.IOException;

@WebFilter(filterName = "JspFilter", urlPatterns = {"/result_page.jsp", "/table.jsp"})
public class JspFilter implements Filter {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws ServletException, IOException {
        request.getRequestDispatcher("/access_error.jsp").forward(request, response);
        chain.doFilter(request, response);
    }
}
