export const ERRORS = {
    firstName: {
        required: 'The first name is required',
        minLength: 'The first name must be at least 2 characters',
        maxLength: 'The first name must be at most 30 characters',
        onlySpaces: 'The first name cannot contain only spaces',
        onlyLetters: 'The first name must contain only letters and spaces'
    },
    lastName: {
        required: 'The last name is required',
        minLength: 'The last name must be at least 2 characters',
        maxLength: 'The last name must be at most 30 characters',
        onlySpaces: 'The last name cannot contain only spaces',
        onlyLetters: 'The last name must contain only letters'
    },
    email: {
        required: 'The email is required',
        minLength: 'The email must be at least 6 characters',
        maxLength: 'The email must be at most 100 characters',
        onlySpaces: 'The email cannot contain only spaces',
        invalid: 'The email is invalid'
    },
    password: {
        required: 'The password is required',
        minLength: 'The password must be at least 6 characters',
        maxLength: 'The password must be at most 30 characters',
        onlySpaces: 'The password cannot contain only spaces',
        lowerCaseLetter: 'The password must contain at least one lowercase letter',
        upperCaseLetter: 'The password must contain at least one uppercase letter',
        digit: 'The password must contain at least one digit'
    },
    confirmPassword: {
        required: 'The confirm password is required',
        minLength: 'The confirm password must be at least 6 characters',
        maxLength: 'The confirm password must be at most 30 characters',
        onlySpaces: 'The confirm password cannot contain only spaces',
        lowerCaseLetter: 'The confirm password must contain at least one lowercase letter',
        upperCaseLetter: 'The confirm password must contain at least one uppercase letter',
        digit: 'The confirm password must contain at least one digit'
    },
    username: {
        required: 'The username is required',
        minLength: 'The username must be at least 3 characters',
        maxLength: 'The username must be at most 30 characters',
        onlySpaces: 'The username cannot contain only spaces',
        invalidChars: 'The username can only contain dots, letters, numbers, and underscores'
    },
    birthDate: {
        required: 'Birth date is required',
        futureDate: 'Birth date cannot be in the future',
        tooYoung: 'You must be at least 13 years old'
    },
    avatar: {
        required: 'Avatar is required',
        tooLarge: 'Image size cannot exceed 5MB',
        invalidFormat: 'Only image files are allowed (jpg, jpeg, png)',
    },
    general: {
        network: 'Network error!',
        unknown: 'Unknown error, contact us if persists!',
        notAuthorized: 'You are not authorized to perform this action',
        passwordsNotTheSame: 'The passwords are not the same'
    }
};