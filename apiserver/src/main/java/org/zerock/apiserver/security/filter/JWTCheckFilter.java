package org.zerock.apiserver.security.filter;

import com.google.gson.Gson;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import org.zerock.apiserver.dto.MemberDTO;
import org.zerock.apiserver.util.JWTUtil;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;


@Log4j2
public class JWTCheckFilter extends OncePerRequestFilter {


    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String path = request.getRequestURI();

        log.info("------check uri--------- " + path);

        // JWT 인증을 건너뛰어야 할 경로들
        if (
                path.startsWith("/api/member/") ||
                        path.equals("/") ||
                        path.equals("/index.html") ||
                        path.equals("/favicon.ico") ||
                        path.equals("/manifest.json") ||
                        path.startsWith("/static/") ||
                        path.startsWith("/js/") ||
                        path.startsWith("/css/") ||
                        path.startsWith("/images/")
        ) {
            return true; // ✅ 필터 건너뜀
        }

        return false; // JWT 검사 진행
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        log.info("----------------------");
        log.info("----------------------");
        log.info("----------------------");

        String authHeaderStr = request.getHeader("Authorization");

        // ✅ Authorization 헤더가 없거나 Bearer로 시작하지 않는다면 차단 또는 통과 처리
        if (authHeaderStr == null || !authHeaderStr.startsWith("Bearer ")) {
            log.error("JWT Check Error -------------------- (헤더 없음 또는 Bearer 아님)");

            // 정적 리소스나 index.html 요청이라면 그냥 통과시키기
            String path = request.getRequestURI();
            if (path.equals("/") || path.equals("/index.html") || path.equals("/favicon.ico")) {
                filterChain.doFilter(request, response); // 그냥 통과
                return;
            }

            // 그 외에는 에러 응답
            Gson gson = new Gson();
            String msg = gson.toJson(Map.of("error", "ERROR_NO_AUTH_HEADER"));

            response.setContentType("application/json");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            PrintWriter printWriter = response.getWriter();
            printWriter.println(msg);
            printWriter.close();
            return;
        }

        try {
            String accessToken = authHeaderStr.substring(7);
            Map<String, Object> claims = JWTUtil.validateToken(accessToken);
            log.info("JWT claims: " + claims);

            String email = (String) claims.get("email");
            String pw = (String) claims.get("pw");
            String nickname = (String) claims.get("nickname");
            Boolean social = (Boolean) claims.get("social");
            List<String> roleNames = (List<String>) claims.get("roleNames");

            MemberDTO memberDTO = new MemberDTO(email, pw, nickname, social.booleanValue(), roleNames);

            log.info("---------------------------------");
            log.info(memberDTO);
            log.info(memberDTO.getAuthorities());

            UsernamePasswordAuthenticationToken authenticationToken
                    = new UsernamePasswordAuthenticationToken(memberDTO, pw, memberDTO.getAuthorities());

            SecurityContextHolder.getContext().setAuthentication(authenticationToken);

            filterChain.doFilter(request, response);

        } catch (Exception e) {
            log.error("JWT Check Error --------------------");
            log.error(e.getMessage());

            Gson gson = new Gson();
            String msg = gson.toJson(Map.of("error", "ERROR_ACCESS_TOKEN"));

            response.setContentType("application/json");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            PrintWriter printWriter = response.getWriter();
            printWriter.println(msg);
            printWriter.close();
        }
    }



}
