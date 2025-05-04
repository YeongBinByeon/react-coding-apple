package com.example.shop.member;

import io.jsonwebtoken.Claims;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;

public class JwtFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        Cookie[] cookies = request.getCookies();
        if(cookies == null){
            filterChain.doFilter(request, response);
            return;
        }

        var jwtCookie = "";
        for (int i=0; i<cookies.length; i++){
            if("jwt".equals(cookies[i].getName())){
                jwtCookie = cookies[i].getValue();
            }
        }

        Claims claim;
        try{
            claim = JwtUtil.extractToken(jwtCookie);
        } catch (Exception e){
            filterChain.doFilter(request, response);
            return;
        }

        var arr = claim.get("authorities").toString().split(",");
        var authorities = Arrays.stream(arr).map( a -> new SimpleGrantedAuthority(a)).toList();

        var customUser = new CustomUser(
                claim.get("username").toString(),
                "none",
                authorities
        );
        customUser.displayName = claim.get("displayName").toString();

        var authToken = new UsernamePasswordAuthenticationToken(
                customUser, ""
        );
        authToken.setDetails(new WebAuthenticationDetailsSource()
                .buildDetails(request)
        );
        SecurityContextHolder.getContext().setAuthentication(authToken);


        //요청들어올때마다 실행할코드~~
        filterChain.doFilter(request, response);
    }

}
