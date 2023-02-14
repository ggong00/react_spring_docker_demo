package com.atech.backend.repository.question;

import java.util.List;

public interface QuestionDAO {

    void insert(Question question);

    List<Question> findAll(String status);

    Integer changeStatus(String status, Long questionId);

    Integer deleteQuestion(Long questionId);
}
