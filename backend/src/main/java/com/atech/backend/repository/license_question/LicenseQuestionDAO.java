package com.atech.backend.repository.license_question;

import com.atech.backend.repository.question.Question;

import java.util.List;

public interface LicenseQuestionDAO {

    void insert(LicenseQuestion licenseQuestion, String type);

    List<LicenseQuestion> findAll(String status);

    Integer changeStatus(String status, Long LicenseQuestionId);

    Integer deleteQuestion(Long LicenseQuestionId);
}
