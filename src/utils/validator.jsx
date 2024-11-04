import joi from 'joi'

const validate = {}

const loginSchema = joi.object({
    email: joi.string().email({ tlds: false }).required().trim(),
    password: joi.string().required()
})

const registerSchema = joi.object({
    email: joi.string().email({ tlds: false }).required().messages({ "string.empty": "Email is required" }),
    password: joi.string().required().pattern(/[0-9a-zA-Z]{6,}$/).messages(
        {
            "string.empty": "Password is required",
            "string.pattern.base": "password must contain a-z A-Z 0-9 and must be at least 6 characters"
        }
    ),
    confirmPassword: joi.string().required().valid(joi.ref("password"))
        .messages({
            "string.empty": "Confirm password is required",
            "any.only": "Password and confirm password is not match"
        }),
    firstname: joi.string().required().messages({ "string.empty": "First name is required" }),
    lastname: joi.string().required().messages({ "string.empty": "Last name is required" }),
    displayName: joi.string().required().messages({ "string.empty": "Display name is required" }),
})

validate.validateLogin = (input) => {
    const { error } = loginSchema.validate(input, {
        abortEarly: false
    })

    if (error) {
        const formatError = error.details.reduce((prev, curr) => {
            prev[curr.path[0]] = curr.message
            return prev
        }, {})
        return formatError
    }
    return null
}
validate.validateRegister = (input) => {
    const { error } = registerSchema.validate(input, {
        abortEarly: false
    })

    if (error) {
        const formatError = error.details.reduce((prev, curr) => {
            prev[curr.path[0]] = curr.message
            return prev
        }, {})
        return formatError
    }
    return null
}


// export default validateSchema(loginSchema)
// export default validateLogin
export default validate