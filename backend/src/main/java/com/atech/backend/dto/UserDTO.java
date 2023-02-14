package com.atech.backend.dto;
import com.atech.backend.repository.question.Question;
import com.atech.backend.repository.solution.Solution;
import com.atech.backend.repository.user.User;
import lombok.*;

@Data
public class UserDTO {

    @Getter
    @AllArgsConstructor
    @Builder
    public static class UserRes{
        private String userId;
        private String name;
        private String position;
        private String tel;
        private String email;
        private String belong;
        private String roleId;
        private String roleName;
    }

    @Getter
    @AllArgsConstructor
    @Builder
    public static class UserInfoRes{
        private String userId;
        private String name;
        private String position;
        private String tel;
        private String email;
        private String belong;
        private String roleId;
        private String roleName;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    @ToString
    public static class UserReq{
        private String userId;
        private String userPass;
        private String name;
        private String position;
        private String tel;
        private String email;
        private String belong;

        public User toEntity(){
            return User.builder()
                    .userId(this.userId)
                    .userPass(this.userPass)
                    .name(this.name)
                    .position(this.position)
                    .tel(this.tel)
                    .email(this.email)
                    .belong(this.belong)
                    .build();
        }

    }
}
