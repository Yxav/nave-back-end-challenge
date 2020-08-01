const errors = [];

function ValidationContract() {
    errors = []
}

ValidationContract.prototype.isRequired = (value, message) => {
    if (!value || value.length < 0) {
        errors.push({ message: message })
    }
}

ValidationContract.prototype.isEqualPassword = (value1, value2, message) => {
    if (value1 != value2) {
        errors.push({ message: message })
    }
}

ValidationContract.prototype.isEmail = (value, message) => {
    var reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)
    if (!reg.test(value)) {
        errors.push({ message: message })
    }
}

ValidationContract.prototype.erros = () => {
    return errors
}


ValidationContract.prototype.clear = () => {
    errors = []
}



ValidationContract.prototype.isValid = () {
    return errors.length == 0;
}


module.exports = ValidationContract;