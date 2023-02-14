package com.atech.backend.service.question;

import com.atech.backend.dto.QuestionDTO;
import com.atech.backend.mail.MailDto;
import com.atech.backend.repository.question.Question;

import javax.mail.MessagingException;
import java.io.IOException;
import java.util.List;

public interface QuestionService {

    void insert(QuestionDTO.QuestionReq questionReq);

    List<QuestionDTO.QuestionRes> findAll(String status);

    Integer deleteQuestion(Long questionId);

    void sendMail(MailDto mailDto) throws MessagingException, IOException;

}
