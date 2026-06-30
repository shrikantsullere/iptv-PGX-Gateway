# Coding & Styling Rules
**PGX Gateway Frontend**

## 1. UI & Aesthetics Guidelines
- **NEVER use generic light themes.** PGX Gateway is exclusively Dark Mode. Use `#0C0C11` or `#09090B` for backgrounds.
- **Card Styling:** Always use rounded corners (`rounded-2xl` or `rounded-3xl`). Use subtle borders (`border-white/5` or `border-white/10`) to separate elements, never harsh solid lines.
- **Elevated Elements:** Use `bg-[#13131A]` or `bg-white/5` for cards sitting on top of the main background.
- **Typography:** Fonts must be clean and modern. Avoid serif fonts.

## 2. Component Rules
- **Functional Components:** All React components must be functional components using arrow functions (`const Component = () => {}`).
- **Icons:** Exclusively use `lucide-react` for iconography to ensure consistent stroke weights and sizes.
- **Avoid Global CSS:** Do not write custom CSS classes in `index.css` unless absolutely necessary (e.g., for custom scrollbars). Use Tailwind utilities.

## 3. Data Table Rules
- Always wrap `<table>` in a `div` with `overflow-x-auto` to prevent breaking mobile layouts.
- Table headers (`<th>`) should be uppercase, small text, and muted (`text-gray-500 text-xs tracking-wider`).
- Use badges for status columns (`bg-green-500/10 text-green-500 rounded-full`).

## 4. Charting Rules (Recharts)
- Always use `ResponsiveContainer` to wrap charts so they scale to the parent div.
- Remove default Recharts axis lines and tick lines to maintain a clean look (`axisLine={false} tickLine={false}`).
- Tooltips must be styled to match the dark theme (`contentStyle={{ backgroundColor: '#09090B', borderColor: '#333' }}`).

## 5. Routing Rules
- All links must use `react-router-dom`'s `<Link>` component. Never use standard `<a>` tags for internal navigation to avoid page reloads.
- Update `Sidebar.jsx` active states dynamically by checking `window.location.pathname`.
