package com.atech.backend.repository.question;

import com.atech.backend.dto.QuestionDTO;
import com.atech.backend.repository.solution.Solution;
import com.atech.backend.repository.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Question {

    public final static String STATUS_SUCCESS = "SUCCESS";
    public final static String STATUS_DELETE = "DELETE";
    public final static String STATUS_NEW = "NEW";
    public final static String STATUS_ALL = "ALL";

    private Long questionId;
    private Solution solution;
    private String belong;
    private String name;
    private String position;
    private String tel;
    private String email;
    private String title;
    private String contents;
    private LocalDateTime createDtm;
    private String resYn;

    public QuestionDTO.QuestionRes toQuestionRes () {
        return QuestionDTO.QuestionRes
                .builder()
                .questionId(this.questionId)
                .solutionId(this.solution.getSolutionId())
                .solutionName(this.solution.getSolutionName())
                .name(this.name)
                .position(this.position)
                .tel(this.tel)
                .email(this.email)
                .belong(this.belong)
                .title(this.title)
                .contents(this.contents)
                .resYn(this.resYn)
                .createDtm(this.createDtm.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")))
                .build();
    }
}
