# Security policy

## Reporting a vulnerability

Please do not disclose suspected vulnerabilities through a public GitHub issue. Contact GIIT Africa through its official business channels with a clear description, affected component, reproduction steps, and potential impact.

## Credential handling

- Never commit `.env` files, OpenAI API keys, WhatsApp access tokens, webhook secrets, or deployment credentials.
- Configure secrets through the hosting platform's encrypted environment settings.
- Rotate any credential immediately if accidental exposure is suspected.

## Production checklist

- Protect the admissions dashboard with role-based authentication.
- Validate and rate-limit public write endpoints.
- Publish a privacy notice and data-retention policy.
- Restrict uploaded file types and scan documents before further processing.
- Apply least-privilege access to databases, storage, and external APIs.
