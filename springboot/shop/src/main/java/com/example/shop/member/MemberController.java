package com.example.shop.member;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@Controller
@RequiredArgsConstructor
public class MemberController {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    @GetMapping("/register")
    public String register() {
        return "register.html";
    }

    @PostMapping("/member")
    String addMember( String username, String password, String displayName){
        Member member = new Member();
        member.setUsername(username);
        member.setPassword(passwordEncoder.encode(password));
        member.setDisplayName(displayName);
        memberRepository.save(member);

        return "redirect:/list";
    }

    @GetMapping("/login")
    public String login(){
         return "login.html";
    }

    @GetMapping("/my-page")
    public String mypage(Authentication auth){
        CustomUser result = (CustomUser) auth.getPrincipal();
        System.out.println(result.displayName);
        return "mypage.html";
    }

    @GetMapping("/v1/user/1")
    @ResponseBody
    public MemberDto getUser(){
        var a = memberRepository.findById(7L);
        var result = a.get();
        var data = new MemberDto(result.getUsername(), result.getDisplayName());
        return data;
    }

    @GetMapping("/v2/user/1")
    @ResponseBody
    public MemberDto getUser2(){
        var a = memberRepository.findById(7L);
        var result = a.get();
        var data = new MemberDto(result.getUsername(), result.getDisplayName());
        return data;
    }

    @PostMapping("/login/jwt")
    @ResponseBody
    public String loginJWT(@RequestBody Map<String, String> data,
                           HttpServletResponse response){

        var authToken = new UsernamePasswordAuthenticationToken(
                data.get("username"), data.get("password")
        );
        var auth = authenticationManagerBuilder.getObject().authenticate(authToken);
        SecurityContextHolder.getContext().setAuthentication(auth);

        var jwt = JwtUtil.createToken(SecurityContextHolder.getContext().getAuthentication());
        System.out.println(jwt);

        var cookie = new Cookie("jwt", jwt);
        cookie.setMaxAge(10);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        response.addCookie(cookie);

        return jwt;
    }

    @GetMapping("/my-page/jwt")
    @ResponseBody
    String mypageJWT(Authentication auth){

        var user = (CustomUser) auth.getPrincipal();

        System.out.println(user);
        System.out.println(user.displayName);
        System.out.println(user.getAuthorities());

        return "마이페이지데이터";
    }
}

class MemberDto {
    public String username;
    public String displayName;
    MemberDto(String a, String b){
        this.username = a;
        this.displayName = b;
    }
}