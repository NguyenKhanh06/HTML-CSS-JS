//giá trị mặc định cho tham số
function Validator(formSelector) {
    var _this = this;
    var formRules = {};

    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }


    //Quy ước: có lỗi -> return error message
    //ko có lỗi -> undefined
    var validatorRules = {
        required: function(value) {
            return value ? undefined : 'Vui lòng nhập trường này';
        },
        email: function(value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : 'Vui lòng nhập email';
        },
        min: function(min) {
            return function(value) {
                return value.length >= min ? undefined : `Vui lòng nhập tối thiểu ${min} ký tự`;
            }
        },
        max: function(max) {
            return function(value) {
                return value.length <= max ? undefined : `Vui lòng nhập tối thiểu ${max} ký tự`;
            }
        },
    };


    //lấy ra form element trong DOM theo 'formSelector'
    var formElement = document.querySelector(formSelector);

    //chỉ xử lý khi có element trong DOM
    if (formElement) {
        var inputs = formElement.querySelectorAll('[name][rules]')
        for (var input of inputs) {
            var rules = input.getAttribute('rules').split('|');
            for (var rule of rules) {
                var ruleInfo;
                var isRuleHasValue = rule.includes(':')
                if (isRuleHasValue) {
                    ruleInfo = rule.split(':');
                    rule = ruleInfo[0];
                }
                var ruleFunc = validatorRules[rule];
                if (isRuleHasValue) {
                    ruleFunc = ruleFunc(ruleInfo[1]);
                }
                if (Array.isArray(formRules[input.name])) {
                    formRules[input.name].push(ruleFunc)
                } else {
                    formRules[input.name] = [ruleFunc];
                }
            }

            //lắng nghe sự kiện để validate

            input.onblur = handleValidate;
            input.oninput = handleClearErrors;

            //hàm xử lý blur
            function handleValidate(event) {
                var rules = formRules[event.target.name]
                var erorrMessage;
                var formGroup = event.target.closest('.form-group')
                for (var rule of rules) {
                    switch (event.target.type) {
                        case 'checkbox':
                        case 'radio':
                            erorrMessage = rule(formElement.querySelector('input[name ="gender"]:checked'))
                            break;
                        default:
                            erorrMessage = rule(event.target.value)
                    }
                    if (erorrMessage) break;
                }
                if (erorrMessage) {
                    formGroup.classList.add('invalid')
                    formGroup.querySelector('.form-message').innerText = erorrMessage;
                } else {
                    formGroup.classList.remove('invalid')
                    formGroup.querySelector('.form-message').innerText = '';
                }
                return !erorrMessage;
            }

            function handleClearErrors(event) {
                var formGroup = getParent(event.target, '.form-group');
                if (formGroup.classList.contains('invalid')) {
                    formGroup.classList.remove('invalid');
                    var formMessage = formGroup.querySelector('.form-message');
                    if (formMessage) {
                        formMessage.innerText = '';
                    }
                }
            }
        }

        //xử lý submits form
        formElement.onsubmit = function(event) {
            event.preventDefault();
            var inputs = formElement.querySelectorAll('[name][rules]');
            var isValid = true;
            for (var input of inputs) {
                if (!handleValidate({ target: input })) {
                    isValid = false;
                }
            }
            //khi không có lỗi thì submits form
            if (isValid) {
                formElement.submit();
                if (typeof options.onsubmit == 'function') {
                    var enableInputs = formElement.querySelectorAll('[name]:not([disabled])');
                    var formValues = Array.from(enableInputs).reduce(function(values, input) {
                        switch (input.type) {
                            case 'radio':
                                values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
                                break;
                            case 'checkbox':
                                if (input.matches(':checked')) {
                                    values[input.name] = '';
                                    return values;
                                }
                                if (!Array.isArray(values[input.name])) {
                                    values[input.name] = [];
                                }
                                values[input.name].push(input.value)
                                break;
                            case 'file':
                                values[input.name] = input.files;
                                break;
                            default:
                                values[input.name] = input.value;
                        }
                        return values;
                    }, {});

                    //gọi lại hàm onsubmit và trả về kèm giá trị
                    _this.onSubmit();
                } else {
                    formElement.submit();
                }
            }
        }

    }

}