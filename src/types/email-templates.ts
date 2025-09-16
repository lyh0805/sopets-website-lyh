export type Platform = 'ios' | 'android';

export interface BetaWelcomeEmailData {
    userName: string;
    platform: Platform;
    playStoreLink?: string;  // Required for Android
    testFlightLink?: string; // Required for iOS
}

export interface EmailTemplate {
    subject: string;
    body: string;
}

export const EMAIL_TEMPLATES = {
    BETA_WELCOME: {
        base: '/assets/email-templates/beta-welcome-base.html',
        android: '/assets/email-templates/beta-welcome-android.html',
        ios: '/assets/email-templates/beta-welcome-ios.html',
    }
} as const; 