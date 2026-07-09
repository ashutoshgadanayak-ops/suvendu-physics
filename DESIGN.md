# Design

## Theme
dark

## Tokens — Colors
- `--color-carbon-vellum`: `#fcfcfc` (Primary text, inverse buttons; pure white)
- `--color-obsidian`: `#09090b` (Primary page canvas background; zinc-black)
- `--color-pitch`: `#000000` (Dark supporting neutral)
- `--color-void`: `#040405` (Secondary canvas layer and topmost nav background)
- `--color-graphite`: `#121214` (Card surfaces for mockups / info blocks)
- `--color-smoke`: `#71717a` (Secondary body text and metadata; neutral gray)
- `--color-ash`: `#a1a1aa` (Tertiary text, card descriptions, inactive nav; neutral gray)
- `--color-charcoal`: `#27272a` (Hairline dividers, borders; zinc gray)
- `--color-iris-glow`: `#ffffff` (Vivid monotone white accent, icons, links, active states)
- `--color-twilight`: `#52525b` (Muted gray border tone for card edges and glow halos)
- `--color-specter-lilac`: `#f4f4f5` (Soft silver highlight)

## Tokens — Typography
- `--font-framegothic`: `'Inter', ui-sans-serif, system-ui, sans-serif` (Primary brand typeface, tight tracking)
- `--font-neuemachinainktrap`: `'Space Mono', monospace` (Eyebrow labels, wide tracking, uppercase)
- `--font-arial`: `ui-sans-serif, system-ui, sans-serif` (Fallback and small UI labels)

### Type Scale
- `--text-caption`: `12px` (Line height: `1.45`, tracking: `0.72px`)
- `--text-body-sm`: `14px` (Line height: `1.5`)
- `--text-body`: `16px` (Line height: `1.45`, tracking: `0.16px`)
- `--text-subheading`: `18px` (Line height: `1.3`)
- `--text-heading-sm`: `24px` (Line height: `1.25`, tracking: `-0.72px`)
- `--text-heading`: `38px` (Line height: `1.04`, tracking: `-1.33px`)
- `--text-heading-lg`: `48px` (Line height: `1.02`, tracking: `-1.92px`)
- `--text-display`: `80px` (Line height: `0.96`, tracking: `-3.6px`)

## Tokens — Spacing & Shapes
- `--spacing-8`: `8px`
- `--spacing-16`: `16px`
- `--spacing-24`: `24px`
- `--spacing-32`: `32px`
- `--spacing-40`: `40px`
- `--spacing-48`: `48px`
- `--spacing-56`: `56px`
- `--spacing-80`: `80px`
- `--spacing-96`: `96px`
- `--spacing-144`: `144px;`
- `--spacing-160`: `160px;`
- `--spacing-176`: `176px;`

### Border Radii
- Nav/Buttons/Pills: `100px` (Pill geometry)
- Cards/Containers: `10px`
- Feature Blocks: `24px`
- Dividers: `1px`

## Components
- **Pill Navigation Button**: 100px border-radius, Carbon Vellum fill, Obsidian text, no border or shadow.
- **Ghost Nav Link**: Transparent, Carbon Vellum text. Underline on hover.
- **Hero CTA Pill**: 100px radius, Carbon Vellum fill, Obsidian text, comfortable padding.
- **Ghost CTA Button**: 100px radius, transparent fill, 1px Carbon Vellum border, Carbon Vellum text. Inverts to solid Carbon Vellum on hover.
- **Eyebrow Label**: NeueMachinaInktrap, 12px, Iris Glow or Smoke, uppercase, 0.06em letter spacing.
- **Display Headline**: FrameGothic 400, 48–80px, tight tracking, Carbon Vellum. Never bold.
- **Product UI Mockup Container**: 10px radius, 1px Twilight border, violet shadow halo.
- **Section Divider**: 1px Charcoal hairline.
