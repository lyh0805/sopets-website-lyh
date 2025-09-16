import fs from 'fs';
import path from 'path';
import { BetaWelcomeEmailData, EmailTemplate, Platform } from '../types/email-templates';

export async function renderBetaWelcomeEmail(data: BetaWelcomeEmailData): Promise<EmailTemplate> {
    try {
        // Read base template
        const baseTemplate = await fs.promises.readFile(
            path.join(process.cwd(), 'src/assets/email-templates/beta-welcome-base.html'),
            'utf-8'
        );

        // Read platform-specific content
        const platformTemplate = await fs.promises.readFile(
            path.join(process.cwd(), `src/assets/email-templates/beta-welcome-${data.platform}.html`),
            'utf-8'
        );

        // Replace variables in platform-specific content
        let platformContent = platformTemplate;
        if (data.platform === 'android' && data.playStoreLink) {
            platformContent = platformContent.replace('{{playStoreLink}}', data.playStoreLink);
        } else if (data.platform === 'ios' && data.testFlightLink) {
            platformContent = platformContent.replace('{{testFlightLink}}', data.testFlightLink);
        }

        // Replace variables in base template
        let finalTemplate = baseTemplate
            .replace('{{userName}}', data.userName)
            .replace('{{platformContent}}', platformContent);

        return {
            subject: `Welcome to SoPets Beta, ${data.userName}! 🎉`,
            body: finalTemplate,
        };
    } catch (error) {
        console.error('Error rendering beta welcome email:', error);
        throw error;
    }
}

export async function renderThankYouEmail(userName: string): Promise<EmailTemplate> {
  try {
    const template = await fs.promises.readFile(
      path.join(process.cwd(), 'src/assets/email-templates/beta-thank-you.html'),
      'utf-8'
    );

    const finalTemplate = template.replace('{{userName}}', userName);

    return {
      subject: `Thank You for Joining SoPets Beta! 🎉`,
      body: finalTemplate,
    };
  } catch (error) {
    console.error('Error rendering thank you email:', error);
    throw error;
  }
}

// Example usage:
/*
const emailData = await renderBetaWelcomeEmail({
    userName: 'John',
    platform: 'ios',
    testFlightLink: 'https://testflight.apple.com/join/xxxxx'
});

// Send email using your preferred email service
sendEmail({
    to: 'user@example.com',
    subject: emailData.subject,
    html: emailData.body
});
*/ 