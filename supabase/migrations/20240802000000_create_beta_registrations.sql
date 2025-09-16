-- Create beta_registrations table with encryption for sensitive data
create table if not exists public.beta_registrations (
    id uuid primary key default gen_random_uuid(),
    email text not null,
    discord_username text not null,
    telegram_handle text not null,
    playstyle text not null,
    playstyle_other text,
    discovery_source text not null,
    discovery_source_other text,
    game_genres text[] not null,
    game_genres_other text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    status text not null default 'pending',
    welcome_email_sent boolean not null default false,

    -- Add constraints
    constraint valid_email check (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    constraint valid_status check (status in ('pending', 'approved', 'rejected')),
    constraint valid_playstyle check (
        playstyle in ('Pet Collector', 'Cozy Observer', 'Tap To Connect', 'Other')
    ),
    constraint valid_discovery_source check (
        discovery_source in ('Instagram', 'Tiktok', 'Reddit', 'X', 'Word of Mouth', 'Friends of Development Team Members', 'Other')
    )
);

-- Create index for faster email lookups
create index if not exists beta_registrations_email_idx on public.beta_registrations (email);

-- Enable Row Level Security
alter table public.beta_registrations enable row level security;

-- Create policy to prevent duplicate email registrations
create policy "Prevent duplicate email registrations"
    on public.beta_registrations
    for insert
    with check (
        not exists (
            select 1
            from public.beta_registrations
            where email = new.email
        )
    );

-- Create policy to allow inserting new registrations
create policy "Allow inserting new registrations"
    on public.beta_registrations
    for insert
    to authenticated, anon
    with check (true);

-- Create policy to allow reading own registration
create policy "Allow reading own registration"
    on public.beta_registrations
    for select
    using (auth.uid() in (
        select auth.uid()
        from auth.users
        where email = beta_registrations.email
    ));

-- Create function to encrypt sensitive data before insert
create or replace function encrypt_beta_registration()
returns trigger as $$
begin
    -- Encrypt sensitive fields using pgcrypto
    new.discord_username = encode(encrypt(
        new.discord_username::bytea,
        current_setting('app.settings.jwt_secret'),
        'aes'
    ), 'base64');
    
    new.telegram_handle = encode(encrypt(
        new.telegram_handle::bytea,
        current_setting('app.settings.jwt_secret'),
        'aes'
    ), 'base64');

    return new;
end;
$$ language plpgsql security definer;

-- Create trigger to encrypt data before insert
create trigger encrypt_beta_registration_trigger
    before insert on public.beta_registrations
    for each row
    execute function encrypt_beta_registration();

-- Create function to decrypt sensitive data when reading
create or replace function decrypt_beta_registration(registration beta_registrations)
returns beta_registrations as $$
declare
    decrypted registration%rowtype;
begin
    decrypted := registration;
    
    -- Decrypt sensitive fields
    decrypted.discord_username := convert_from(
        decrypt(
            decode(registration.discord_username, 'base64'),
            current_setting('app.settings.jwt_secret'),
            'aes'
        ),
        'utf8'
    );
    
    decrypted.telegram_handle := convert_from(
        decrypt(
            decode(registration.telegram_handle, 'base64'),
            current_setting('app.settings.jwt_secret'),
            'aes'
        ),
        'utf8'
    );

    return decrypted;
end;
$$ language plpgsql security definer;

-- Create secure view for decrypted data
create or replace view decrypted_beta_registrations as
select
    (decrypt_beta_registration(r)).*
from
    beta_registrations r;

-- Grant necessary permissions
grant usage on schema public to anon, authenticated;
grant all on public.beta_registrations to anon, authenticated;
grant all on public.decrypted_beta_registrations to anon, authenticated;

-- Add comment for documentation
comment on table public.beta_registrations is 'Stores beta program registrations with encrypted sensitive data'; 