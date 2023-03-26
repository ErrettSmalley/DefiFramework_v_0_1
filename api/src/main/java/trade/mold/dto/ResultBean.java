package trade.mold.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class ResultBean implements Serializable {

    private Integer code;

    private String msg;

    private Object result;

    private static Integer DEFAULT_CODE_SUC = 0;
    private static Integer DEFAULT_CODE_FAIL = 3;
    private static String DEFAULT_MSG = "suc";

    public static ResultBean suc() {
        return ResultBean.suc(DEFAULT_CODE_SUC, null, DEFAULT_MSG);
    }

    public static ResultBean suc(Object data) {
        return ResultBean.suc(DEFAULT_CODE_SUC, data, DEFAULT_MSG);
    }

    public static ResultBean suc(Integer code, Object data, String msg) {
        ResultBean resultBean = new ResultBean();
        resultBean.code = code;
        resultBean.result = data;
        resultBean.msg = msg;
        return resultBean;
    }

    public static ResultBean fail() {
        ResultBean resultBean = new ResultBean();
        resultBean.code = DEFAULT_CODE_FAIL;
        return resultBean;
    }

    public static ResultBean fail(String msg) {
        ResultBean resultBean = new ResultBean();
        resultBean.code = DEFAULT_CODE_FAIL;
        resultBean.msg = msg;
        return resultBean;
    }

    public static ResultBean fail(Integer code, String msg) {
        ResultBean resultBean = new ResultBean();
        resultBean.code = code;
        resultBean.msg = msg;
        return resultBean;
    }

}
