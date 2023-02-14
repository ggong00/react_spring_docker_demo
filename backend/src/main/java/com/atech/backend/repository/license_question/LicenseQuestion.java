package com.atech.backend.repository.license_question;

import com.atech.backend.dto.LicenseQuestionDTO;
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
public class LicenseQuestion {

    public final static String STATUS_SUCCESS = "SUCCESS";
    public final static String STATUS_DELETE = "DELETE";
    public final static String STATUS_NEW = "NEW";
    public final static String STATUS_ALL = "ALL";

    private Long licenseQuestionId;
    private Solution solution;
    private User user;
    private String title;
    private String contents;
    private LocalDateTime createDtm;
    private String resYn;
    private String licenseType;

    public LicenseQuestionDTO.LicenseQuestionRes toLicenseQuestionRes () {
        return LicenseQuestionDTO.LicenseQuestionRes
                .builder()
                .licenseQuestionId(this.getLicenseQuestionId())
                .solutionId(this.solution.getSolutionId())
                .solutionName(this.solution.getSolutionName())
                .userId(this.user.getUserId())
                .name(this.user.getName())
                .position(this.user.getPosition())
                .tel(this.user.getTel())
                .email(this.user.getEmail())
                .belong(this.user.getBelong())
                .title(this.title)
                .contents(this.contents)
                .resYn(this.resYn)
                .createDtm(this.createDtm.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")))
                .licenseType(this.licenseType)
                .build();
    }
}
