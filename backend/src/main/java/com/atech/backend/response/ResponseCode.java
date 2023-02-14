package com.atech.backend.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@AllArgsConstructor
@ToString
@Getter
public enum ResponseCode {
    SUCCESS("00","응답이 정상적으로 이루어졌습니다."),
    FAIL("-1", "응답에 문제가 생겼습니다."),
    VALIDATION_ERROR("01","검증에 문제가 생겼습니다."),
    DATA_NOT_FOUND_ERROR("02","값을 찾을수 없습니다."),
    LOGIN_SUCCESS("03","로그인 성공"),
    LOGIN_FAIL("04","로그인 실패"),
    USER_DUPL("05","이미 계정이 존재합니다."),
    USER_MISS("05-2","라이선스를 지급하려면 사이트 계정이 필요합니다."),
    ID_DUPL("06","ID가 중복됩니다."),
    LOGOUT_SUCCESS("07","로그아웃에 성공했습니다."),
    MAIL_TO_NOTFOUND("08", "메일주소를 찾을 수 없습니다."),
    SERVER_ERROR("99","서버에 문제가 생겼습니다.");

    private String code;
    private String message;
}
