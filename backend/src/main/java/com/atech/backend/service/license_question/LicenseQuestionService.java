package com.atech.backend.service.license_question;

import com.atech.backend.dto.LicenseDTO;
import com.atech.backend.dto.LicenseQuestionDTO;
import com.atech.backend.dto.QuestionDTO;
import com.atech.backend.mail.MailDto;

import javax.mail.MessagingException;
import java.io.IOException;
import java.util.List;

public interface LicenseQuestionService {

    void insert(LicenseQuestionDTO.LicenseQuestionReq licenseQuestionReq);

    List<LicenseQuestionDTO.LicenseQuestionRes> findAll(String status);

    Integer deleteQuestion(Long licenseQuestionId);

    void sendMail(MailDto mailDto) throws MessagingException, IOException;

}
