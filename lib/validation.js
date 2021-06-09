export function validate(formData, rules) {
    const errors = {};

    for (const key in rules) {
        const validator = rules[key];
        const validationResult = validator(formData.get(key));

        if (validationResult !== true) {
            errors[key] = validationResult;
        }
    }

    if (Object.keys(errors).length === 0) {
        return true;
    }

    return errors;
}

export function makeValidator(validator, errorMessage) {
    return function(...args) {
        if (validator(...args)) {
            return true;
        }

        return errorMessage;
    };
};

export class Validators {
    static notEmpty = value => value
    static email = value => /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value)
}
