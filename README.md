# Samia Rahman Sashi — Portfolio

A single-page, static portfolio site. No backend, no database, no build step.
Just `HTML5 + CSS3 + vanilla JavaScript`, designed to be hosted free on GitHub Pages.

```
index.html      → page structure
style.css       → all styling (light + dark themes)
script.js       → content config + interactions (THIS is where you edit content)
.nojekyll       → tells GitHub Pages to serve files as-is
assets/
  images/       → portrait, project covers, og-cover.svg
  icons/        → favicon.svg
  animations/   → (reserved for future use)
  pixel-cat/    → (reserved; the cat is currently drawn in script.js)
```

> **Where to edit content:** almost everything you'll want to change lives in the
> `CONFIG` object at the **top of `script.js`**. You rarely need to touch `index.html`.

---

## 1. Deploy to GitHub Pages

1. Create a new repository on GitHub (e.g. `sashi-portfolio`).
2. Upload all the files in this folder (keep the structure intact).
3. Go to **Settings → Pages**.
4. Under **Build and deployment → Source**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/ (root)`, then **Save**.
6. Wait ~1 minute. Your site will be live at
   `https://<your-username>.github.io/<repo-name>/`.

To use a custom domain later, add it under **Settings → Pages → Custom domain**.

---

## 2. Replace the profile photo

1. Add your image to `assets/images/` (e.g. `portrait.jpg`).
2. Open `index.html` and find the `portrait-card` block (in the About section).
3. Replace the inner placeholder with an image:

```html
<div class="portrait-card">
  <img src="assets/images/portrait.jpg" alt="Samia Rahman Sashi"
       style="width:100%;height:100%;object-fit:cover;" />
</div>
```

A portrait around **800×1000px** (4:5) looks best.

---

## 3. Change the email

In `script.js`, edit the `email` value in `CONFIG`:

```js
email: "your.name@email.com",
```

Both the Contact button and the page's mailto link update automatically.

---

## 4. Change the LinkedIn URL

In `script.js`, edit `linkedin` in `CONFIG`:

```js
linkedin: "https://www.linkedin.com/in/your-handle/",
```

Updates the hero button and the contact button at once.

---

## 5. Add Notes & Resources

In `script.js`, edit the `resources` object. Each card has a `title`, `desc`,
`icon`, and `link`.

- Leave `link: ""` → the card shows **“Coming soon”**.
- Add a URL → the card shows a working **Download** button.

```js
resources: {
  mathNotes: {
    title: "Mathematics Notes",
    desc: "Topic-wise notes and worked examples.",
    icon: "∑",
    link: ""   // ← paste a link here
  },
  ...
}
```

---

## 6. Add Google Drive links

For any Notes/Resources card **or** project, paste your Drive share link into `link`.

To make a Drive file open/download cleanly:
1. In Drive, **Share → General access → Anyone with the link**.
2. Copy the share link (looks like `https://drive.google.com/file/d/FILE_ID/view`).
3. Paste it straight into `link`. For a forced download you can use:
   `https://drive.google.com/uc?export=download&id=FILE_ID`

---

## 7. Add new projects

In `script.js`, add an entry to the `projects` array:

```js
projects: [
  {
    title: "My New Project",
    desc: "A short description.",
    cover: "assets/images/my-project.jpg", // leave "" for a soft gradient placeholder
    link: "https://..."                    // leave "" for "Coming soon"
  },
  ...
]
```

Project cards size themselves automatically — add as many as you like.

---

## 8. Replace the mathematical quote

In `script.js`, edit the `quote` object:

```js
quote: {
  text: "Your quote here.",
  author: "Author Name"
}
```

---

## 9. Modify Currently Learning topics

In `script.js`, edit the `learning` array. `pct` (0–100) controls the little
progress meter.

```js
learning: [
  { title: "Educational Psychology", pct: 70 },
  { title: "New Topic", pct: 40 },
  ...
]
```

---

## 10. Customize the pixel cat

- **Tooltip messages:** edit the `catTooltips` array in `CONFIG`.
- **Behaviour timing:** in `initCat()` (script.js), the idle loop fires every
  **15–30 seconds** — adjust the `15000 + Math.random() * 15000` values.
- **Appearance:** the cat is drawn as an inline SVG pixel grid inside `initCat()`.
  Each `<rect>` is one block; change `fill` colours or coordinates to restyle it.
  (The `assets/pixel-cat/` folder is reserved if you'd rather swap in image frames.)

---

## Notes

- **Theme:** the light/dark toggle respects the visitor's system setting on first
  visit, then remembers their choice (saved in `localStorage`).
- **Accessibility:** semantic HTML, keyboard focus styles, ARIA labels, and a
  “reduce motion” mode (animations switch off if the OS requests it).
- **Performance:** no frameworks or heavy libraries; only Google Fonts is loaded
  externally. Particles and petals are capped and disabled under reduced-motion.
- **Social preview:** `assets/images/og-cover.svg` is the link-share image.
  Replace it with a 1200×630 image and update the `og:image` / `twitter:image`
  paths in `index.html` if you want a custom one.
- **Favicon:** swap `assets/icons/favicon.svg` for your own.
