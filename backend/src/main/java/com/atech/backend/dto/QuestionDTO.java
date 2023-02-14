package com.atech.backend.dto;

import com.atech.backend.repository.question.Question;
import com.atech.backend.repository.solution.Solution;
import com.atech.backend.repository.user.User;
import lombok.*;

@Data
public class QuestionDTO {

    @Getter
    @AllArgsConstructor
    @Builder
    public static class QuestionRes {
        private Long questionId;
        private Long solutionId;
        private String userId;
        private String solutionName;
        private String belong;
        private String name;
        private String position;
        private String tel;
        private String email;
        private String title;
        private String contents;
        private String resYn;
        private String createDtm;
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    @ToString
    public static class QuestionReq {
        private Long questionId;
        private Long solutionId;
        private String belong;
        private String name;
        private String position;
        private String tel;
        private String email;
        private String title;
        private String contents;

        public Question toEntity(){
            Solution solution = new Solution();
            solution.setSolutionId(this.solutionId);

            return Question.builder()
                    .questionId(this.questionId)
                    .solution(solution)
                    .name(this.name)
                    .position(this.position)
                    .tel(this.tel)
                    .email(this.email)
                    .belong(this.belong)
                    .title(this.title)
                    .contents(this.contents)
                    .build();
        }

    }
}
