
I verified both issues and here’s the implementation plan.

## 1) Critical fix: Contact form still failing to submit

### What I found
- The `send-contact-email` edge function is reachable and works with valid payloads.
- Current failures in logs are primarily `400` validation errors: **“Message must be at least 10 characters”**.
- Frontend currently shows a generic toast (“Failed to send message”) instead of the real reason.
- There is also a backend insert warning in referral tracking (`ON CONFLICT` mismatch in trigger), which doesn’t block email send but does break inquiry logging.

### Implementation steps
1. **Improve frontend validation and error messaging** (`src/components/Footer.tsx`)
   - Add clear client-side message length rule (or align with server rule exactly).
   - Trim message before submit.
   - Parse edge-function error details and show specific toast (not generic).

2. **Make backend validation lead-safe** (`supabase/functions/send-contact-email/index.ts`)
   - Relax or align message minimum requirement so legitimate short inquiries are not dropped.
   - Keep max length and existing sanitization.
   - Return structured error detail consistently for frontend display.

3. **Harden delivery reliability**
   - Treat team email send failure as explicit backend failure (so UI knows immediately).
   - Keep detailed logs for quick diagnosis.

4. **Fix referral logging trigger issue (data integrity)**
   - Add migration to correct `referral_stats` conflict target (unique key or trigger logic adjustment).
   - This prevents silent logging failures for submitted leads.

## 2) Rebrand chatbot from Tank → Bolt (with lightning vibe)

### Implementation steps
1. **Replace chatbot avatar asset**
   - Copy uploaded image to project assets (e.g. `src/assets/bolt-icon.png`).
   - Update widget and Think Tank visuals to use Bolt image.

2. **Rename visible chatbot identity across UI**
   - `src/components/TankChatWidget.tsx`: rename labels/text from Tank to Bolt.
   - Update CTA copy to: **“⚡ Ask Bolt anything!”**
   - Update status strings like “Tank is thinking...” to Bolt + lightning style.

3. **Update page-level branding**
   - `src/pages/ThinkTank.tsx`: replace mascot/text references so Bolt is the visible assistant identity while keeping route compatibility unless requested otherwise.

4. **Update AI persona prompt**
   - `supabase/functions/think-tank-chat/index.ts`:
     - Change system persona name from Tank to Bolt.
     - Add style instruction to use lightning emoji naturally/frequently (without over-spam).
     - Keep UPM service knowledge and support routing intact.

5. **Optional code cleanup**
   - Rename component/file imports (`TankChatWidget` → `BoltChatWidget`) for maintainability.

## 3) End-to-end verification checklist (after implementation)

1. Homepage footer form:
   - Submit with a short message and with a normal message.
   - Confirm success toast behavior and no generic false failures.
2. Blog post footer form:
   - Confirm form is visible and submits successfully.
3. Edge-function verification:
   - Check `send-contact-email` logs for successful send events and no validation confusion.
4. Chatbot verification:
   - Confirm new Bolt avatar appears in floating widget + Think Tank page.
   - Confirm “Ask Bolt anything!” copy and Bolt naming everywhere.
   - Send a few chat prompts and confirm Bolt responses include lightning vibe.
