package com.atech.backend.response;

import lombok.Data;

@Data
public class ResponseMsg {
    private String code;
    private String msg;
    private Object data;

    public static ResponseMsg create(ResponseCode code, Object data) {
        ResponseMsg responseMsg = new ResponseMsg();
        responseMsg.setCode(code.getCode());
        responseMsg.setMsg(code.getMessage());
        responseMsg.setData(data);

        return responseMsg;
    }

    public static ResponseMsg create(ResponseCode code) {
        ResponseMsg responseMsg = new ResponseMsg();
        responseMsg.setCode(code.getCode());
        responseMsg.setMsg(code.getMessage());

        return responseMsg;
    }
}
