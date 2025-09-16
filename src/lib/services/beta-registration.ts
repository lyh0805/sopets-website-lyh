import { supabase } from '../supabase/client';
import { renderThankYouEmail } from '@/utils/email-utils';

export class BetaRegistrationError extends Error {
  constructor(message: string, public originalError?: any) {
    super(message);
    this.name = 'BetaRegistrationError';
  }
}

async function retry<T>(
  operation: () => Promise<T>,
  retries = 3,
  delay = 1000
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    if (retries === 0) throw error;
    
    console.log(`Retrying operation, ${retries} attempts remaining...`);
    await new Promise(resolve => setTimeout(resolve, delay));
    return retry(operation, retries - 1, delay * 1.5);
  }
}

async function sendThankYouEmail(email: string, discordUsername: string) {
  try {
    const emailTemplate = await renderThankYouEmail(discordUsername);
    
    // Here you would integrate with your email service (e.g., SendGrid, AWS SES)
    // For now, we'll just log the email
    console.log('Sending thank you email:', {
      to: email,
      subject: emailTemplate.subject,
      // body: emailTemplate.body
    });

    // Update the welcome_email_sent status
    const { error } = await supabase
      .from('beta_registrations')
      .update({ welcome_email_sent: true })
      .eq('email', email);

    if (error) {
      console.error('Error updating welcome_email_sent status:', error);
    }
  } catch (error) {
    console.error('Error sending thank you email:', error);
    // Don't throw here - we don't want to fail the registration if email fails
  }
}

export async function checkExistingRegistration(email: string): Promise<boolean> {
  try {
    console.log('Checking existing registration for:', email);
    
    const result = await retry(async () => {
      const { data, error } = await supabase
        .from('beta_registrations')
        .select('id')
        .eq('email', email)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found
        console.error('Supabase error checking registration:', error);
        throw new BetaRegistrationError(`Database error: ${error.message}`, error);
      }

      return !!data;
    });

    return result;
  } catch (error) {
    console.error('Error in checkExistingRegistration:', error);
    if (error instanceof BetaRegistrationError) {
      throw error;
    }
    throw new BetaRegistrationError('Failed to check existing registration', error);
  }
}

export async function createBetaRegistration(data: {
  email: string;
  discord_username: string;
  telegram_handle: string;
  playstyle: string;
  playstyle_other?: string;
  discovery_source: string;
  discovery_source_other?: string;
  game_genres: string[];
  game_genres_other?: string;
}) {
  try {
    console.log('Creating beta registration:', data);

    const { data: registration, error } = await supabase
      .from('beta_registrations')
      .insert([
        {
          ...data,
          status: 'pending',
          welcome_email_sent: false
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating beta registration:', error);
      throw new BetaRegistrationError(
        error.message.includes('duplicate key')
          ? 'This email has already been registered for the beta program.'
          : `Database error: ${error.message}`,
        error
      );
    }

    // Send thank you email
    await sendThankYouEmail(data.email, data.discord_username);

    return registration;
  } catch (error) {
    console.error('Error in createBetaRegistration:', error);
    if (error instanceof BetaRegistrationError) {
      throw error;
    }
    throw new BetaRegistrationError('Failed to create beta registration', error);
  }
}

export async function getBetaRegistration(email: string): Promise<any | null> { // Changed type to any as BetaRegistration type is removed
  try {
    console.log('Getting beta registration for:', email);
    
    const result = await retry(async () => {
      const { data, error } = await supabase
        .from('decrypted_beta_registrations')
        .select('*')
        .eq('email', email)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Supabase error fetching registration:', error);
        throw new BetaRegistrationError(`Database error: ${error.message}`, error);
      }

      return data;
    });

    return result;
  } catch (error) {
    console.error('Error in getBetaRegistration:', error);
    if (error instanceof BetaRegistrationError) {
      throw error;
    }
    throw new BetaRegistrationError('Failed to fetch registration', error);
  }
}

export async function updateBetaRegistrationStatus(
  id: string,
  status: any // Changed type to any as BetaRegistration type is removed
): Promise<void> {
  const { error } = await supabase
    .from('beta_registrations')
    .update({ status })
    .eq('id', id);

  if (error) {
    throw new BetaRegistrationError(`Error updating status: ${error.message}`);
  }
}

export async function markWelcomeEmailSent(id: string): Promise<void> {
  const { error } = await supabase
    .from('beta_registrations')
    .update({ welcome_email_sent: true })
    .eq('id', id);

  if (error) {
    throw new BetaRegistrationError(`Error marking welcome email sent: ${error.message}`);
  }
} 