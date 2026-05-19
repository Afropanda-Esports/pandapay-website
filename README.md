# PandaPay Website

Marketing and landing site for PandaPay — a WhatsApp-native, AI-powered gaming payments platform for West African users.

## What PandaPay Is

PandaPay lets users buy gaming gift cards and subscriptions by chatting with an AI assistant on WhatsApp. No app install. No checkout flow. Just a conversation. Payment is accepted in Naira (bank transfer), USDC, or cNGN stablecoin. The AI handles product selection, live pricing, payment verification, and instant code delivery end to end.

## Environment

Copy `.env.example` to `.env` and set:

- `VITE_WHATSAPP_NUMBER` — business WhatsApp number (digits only, with country code)
- `VITE_API_URL` — optional in production; in dev the Vite proxy forwards `/api` to `http://localhost:3000`

The homepage **Inventory** section loads featured offerings from `GET /offerings` on the PandaPay API and links each card to WhatsApp with a product-specific pre-filled message.
