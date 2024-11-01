import joi from 'joi'

const loginSchema = joi.object({
    email: joi.string().email({ tlds: false }).required().trim(),
    password: joi.string().required()
})

const validateLogin = (input) => {
    const { error } = loginSchema.validate(input, {
        abortEarly:false
    })

    if(error){
        const formatError = error.details.reduce((prev,curr) => {
            prev[curr.path[0]] = curr.message
            return prev
        },{})
        return formatError
    }
    return null
}

export default validateLogin