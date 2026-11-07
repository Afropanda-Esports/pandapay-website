# Feature bento: asset brief

There are 13 assets across 5 tiles: 8 stills and 5 motion loops. Each one sits in a tile's media well, so it has to read as part of that tile rather than as a photo pasted on top.

## One world for all 13

- **Look.** Soft, matte, studio-lit 3D objects, like paper and clay with rounded edges. Use one soft key light from the top left, gentle contact shadows and a shallow depth of field. Avoid gloss, neon and glass.
- **Colours.** Use only orange `#FF6B00`, black `#0C0C0C`, white and the tile's background tone. Objects can use tints of these (for example cream or charcoal), but no other hues.
- **Background.** Use the exact well colour of the tile the asset sits in, flat and seamless, so the edges disappear:

  | Tile | Surface | Background (well) |
  |---|---|---|
  | Feels like texting | paper | `#E8E5DF` |
  | Finds the right thing | house (black) | `#1C1C1C` |
  | Shops like a proper store | signal (orange) | `#E85F00` |
  | Pays the local way | paper | `#E8E5DF` |
  | Stays with you after | house (black) | `#1C1C1C` |

- **Chat bubbles are shapes, not conversations.** Use rounded bubbles with at most 1–3 short words, or blank lines standing in for text. There must be no fake chat transcripts, no WhatsApp logo, no WhatsApp green and no phone frames.
- **Gift cards are generic and unbranded.** Use blank coloured cards with a soft emboss and maybe a small abstract mark. The site can show real brand cards later, once the client approves them.
- **Composition.** Keep the subject in the centre 70%. The tile crops the image differently at each breakpoint (wide on desktop, 4:3 on mobile), so leave about 15% safe space on every edge.
- **Rules for every asset:** no people's faces, no text beyond what each spec allows, no numbers that look like real prices, codes or account numbers, and no added logos.

### Delivery

| Kind | Format | Path | Notes |
|---|---|---|---|
| Still | `.webp`, quality 80 | `public/images/features/{id}.webp` | Under 180 KB |
| Motion | `.mp4` (H.264), no audio | `public/videos/features/{id}.mp4` | 5s, seamless loop, under 3 MB |
| Poster | `.webp` | `public/videos/features/{id}.webp` | The first frame of the loop |

To swap one in, set `src` (and `poster` for videos) on that feature's `media` in `src/content/home.ts`, and write a real `alt` for stills. The stub disappears automatically.

### Video rules (all 5)

- Image-to-video: generate the still first, then animate it.
- The camera is locked: no pan, no zoom, no orbit.
- The last frame must equal the first frame, so the clip loops without a jump.
- Motion is calm and weighted, using ease-in-out over 1–1.5s with a hold of at least 1s.
- Nothing morphs, melts or warps. No text appears or changes, except where the spec allows it.

---

## Tile 1: Feels like texting

Background `#E8E5DF`, 1600×1000 (16:10). On desktop this is the widest tile.

### 1. onboarding · **video**

*"Say hi. You're in."*

**Still (frame 1).** A single small white chat bubble sits slightly left of centre with the word "Hi" in black, Poppins-like type. Behind and to its right is a closed, softly rounded orange box. It looks like a shop front folded flat, with a small black panda-ear notch on its top edge. Soft shadows.

**Image prompt:**
> Minimal 3D render, matte clay and paper materials, flat seamless background #E8E5DF. A small white rounded chat bubble containing the single word "Hi" in black sans-serif, left of centre. To its right, a flat closed orange (#FF6B00) rounded box resembling a folded shop front, with two small black rounded ear shapes on its top edge. Soft top-left studio light, gentle contact shadows, shallow depth of field, lots of empty space, no other text, no logos, no phone.

**Video prompt:**
> Locked camera. 0–1s: hold. 1–2.5s: the "Hi" bubble nudges gently toward the orange box, like a tap. The box unfolds open smoothly, like a paper pop-up shop, and reveals three small blank gift cards (white, black, orange) standing in a row inside. 2.5–3.5s: hold, with the cards breathing very slightly. 3.5–5s: the box folds closed again and the bubble returns to its start position, ending on the exact first frame. Calm ease-in-out, no camera movement, no new text, no morphing.

### 2. discovery · image

*"Ask the way you'd ask a friend."*

**Description.** A white chat bubble sits at the left with three short grey lines (abstract text) and a small orange magnifier icon. Out of the bubble's tail, four or five small blank product cards fan out to the right in an easy arc: orange, black, white and cream. The nearest card is in focus and the rest soften.

**Image prompt:**
> Minimal 3D render, matte paper materials, seamless background #E8E5DF. A white rounded chat bubble on the left with three short grey lines as placeholder text and a small orange magnifying-glass icon. From the bubble, five small blank gift-card shapes fan out to the right in a gentle arc, coloured orange #FF6B00, black #0C0C0C, white and cream, with the front card sharp and the others slightly out of focus. Soft top-left light, subtle shadows, no readable text, no logos.

### 3. typos · **video**

*"Typos welcome."*

**Still (frame 1).** Three loose, slightly tilted black letter tiles that spell a misspelling ("giftcrad"), each tile like a Scrabble piece in cream with black letters. Below sits an empty white pill-shaped slot.

**Image prompt:**
> Minimal 3D render, seamless background #E8E5DF. Cream rounded letter tiles with black letters spelling "giftcrad", slightly scattered and tilted as if casually dropped, above an empty white rounded pill-shaped tray. Soft top-left light, matte materials, gentle shadows, no other text, no logos.

**Video prompt:**
> Locked camera. 0–1s: hold on the scattered tiles spelling "giftcrad". 1–2.5s: the tiles lift slightly, the "r" and "a" swap places, and all tiles glide down into the white pill tray in a neat straight row spelling "giftcard". One small orange tick appears at the right end of the tray. 2.5–3.5s: hold. 3.5–5s: the tick fades, and the tiles lift and drift back to their exact original scattered positions, ending on frame 1. Smooth, weighted motion. The letters must stay crisp and must not morph; tiles only move and swap.

> If the video model mangles letters, fall back to a still of the "after" state.

---

## Tile 2: Finds the right thing

Background `#1C1C1C`, 1200×900 (4:3). The tile is dark, so assets should glow softly.

### 4. catalogue · image

*"Neatly shelved."*

**Description.** A low, three-tier black shelf unit is seen straight on. Each tier holds blank gift cards standing upright: orange cards on the top tier, white in the middle, charcoal at the bottom. A thin warm light strip under each shelf lights the cards from below. It should feel like a calm boutique, not a warehouse.

**Image prompt:**
> Minimal 3D render, seamless dark background #1C1C1C. A front-facing three-tier matte black shelf. Each tier holds a neat row of upright blank rounded gift cards: orange #FF6B00 on top, white in the middle, charcoal grey on the bottom. A soft warm light strip under each shelf lip gently lights the cards. Boutique, calm, symmetric, shallow depth of field, no text, no logos, no brands.

### 5. inventory · **video**

*"If you see it, you can buy it."*

**Still (frame 1).** A single shelf of five blank upright gift cards, the middle one in orange and the rest white, lit as in *catalogue*.

**Image prompt:**
> Minimal 3D render, seamless background #1C1C1C. One matte black shelf with five upright blank rounded gift cards in a row: white, white, orange #FF6B00, white, white. Soft warm under-shelf light, shallow depth of field, no text, no logos.

**Video prompt:**
> Locked camera. 0–1s: hold. 1–2s: the second white card dims to grey, as if its light went out, and slides smoothly backward off the shelf out of view. 2–3s: the remaining cards glide sideways to close the gap evenly. 3–4s: hold. 4–5s: a fresh white card slides forward into the original gap position as the others shift back, ending on the exact first frame. Calm, weighted motion, no new objects, no text, no camera movement.

---

## Tile 3: Shops like a proper store

Background `#E85F00` (deep orange), 1200×900. Objects here are mostly black and white, so they stand off the orange.

### 6. cart · **video**

*"Get it all in one go."*

**Still (frame 1).** A shallow black tray with rounded corners, like a minimal cart, sits in the lower centre. A small white circular badge on its front corner shows "1". One white blank card rests in the tray.

**Image prompt:**
> Minimal 3D render, seamless background #E85F00. A shallow matte black rounded tray in the lower centre with one blank white gift card lying in it. A small white circular badge on the tray's front-right corner shows the number "1" in black. Soft top light, gentle shadows, no other text, no logos.

**Video prompt:**
> Locked camera. 0–1s: hold. 1–2s: a black blank gift card drops softly from above into the tray beside the white card, with a tiny settle bounce. The badge number flips from "1" to "2". 2–3.5s: hold. 3.5–5s: the black card lifts back up out of frame and the badge flips back to "1", ending on frame 1. Only the badge digit changes, and it must stay crisp. Calm, weighted motion.

### 7. discount · image

*"Got a code? Use it."*

**Description.** A white price card stands slightly angled. A black paper luggage-style tag with an orange string hangs from its corner. The tag shows a simple "%" mark in white and no number.

**Image prompt:**
> Minimal 3D render, seamless background #E85F00. A blank white rounded card standing at a slight angle, with a matte black paper tag on an orange string hooked onto its top corner. The tag bears a single white "%" symbol. Soft light, gentle shadow, no other text or numbers, no logos.

### 8. checkout · image

*"Checkout, right in the chat."*

**Description.** A white chat bubble lies flat at the bottom. Rising out of it is a crisp black order slip with a slightly torn top edge. The slip carries abstract white lines and one short "#PP-" code fragment with blurred digits, so nothing reads as a real order.

**Image prompt:**
> Minimal 3D render, seamless background #E85F00. A white rounded chat bubble at the bottom with a matte black receipt slip rising out of it, its top edge softly torn. The slip has white placeholder lines and a small blurred order reference, with no readable numbers. Soft top light, gentle shadows, no logos.

---

## Tile 4: Pays the local way

Background `#E8E5DF`, **900×1200 (portrait 3:4)**. On desktop this tile is narrow and tall.

### 9. transfer · image

*"Pay the way you already pay."*

**Description.** A tall cream bank-transfer slip stands upright like a receipt. A large orange "₦" sits in a circle at the top, with abstract grey lines below and a black "Sent" pill at the bottom. A soft arrow sweeps from behind the slip toward the right edge.

**Image prompt:**
> Minimal 3D render, portrait composition, seamless background #E8E5DF. A tall cream paper transfer slip standing upright, with a large orange #FF6B00 Naira sign "₦" in a circle at the top, grey placeholder lines in the middle and a black rounded pill reading "Sent" at the bottom. A soft curved orange arrow sweeps from behind the slip toward the right. Matte paper, soft top-left light, no bank names, no logos, no numbers.

### 10. review · image

*"A real person double-checks."*

**Description.** The same slip, seen slightly from above, with a round black rubber-stamp mark reading "Checked" pressed over its lower half. A wooden-handled stamp rests beside it. The stamp's base is orange. This is the human touch, with no faces.

**Image prompt:**
> Minimal 3D render, portrait composition, seamless background #E8E5DF. A cream paper transfer slip lying at a slight angle, with a round black ink stamp reading "Checked" pressed on its lower half. A small rubber stamp with a light wooden handle and an orange base rests beside it. Soft top-left light, matte paper texture, tactile and human, no people, no logos, no numbers.

---

## Tile 5: Stays with you after

Background `#1C1C1C`, 1200×900.

### 11. voucher · **video**

*"Your code comes to you."*

**Still (frame 1).** Left: an orange gift card floats with a black masked strip on it (dots, no code). Right: an empty white chat bubble waits, open like a pocket.

**Image prompt:**
> Minimal 3D render, seamless background #1C1C1C. Left: a floating orange #FF6B00 rounded gift card with a black masked strip of dots across it, showing no readable code. Right: an empty white rounded chat bubble, slightly open like a pocket. Soft warm rim light, gentle glow on the dark background, no text, no logos.

**Video prompt:**
> Locked camera. 0–1s: hold. 1–2.5s: the orange card glides in a soft arc into the white bubble and settles inside it, and the bubble closes gently around it. A small orange tick appears on the bubble's corner. 2.5–3.5s: hold. 3.5–5s: the tick fades, the bubble opens and the card glides back along the same arc to its start, ending on the exact first frame. The mask dots stay dots and no code is revealed. Calm, weighted motion.

### 12. tracking · image

*"Know where every order is."*

**Description.** A short fanned stack of four black order slips. The front slip has a small glowing orange status pill (a dot plus a short blank bar). The slips behind fade into the dark.

**Image prompt:**
> Minimal 3D render, seamless background #1C1C1C. A neat fanned stack of four matte charcoal order slips. The front slip carries a small glowing orange status pill made of a dot and a blank bar, and the slips behind fade into shadow. Soft rim light, quiet, no readable text, no numbers, no logos.

### 13. support · image

*"Help is one message away."*

**Description.** A single white chat bubble with a small round orange badge on its corner. The badge holds a black line-drawn headset icon. A faint second bubble sits behind it, close and reassuring.

**Image prompt:**
> Minimal 3D render, seamless background #1C1C1C. A white rounded chat bubble in the centre with a small round orange #FF6B00 badge on its top-right corner containing a simple black line headset icon. A softer, slightly out-of-focus white bubble sits behind it. Warm soft light, calm, no text, no logos, no people.

---

## Checklist before you hand an asset in

- [ ] The background matches the tile's well colour exactly, with no visible edge in the tile.
- [ ] The subject sits inside the centre 70%.
- [ ] No brand logos, no WhatsApp green, no readable chat transcript, no real-looking numbers or codes.
- [ ] Video: 5s, seamless loop, locked camera, under 3 MB, poster exported.
- [ ] Still: `.webp`, under 180 KB, with real `alt` text added in `home.ts`.
