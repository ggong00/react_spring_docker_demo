package com.atech.backend.service.question;

import com.atech.backend.dto.QuestionDTO;
import com.atech.backend.mail.MailDto;
import com.atech.backend.mail.MailService;
import com.atech.backend.repository.question.Question;
import com.atech.backend.repository.question.QuestionDAO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class QuestionServiceImpl implements QuestionService{

    final private QuestionDAO questionDAO;
    final private MailService mailService;

    @Override
    public void insert(QuestionDTO.QuestionReq questionReq) {
        questionDAO.insert(questionReq.toEntity());
    }

    @Override
    public List<QuestionDTO.QuestionRes> findAll(String status) {
        List<Question> questionList = questionDAO.findAll(status);
        List<QuestionDTO.QuestionRes> questionResList = questionList.stream()
                .map(Question::toQuestionRes)
                .collect(Collectors.toList());

        return questionResList;
    }

    @Override
    public Integer deleteQuestion(Long questionId) {
        return questionDAO.deleteQuestion(questionId);
    }

    @Override
    public void sendMail(MailDto mailDto) throws MessagingException, IOException {
        //메일 전송
        String mailHTML = mailService.createMailHTML(mailDto);
        mailDto.setMessage(mailHTML);
        mailService.sendMail(mailDto);

        //문의글 상태 변경
        Integer resultCnt2 = questionDAO.changeStatus(Question.STATUS_SUCCESS, mailDto.getQuestionId());
    }
}
