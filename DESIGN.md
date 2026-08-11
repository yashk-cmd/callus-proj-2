# Design System Specification

> Extracted from Stitch Project: **Veritas Engine Diagnostic Interface** (`projects/15118274407268700530`)

---

## 1. Brand & Aesthetic Guidelines

- **Visual Style**: Technical Minimalism & IDE-inspired Diagnostic Interface.
- **Tone**: Analytical, objective, high-precision, clinical certainty.
- **Core Principles**: High information density, clear visual hierarchy, data-first UX, zero unnecessary ornamentation. Depth via tonal layering and crisp 1px borders rather than soft ambient drop shadows.

---

## 2. Color Palettes

### 2.1 Dark Mode (Primary Palette)

| Color Token | Hex Code | Purpose / Usage |
| :--- | :--- | :--- |
| `background` / `surface` | `#0B1326` | Deep Navy application canvas base |
| `surface-container-lowest` | `#060E20` | Lowest surface level (recessed inputs/editors) |
| `surface-container-low` | `#131B2E` | Secondary containers & sidebars |
| `surface-container` | `#171F33` | Standard card/panel background |
| `surface-container-high` | `#222A3D` | Elevated panel / active state container |
| `surface-container-highest`| `#2D3449` | Highest panel level / hover surfaces |
| `surface-bright` | `#31394D` | Highlighted surfaces |
| `primary` | `#8ED5FF` | High-visibility primary blue accent |
| `primary-container` | `#38BDF8` | Primary interactive elements / buttons (Sky 400) |
| `secondary` | `#4EDEAE` / `#4EDE A3`| Verified human content / Emerald accent |
| `secondary-container` | `#00A572` | Secondary containers |
| `tertiary` | `#FFBCB7` | High-probability AI detection accent |
| `tertiary-container` | `#FF938C` | AI highlight flag background |
| `error` | `#FFB4AB` | System error state |
| `error-container` | `#93000A` | Error badge / callout container |
| `on-surface` | `#DAE2FD` | Primary text / high-contrast foreground |
| `on-surface-variant` | `#BDC8D1` | Secondary text / subtle labels |
| `outline` | `#87929A` | Standard structural borders |
| `outline-variant` | `#3E484F` | Subtle divider lines (`#334155` family) |

### 2.2 Light Mode Palette

| Color Token | Hex Code | Purpose / Usage |
| :--- | :--- | :--- |
| `background` / `surface` | `#F7F9FB` | Clean light mode canvas |
| `surface-container-lowest` | `#FFFFFF` | Primary white editor / document canvas |
| `surface-container-low` | `#F2F4F6` | Light neutral inset / sidebar |
| `surface-container` | `#ECEEF0` | Light card surface |
| `surface-container-high` | `#E6E8EA` | Active light container |
| `surface-container-highest`| `#E0E3E5` | High-density light surface |
| `primary` | `#000000` | Deep charcoal primary text / primary buttons |
| `primary-container` | `#1B1B1C` | High-contrast dark button fill |
| `secondary` | `#505F76` | Slate secondary text & borders |
| `error` | `#BA1A1A` | Functional alert / red badge text |
| `on-surface` | `#191C1E` | Light mode primary typography |
| `on-surface-variant` | `#46474A` | Light mode secondary typography |
| `outline` | `#76777B` | Structural boundary lines |
| `outline-variant` | `#C7C6CA` | Light mode card outlines |

---

## 3. Typography Hierarchy

Dual/Triple Font Strategy separating **Interface Control**, **Reading Content**, and **Data Metrics**.

### 3.1 Dark Mode Typography

- **Headline / Interface Font**: `Inter`
- **Reading / Body Font**: `Merriweather`
- **Metrics & Code Font**: `JetBrains Mono`

| Style Token | Font Family | Size | Weight | Line Height | Letter Spacing | Purpose |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `display-lg` | Inter | 32px | 700 | 40px | -0.02em | Document titles & key hero headings |
| `headline-md` | Inter | 24px | 600 | 32px | -0.01em | Section headers & panel titles |
| `reading-body`| Merriweather | 18px | 400 | 32px | 0.00em | Long-form reading environment & analyzed text |
| `ui-medium` | Inter | 14px | 500 | 20px | +0.01em | Navigation, action buttons, form controls |
| `ui-sm` | Inter | 12px | 400 | 16px | +0.02em | Metadata labels & secondary UI indicators |
| `mono-metrics`| JetBrains Mono| 13px | 500 | 18px | 0.00em | Probability scores, timestamps, character counts |

### 3.2 Light Mode Typography

- **Display & Headlines**: `Hanken Grotesk`
- **Body Text**: `Inter`
- **Labels & Metrics**: `JetBrains Mono`

| Style Token | Font Family | Size | Weight | Line Height | Letter Spacing |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `display` | Hanken Grotesk | 48px | 700 | 1.1 | -0.02em |
| `headline-lg` | Hanken Grotesk | 32px | 600 | 1.2 | -0.01em |
| `headline-md` | Hanken Grotesk | 20px | 600 | 1.4 | 0.00em |
| `body-lg` | Inter | 18px | 400 | 1.6 | 0.00em |
| `body-md` | Inter | 16px | 400 | 1.5 | 0.00em |
| `body-sm` | Inter | 14px | 400 | 1.5 | 0.00em |
| `label-mono` | JetBrains Mono | 12px | 500 | 1.4 | +0.05em |

---

## 4. Layout, Spacing & Corner Radius

### 4.1 Spacing Scale (4px Base Unit)
- **Unit**: `4px`
- **Component Gap**: `8px`
- **Gutter**: `16px`
- **Panel Padding**: `24px`
- **Margin (Page)**: `32px` / `48px`

### 4.2 Corner Radii (Soft Industrial)
- `sm`: `0.125rem` (2px) - Status tags & diagnostic markers
- `DEFAULT` / `md`: `0.25rem` (4px) - Buttons, inputs, standard cards
- `lg`: `0.5rem` (8px) - Structural panels / container blocks
- `full`: `9999px` - Pill indicators

---

## 5. Elevation & Depth Guidelines

1. **Tonal Layering over Shadows**: Avoid ambient drop shadows. Use background color differentiation (`#0F172A` -> `#1E293B` -> `#334155`).
2. **Defined Outlines**: All panels and cards require a 1px solid border (`outline-variant`) to maintain a clean, technical structure.
3. **Interactive Highlighting**: Focus and active states toggle border color (e.g., Primary Sky `#38BDF8`) rather than adding heavy shadows.
