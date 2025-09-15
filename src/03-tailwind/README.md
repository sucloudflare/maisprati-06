# Tailwind CSS Implementation

This version uses Tailwind CSS utility-first framework for styling with a focus on rapid development and consistency.

## Features

- **Utility-First**: Compose designs using utility classes
- **Dark Mode**: Built-in dark mode support with `dark:` prefix
- **Responsive Design**: Mobile-first responsive utilities
- **Custom Animations**: Shimmer effect for loading states
- **JIT Compilation**: Just-in-time compilation for optimal bundle size

## Configuration

The `tailwind.config.js` includes:
- Custom shimmer animation for skeleton loaders
- Dark mode using class strategy
- Extended color palette and spacing

## Utility Classes Used

### Layout & Spacing
- `grid`, `flex`, `gap-*`, `p-*`, `m-*`
- Responsive prefixes: `sm:`, `md:`, `lg:`

### Colors & Theming
- Light: `bg-white`, `text-slate-900`, `border-slate-200`
- Dark: `dark:bg-slate-800`, `dark:text-slate-100`, `dark:border-slate-700`

### Interactive States
- `hover:`, `focus:`, `group-hover:`, `disabled:`
- Transform utilities: `hover:-translate-y-1`, `hover:scale-105`

### Transitions
- `transition-all`, `duration-150`, `duration-200`
- Easing: Default `ease-in-out`

## Responsive Breakpoints

```css
/* Tailwind breakpoints */
sm: 640px  /* Small tablets */
md: 768px  /* Large tablets */
lg: 1024px /* Laptops */
xl: 1280px /* Desktops */
```

## Component Structure

- No separate CSS files needed
- Styles co-located with components
- Consistent design system through utility classes
- Easy theme switching with dark mode utilities

## Benefits

- **Development Speed**: No context switching between CSS and JSX
- **Design Consistency**: Constrained design system
- **Bundle Size**: Only used utilities are included
- **Maintenance**: No unused CSS accumulation

## Custom Utilities

```css
@keyframes shimmer {
  0% { background-position: -200% 0 }
  100% { background-position: 200% 0 }
}
```

## Usage Patterns

```jsx
// Responsive grid
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

// Dark mode support
<div className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">

// Interactive states
<button className="hover:bg-blue-700 focus:ring-2 focus:ring-blue-500">
```