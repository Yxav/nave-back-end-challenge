var errors = [];

const validationService = function() {
    errors = [];
}
validationService.prototype.isName = function(value) {
    var reg = new RegExp(/[a-z]$/);

    if (!reg.test(value)) {
        errors.push({ message: "This value must be a string" });
    }
}

validationService.prototype.isEmail = function(value) {

    var reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
    if (!reg.test(value)) {
        errors.push({ message: "This value must be a valid email" });

    }

}
validationService.prototype.isDate = function(value) {

    var reg = new RegExp(/(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/);
    if (!reg.test(value)) {
        errors.push({ message: "This value must be a valid date" });

    }
}

validationService.prototype.isString = function(value) {
    var reg = new RegExp(/[a-zA-Z0-9]+/g);

    if (!reg.test(value.trim(" "))) {
        errors.push({ message: "This value must be a valid string, only letters and numbers" });

    }
}

validationService.prototype.isArray = function(value) {

    if (!Array.isArray(value)) {
        errors.push({ message: "This value must be an array" });

    }
}

validationService.prototype.errors = () => {
    return errors;
}

validationService.prototype.clear = () => {
    errors = [];
}

validationService.prototype.isValid = () => {
    return errors.length == 0


}

module.exports = validationService;