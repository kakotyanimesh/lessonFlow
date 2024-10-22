const z = require('zod')

const signUpObject = z.object({
    email : z.string().email({ message : 'provide a valid email address'}),
    username : z.string().min(5, {message : 'min 5 character is needed'}).max(20, {message : 'max 20 character is allowed'}),
    password :  z.string()
                 .min(8, { message: 'Password must be at least 8 characters long.' })
                 .max(20, { message: 'Password must not exceed 20 characters.' })
                 .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter.' })
                 .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter.' })
                 .regex(/[\W_]/, { message: 'Password must contain at least one special character (e.g., !@#$%^&*()_+).' })
                 .regex(/[0-9]/, { message: 'Password must contain at least one number.' }),
    fullName : z.string()
})

const signInObject = z.object({
    email: z.string().email({message : 'Provide a valid email'}),
    password :  z.string()
                 .min(8, { message: 'Password must be at least 8 characters long.' })
                 .max(20, { message: 'Password must not exceed 20 characters.' })
                 .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter.' })
                 .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter.' })
                 .regex(/[\W_]/, { message: 'Password must contain at least one special character (e.g., !@#$%^&*()_+).' })
                 .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
})


const lessonPlanObject = z.object({
    subject : z.string().min(1, {message : 'subject is required'}),
    grade : z.number().int({message : 'grade must be a number'}),
    duration : z.number()
})


module.exports =  {
    signUpObject,
    signInObject,
    lessonPlanObject
}