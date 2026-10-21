export const ROUTES = {
    EMPTY: {
        path: ''
    },
    GLOBAL: {
        path: ''
    },
    HOME: {
        path: '/',
        title: 'Home',
    },
    REGISTER: {
        path: '/register',
        title: 'Register',
    },
    ACTIVATE: {
        path: '/activate',
        title: 'Activate',
    },
    CONFIRM_CHANGE_EMAIL: {
        path: '/app/confirm-change-email',
        title: 'Confirm change email',
    },
    CONFIRM_CHANGE_PASSWORD: {
        path: '/app/confirm-change-password',
        title: 'Confirm change password',
    },
    LOGIN: {
        path: '/login',
        title: 'Login',
    },
    LOGOUT: {
        path: '/logout',
        title: 'Logout',
    },
    FORGOT_PASSWORD: {
        path: '/forgot-password',
        title: 'Forgot Password',
    },
    RESET_PASSWORD: {
        path: '/reset-password',
        title: 'Reset Password',
        create: (token: string) => `/reset-password?token=${token}`,
    },
    ACCOUNT_SETTINGS: {
        path: '/app/account-settings',
        title: 'Account Settings',
        create: (section: string) => `/account-settings/${section}`,
    },
    AUTH_ADMIN: {
        path: '/admin',
        title: 'Admin'
    },
    MANAGE_EVENTS: {
        path: '/admin/manage-events',
        relative: 'manage-events',
        title: 'Manage Events'
    },
    CREATE_EVENT: {
        path: '/admin/create-event',
        relative: 'create-events',
        title: 'Create Event'
    },
    EVENT: {
        path: '/events/:id',
        title: 'Account Settings',
        create: (id: string) => `/events/${id}`
    },
    STATIC_IMAGES: {
        path: '/static/uploads/images',
        create: (imageUri: string) => `/static/uploads/images/${imageUri}`
    },
    STATIC_GALLERY: {
        path: '/static/uploads/gallery',
        create: (imageUri: string) => `/static/uploads/gallery/${imageUri}`
    },
    EVENTS: {
        path: '/app/events'
    },
    NEARBY_EVENTS: {
        path: '/app/nearby-events'
    }
} as const;