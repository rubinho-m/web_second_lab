package com.rubinho.second_lab;

import jakarta.servlet.*;
import jakarta.servlet.annotation.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.lang.reflect.Array;
import java.net.HttpURLConnection;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@WebFilter(filterName = "NotFoundFilter", urlPatterns = {"/*"})
public class NotFoundFilter implements Filter {

    private List<String> paths = Arrays.asList("/", "/control", "/index.jsp", "/error.jsp", "/result_page.jsp", "/table.jsp", "/access_error.jsp");

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws ServletException, IOException {
        HttpServletRequest servletRequest = (HttpServletRequest) request;
        String requestURI = servletRequest.getRequestURI();
        if (!paths.contains(requestURI)) {
            request.getRequestDispatcher("/error.jsp").forward(request, response);
        }
        chain.doFilter(request, response);
    }
}
