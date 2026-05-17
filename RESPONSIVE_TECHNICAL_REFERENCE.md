# Mobile Responsiveness - Technical Reference

## CSS `clamp()` Usage Examples

### Font Sizes

```jsx
// Heading sizes scale from small to large screens
<h1 style={{ fontSize: 'clamp(1.5rem, 6vw, 2.4rem)' }}>
  // 1.5rem on small phones
  // 6vw scaling (smooth)
  // 2.4rem max on large screens
</h1>

<h2 style={{ fontSize: 'clamp(1.25rem, 5vw, 2rem)' }}>
<h3 style={{ fontSize: 'clamp(1.1rem, 3vw, 1.5rem)' }}>
```

### Padding & Spacing

```jsx
// Responsive padding that scales with viewport
style={{
  padding: 'clamp(1.5rem, 5vw, 3rem) clamp(1rem, 4vw, 1.5rem)'
  // Vertical: min 1.5rem → 5vw → max 3rem
  // Horizontal: min 1rem → 4vw → max 1.5rem
}}

// Responsive gaps
gap: 'clamp(0.75rem, 3vw, 16px)'
```

### Minimum Widths

```jsx
// Table columns adapt to content and screen size
minWidth: "clamp(150px, 30vw, 240px)";
// Min 150px, grows to 30% of viewport, max 240px
```

## CSS Grid Responsive Layouts

### 2-Column Layout (adapts to 1-column)

```jsx
gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, max(280px, calc((100% - 1.5rem) / 2))), 1fr))";
// On wide: 2 equal columns (each ≥280px)
// On narrow: 1 column (full width)
// Gap is 1.5rem
```

### 4-Column Layout (KPI cards)

```jsx
gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, max(200px, calc((100% - 3.75rem) / 4))), 1fr))";
// On wide: 4 equal columns (each ≥200px)
// On tablet: 2 columns
// On mobile: 1 column
// Gap is 1.25rem (4 gaps = 5rem, adjusted in calc)
```

## Responsive Navigation

### Mobile (≤768px)

- Step names hidden
- Only numbers shown: 1, 2, 3, 4, 5
- Reduced padding

### Desktop (>768px)

- Full step names displayed: "Paramètres", "Résultats CAF", etc.
- Full navigation text visible

```jsx
<span
  style={{ display: "none", "@media (min-width: 640px)": { display: "block" } }}
>
  {stepName}
</span>
```

## Touch Accessibility

### Input Font Size

```jsx
input {
  font-size: 16px; // Prevents iOS zoom on input focus
}
```

### Minimum Touch Target

```jsx
// Buttons maintain readable size on mobile
padding: "clamp(0.6rem, 2vw, 0.75rem) clamp(1rem, 3vw, 1.5rem)";
// Ensures buttons stay clickable
```

## Flexbox Wrapping

### Responsive Button Groups

```jsx
style={{
  display: 'flex',
  gap: '1rem',
  flexWrap: 'wrap',  // Buttons wrap on small screens
  justifyContent: 'space-between'
}}
```

## Text Handling

### Prevent Overflow

```jsx
style={{
  wordBreak: 'break-word',  // Long words break on mobile
  overflow: 'hidden',
  textOverflow: 'ellipsis'  // Or truncate with ellipsis
}}
```

### Horizontal Scroll for Tables

```jsx
style={{
  overflowX: 'auto',        // Allow horizontal scroll
  minWidth: 'max-content'   // Content never shrinks
}}
```

## Viewport Meta Tag (in HTML)

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

## Media Queries (If Needed)

```css
/* Tablet and smaller desktops */
@media (max-width: 1024px) {
  body {
    font-size: 16px;
  }
}

/* Mobile phones */
@media (max-width: 768px) {
  body {
    font-size: 15px;
  }
  h1 {
    font-size: 1.75rem;
  }
}

/* Small phones */
@media (max-width: 480px) {
  body {
    font-size: 14px;
  }
  h1 {
    font-size: 1.5rem;
  }
}
```

## Responsive Design Best Practices Applied

✅ **Mobile-First**: Base styles for mobile, enhanced for desktop
✅ **Fluid Typography**: Using `clamp()` instead of fixed sizes
✅ **Flexible Layouts**: CSS Grid with `auto-fit` and `minmax()`
✅ **Touch-Friendly**: Proper input font size, adequate spacing
✅ **Performance**: No extra JavaScript, pure CSS
✅ **Accessibility**: Readable text, clickable targets, proper contrast
✅ **No Horizontal Scroll**: Content fits within viewport

## Testing

### Chrome DevTools

1. Press F12
2. Click Device Toggle (Ctrl+Shift+M)
3. Select device or use custom dimensions
4. Test different breakpoints

### Orientation Testing

- Rotate device between portrait/landscape
- Test tablet dimensions (768x1024, 1024x768)
- Test phone dimensions (320x568, 540x960)

---

**Last Updated**: May 17, 2026
**Status**: ✅ Production Ready
