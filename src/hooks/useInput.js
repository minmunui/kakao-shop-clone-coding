import {useState} from "react";

const PW_REGEX = new RegExp("^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$");
const EMAIL_REGEX = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");
const NAME_REGEX = new RegExp("^[가-힣]{2,}$");

const ERROR_MSG = {
    required: "필수 입력사항입니다.",
    password: "8~20자 영문 대 소문자, 특수문자(!@#$%^*+=-)를 사용하세요.",
    passwordConfirm: "비밀번호가 일치하지 않습니다.",
    email: "이메일 형식이 올바르지 않습니다.",
    username: "이름은 2자 이상이어야 합니다.",
};

const useInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);
    const [errorMsg, setErrorMsg] = useState(() => {
            const initErrorMsg = {};
            Object.keys(initialValue).forEach((key) => {
                    initErrorMsg[key] = "";
                }
            )
            return initErrorMsg;
        }
    )

    const handleOnChange = (event) => {
        const {id, value} = event.target;
        // console.log(id, value)
        setValue((prev) => {
            // console.log(prev);
            return {...prev, [id]: value}
        })
    };

    const constraints = {
        email: (input) => EMAIL_REGEX.test(input),
        username: (input) => NAME_REGEX.test(input),
        password: (input) => PW_REGEX.test(input),
        passwordConfirm: (input) => input === value.password
    }

    const validateInput = (id) => {
        const input = value[id];
        if (input === "") {
            setErrorMsg((prev) => {
                return {...prev, [id]: ERROR_MSG.required}
            })
            return false;
        }
        else {
            if (constraints[id](input)) {
                setErrorMsg((prev) => {
                    return {...prev, [id]: ""}
                })
                return true;
            } else {
                setErrorMsg((prev) => {
                    return {...prev, [id]: ERROR_MSG[id]}
                })
                return false;
            }
        }
    }

    return {value, handleOnChange, errorMsg, validateInput};
}



export default useInput;