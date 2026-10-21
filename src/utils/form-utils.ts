class FormUtils {
    public static isInvalid(data: Record<string, any>, errors: Record<string, string>): boolean {
        const hasEmptyFields = Object.keys(data).some(key => {
            const value = data[key];

            if (Array.isArray(value)) {
                return value.length === 0;
            }

            if (typeof value === 'string') {
                return value.trim() === '';
            }

            return false;
        });

        const hasErrors = Object.keys(errors).some(key => errors[key] !== '');

        return hasEmptyFields || hasErrors;
    }
}

export default FormUtils;