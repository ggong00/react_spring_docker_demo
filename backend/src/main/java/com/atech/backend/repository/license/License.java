package com.atech.backend.repository.license;

import lombok.Data;

@Data
public class License {
    private Long licenseId;
    private String basic;
    private String premium;
    private String custom;
    private String type;
}
