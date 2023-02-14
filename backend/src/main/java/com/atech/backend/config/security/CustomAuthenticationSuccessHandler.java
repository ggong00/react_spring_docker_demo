package com.atech.backend.config.security;

import com.atech.backend.repository.user.User;
import com.atech.backend.response.ResponseCode;
import com.atech.backend.response.ResponseMsg;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Component
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
    private final ObjectMapper objectMapper;
    private final ResponseMsg responseMsg;

    public CustomAuthenticationSuccessHandler() {
        Jackson2ObjectMapperBuilder builder = new Jackson2ObjectMapperBuilder();
        this.objectMapper = builder.build();
        this.responseMsg = ResponseMsg.create(ResponseCode.LOGIN_SUCCESS);
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse res, Authentication authentication) throws IOException, ServletException {
        HttpSession session = request.getSession();
        res.setContentType("application/json;charset=UTF-8");
        res.setStatus(HttpServletResponse.SC_OK);
        HashMap<String, Object> data = new HashMap<>();
        List<String> roleList = authentication
                .getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        User user = (User) authentication.getPrincipal();
        data.put("role", user.getRole().getRoleName());
        data.put("userId", user.getUserId());
        this.responseMsg.setData(data);
        res.getWriter().write(objectMapper.writeValueAsString(this.responseMsg));
    }
}