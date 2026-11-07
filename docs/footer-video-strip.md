# Footer video, version 2: "The line" (all six at once)

One very wide etched panorama runs along the bottom of the footer. Six scenes sit side by side on the same horizon line and **all play at the same time, each looping in place**. Nothing swaps or cuts, and the camera never moves. It's a living engraving: you look along the line and something is happening everywhere.

```
┌──────────────────────────────────────────────────────────────────────┐
│ footer content (logo, copy, links)                                   │
│                                                                      │
├───────────┬───────────┬───────────┬───────────┬───────────┬──────────┤
│  1 Moon   │ 2 Skydive │ 3 Orange  │ 4 Aim     │ 5 Racer   │ 6 Gamer  │
│ astronaut │           │   tree    │  assist   │           │          │
└───────────┴───────────┴───────────┴───────────┴───────────┴──────────┘
          one continuous landscape, one horizon line
```

## Canvas and rules

- **Panorama:** 3840 × 640 px (6:1), split into six 640 × 640 zones, left to right in the order above. The zones aren't boxes: neighbouring scenes blend into each other across a soft 120 px overlap.
- **Horizon line:** **72% down from the top** (y = 460), perfectly level across the whole strip. Ground below it, open sky above it.
- **Camera:** locked. No pan, no zoom, no shake, in any scene.
- **Loop:** every scene is a **seamless 6-second loop** (first frame = last frame). They all share one 6s cycle, so the finished strip is a single 6s video that loops forever.
- **Motion lives only in each scene's "action area"** (described per scene). The rest of the strip is still engraving, which is what keeps it calm and lets the pieces stitch.
- **Accent:** orange only on the item listed per scene.

### Style block (append to every prompt)

> Fine etched engraving illustration, copperplate line art with dense cross-hatching and stippling, single-colour ink in warm near-black (#2A1F14) on light warm yellow paper (#FBF1D3), subtle paper grain, vintage toile and banknote engraving feel, highly detailed but calm, perfectly level horizon line, locked camera, no text, no logos, no watermark, only accent colour: small touches of bright orange (#FF6B00) where specified.

### Negative prompt

> photo, 3D render, colour fill, blue ink, gradient sky, text, letters, logos, watermark, frame border, vignette, camera movement, zoom, pan, shake, motion blur smear, morphing faces, extra limbs, cuts

## How the landscape flows (left to right)

| Zone | Ground on the line | What the neighbour sees at the seam |
|---|---|---|
| 1 Moon | grey cratered regolith, a large pale planet low in the sky | craters soften into pale dust that becomes… |
| 2 Skydive | a low cloud bank lying on the line, fields far below it | clouds thin into… |
| 3 Orange tree | a gentle grassy hill with one orange tree | grass flattens into… |
| 4 Aim assist | an open shooting range with a target stand | range ground turns into tarmac… |
| 5 Racer | a road running along the line, curving toward the viewer at the left | road ends at a low wall and… |
| 6 Gamer | a small porch or steps of a house, the gamer sitting on them | right edge: a doorway or wall to close the strip |

---

## Scene 1: The astronaut, moon (zone 0–640)

**Still:**
> A cratered moon surface on a level horizon, a large pale planet low in the sky at left, a lone astronaut mid-hop at centre-left, a small sleek space jet parked at the right with its canopy open, long soft shadows. [style block] Accent: a tiny orange light on the jet.

**Action area:** the astronaut, plus dust puffs at their feet.

**Loop prompt:**
> Locked camera. The astronaut makes two slow low-gravity hops toward the parked space jet, small dust puffs at each landing, then a third hop that carries them back to the exact starting pose and position, so the loop is seamless. The jet stays parked; only its small orange light blinks once. Everything else is still. 6-second seamless loop.

## Scene 2: The skydiver (zone 640–1280)

**Still:**
> Open sky above a low cloud bank lying on the horizon line, faint patchwork fields visible beneath the clouds, a skydiver in freefall in the upper middle with arms and legs spread. [style block] Accent: a thin orange stripe on the jumpsuit.

**Action area:** the skydiver and a little cloud drift.

**Loop prompt:**
> Locked camera. The skydiver falls in a gentle swaying freefall, turning slightly side to side, arms adjusting, clouds below drift very slowly; the skydiver stays in the same area of the frame (as if the viewer falls with them), returning to the exact starting pose at the end. 6-second seamless loop.

(The jumper stays in place on purpose. A real fall would leave the frame, and the loop would jump.)

## Scene 3: The orange tree (zone 1280–1920)

**Still:**
> A single full orange tree with a rounded crown on a gentle grassy hill on the horizon line, bright orange fruits among engraved leaves, a woman in a simple long dress standing beneath it reaching up toward a low branch, a woven basket at her feet. [style block] Accent: the oranges.

**Action area:** the woman's arm and upper body, one orange, and the leaves.

**Loop prompt:**
> Locked camera. The woman reaches up, plucks one orange, looks at it, places it in the basket at her feet, then reaches up again, ending in the exact starting pose. The leaves sway softly in a light breeze. 6-second seamless loop.

## Scene 4: The aim assist (zone 1920–2560)

**Still:**
> An open outdoor shooting range on the horizon line, a round bullseye target on a simple wooden stand at centre, a large thin engraved crosshair reticle with concentric circles, tick marks and four corner brackets floating slightly to the left of the target. [style block] Accent: the bullseye centre.

**Action area:** the reticle only.

**Loop prompt:**
> Locked camera. The crosshair reticle drifts and searches in small smooth arcs around the target, slows, snaps precisely onto the bullseye with its rings aligning and brackets closing in, holds for a beat while the orange centre glows, then releases and drifts back to the exact starting position. The target stand never moves. 6-second seamless loop.

## Scene 5: The racer (zone 2560–3200)

Your idea was a visor close-up, then the camera pulls out to show the whole bike. The camera can't move in a shared strip, so the pull-out is done with perspective instead: the rider starts **big in the foreground**, where the helmet and visor fill the zone, then races **away along the road to the horizon**, getting smaller until the full rider and bike are visible on the line.

**Still (start pose):**
> A road curving from the foreground at lower left toward the horizon line, a motorbike racer in the very near foreground, large, seen from the side, helmet and glossy visor prominent with landscape reflections streaking across it, the road continuing to a small vanishing point on the level horizon. [style block] Accent: an orange stripe on the helmet and an orange tail light.

**Action area:** the rider and bike along the road path.

**Loop prompt:**
> Locked camera. The racer leans forward, visor reflections streaking, then accelerates away along the curving road toward the horizon, shrinking from a large foreground close-up to a small full view of rider and bike on the horizon line, the orange tail light trailing; as they reach the horizon they fade into the heat haze, and a new rider emerges in the foreground in the exact starting pose. 6-second seamless loop.

## Scene 6: The mobile gamer (zone 3200–3840)

Same idea: the zoom to the headphones can't be a camera move, so the gamer sits **close to the viewer, in side profile**, so the headphones and hands are both clearly visible the whole time. The action carries the moment instead.

**Still:**
> A young person sitting on the front steps of a small house at the right end of the horizon line, side profile toward the left, wearing large over-ear headphones, holding a phone sideways with both thumbs on the screen, the screen glowing orange, relaxed but focused. [style block] Accent: the phone screen glow.

**Action area:** the hands, phone, head and headphones.

**Loop prompt:**
> Locked camera. Quick precise thumb movements, taps and swipes on the phone, the orange screen flickering with action, the player leans in slightly during an intense moment, then sits back, adjusts one headphone ear cup with a hand, and returns to the exact starting pose. 6-second seamless loop.

---

## How to make it (the reliable way)

AI video tools can't animate a 6:1 strip with six independent actions in one go, so build it in layers:

1. **Make the still panorama first.** Generate scene 1 at 640×640 (or larger, at the same 1:1), then **outpaint to the right** zone by zone using each scene's still prompt. Keep the horizon at the same height so the landscape flows. Fix the seams by hand if needed. This still is the master.
2. **Animate each zone separately.** Crop each scene's square (plus about 60px of overlap on each side) from the master and run it through image-to-video with that scene's loop prompt. Use a tool that can set the **same image as first and last frame** (Kling, or Higgsfield start/end frames) to make the loop seamless.
3. **Composite.** In your editor (After Effects, DaVinci Resolve or CapCut desktop), place the master still as the base layer and lay each animated clip on top in its zone, **masked to its action area** with a soft feather. Everything outside the masks stays the untouched still, so the seams never move or drift.
4. **Match.** Grade every clip back to paper `#FBF1D3` and ink `#2A1F14`.
5. **Export:**

| File | Spec |
|---|---|
| `public/videos/footer/strip.mp4` | H.264, 3840×640, 24fps, 6s seamless loop, no audio, **under 6 MB** |
| `public/videos/footer/strip.webm` | VP9, same size, a little smaller |
| `public/videos/footer/strip-poster.webp` | The master still, quality 80 |

## On the page (for the build)

- Footer content (logo, copy, links) on paper `#FBF1D3`, with the strip running full width along the bottom and its sky fading into the paper above.
- **Desktop:** the strip shows at full width.
- **Phones:** the strip keeps its height and the whole thing **drifts slowly sideways** in a gentle back-and-forth, so all six scenes pass by. About 40s to travel the length, paused for reduced motion.
- **Decorative only:** `muted autoplay loop playsinline`, no controls, `disablepictureinpicture`, `pointer-events: none`, `user-select: none`, `aria-hidden`. It plays only while the footer is on screen, and reduced-motion users see the still.
