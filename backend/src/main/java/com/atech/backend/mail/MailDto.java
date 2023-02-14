package com.atech.backend.mail;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;


@Getter
@Setter
@ToString
@NoArgsConstructor
public class MailDto {
    private Long questionId;
    private String email;
    private String mailTitle;
    private String message;
    private List<MultipartFile> attachFileList = new ArrayList<>();
}
