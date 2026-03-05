# HTML Quick Revision Notes (Interview-Focused)

**Goal:** short + most important + most asked. (Examples only where needed.)

---

## 1) HTML Skeleton (Minimum)
**Most asked:** What is the minimum HTML page?
```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Page Title</title>
</head>
<body>
  <h1>Hello</h1>
</body>
</html>
```
Learn more: https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Getting_started

---

## 2) DOCTYPE (Very Common Interview Question)
**Most asked:** What is `<!doctype html>` and why do we use it?
- It tells the browser to render the page in **standards mode** (modern HTML).
- Without it, browsers may enter **quirks mode**, causing layout/CSS issues.

Example:
```html
<!doctype html>
<html>
  <head><title>Doc</title></head>
  <body>...</body>
</html>
```
Learn more: https://developer.mozilla.org/en-US/docs/Glossary/Doctype

---

## 3) `<head>` vs `<body>`
**Most asked:** What goes in head vs body?
- **`<head>`:** metadata (title, meta, links to CSS, scripts often with `defer`)
- **`<body>`:** visible content (text, images, forms)

Learn more: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/head

---

## 4) Block vs Inline
**Most asked:** Difference?
- **Block:** new line, full width (`div`, `p`, `h1`)
- **Inline:** same line (`span`, `a`, `strong`)

```html
<p>Block with <strong>inline</strong> text.</p>
```
Learn more: https://developer.mozilla.org/en-US/docs/Web/HTML/Inline_elements

---

## 5) Headings & Page Structure
**Most asked:** Best practice for `h1`…`h6`?
- Use headings in order to represent hierarchy.
- Usually **one main `h1`** per page.

```html
<h1>Portfolio</h1>
<h2>Projects</h2>
<h3>Project A</h3>
```
Learn more: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements

---

## 6) Links (`<a>`)
**Most asked:** Open new tab safely?
```html
<a href="https://example.com" target="_blank" rel="noopener noreferrer">Visit</a>
```
**Most asked:** Absolute vs relative URL?
- Absolute: `https://site.com/page`
- Relative: `./page.html`, `/about`

Learn more: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a

---

## 7) Images (`<img>`) + `alt`
**Most asked:** Why is `alt` important?
- Accessibility (screen readers)
- Shows text if image fails

```html
<img src="cat.jpg" alt="Orange cat sitting on a sofa" width="300" />
```
Learn more: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img

---

## 8) Lists (`ul/ol/li`)
**Most asked:** `ul` vs `ol`?
```html
<ul><li>Milk</li><li>Eggs</li></ul>
<ol><li>Install</li><li>Run</li></ol>
```
Learn more: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul

---

## 9) Tables (Only for tabular data)
**Most asked:** Simple table with header?
```html
<table>
  <thead>
    <tr><th>Name</th><th>Role</th></tr>
  </thead>
  <tbody>
    <tr><td>Vishal</td><td>QA</td></tr>
  </tbody>
</table>
```
Learn more: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table

---

## 10) Forms (Super Common)
**Most asked:** Why use `<label>`?
- Better UX + accessibility (click label focuses input)

```html
<form>
  <label for="email">Email</label>
  <input id="email" name="email" type="email" required />
  <button type="submit">Submit</button>
</form>
```
Learn more: https://developer.mozilla.org/en-US/docs/Learn/Forms

### GET vs POST (Interview)
- **GET:** sends data in URL (not for sensitive), good for search.
- **POST:** sends data in request body, better for login/forms.

---

## 11) Common Input Types
**Most asked:** Common types?
- `text`, `email`, `password`, `number`, `date`, `file`, `checkbox`, `radio`

```html
<input type="password" name="pwd" />
<input type="checkbox" name="terms" /> I agree
```
Learn more: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input

---

## 12) Semantic HTML (Very Important)
**Most asked:** What is semantic HTML and why?
- Meaningful tags: `header`, `nav`, `main`, `section`, `article`, `footer`
- Improves accessibility + SEO + code clarity

```html
<main>
  <article>
    <h2>Post title</h2>
    <p>Content...</p>
  </article>
</main>
```
Learn more: https://developer.mozilla.org/en-US/docs/Glossary/Semantics

---

## 13) `div` vs `span`
**Most asked:** When to use?
- `div`: block container
- `span`: inline container

```html
<div class="card">Block container</div>
<p>Price: <span class="price">₹199</span></p>
```

---

## 14) `id` vs `class`
**Most asked:** Difference?
- `id`: unique per page (good for anchors / unique element)
- `class`: reusable (styling multiple elements)

```html
<h1 id="top">Title</h1>
<p class="muted">Small text</p>
```
Learn more: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id

---

## 15) HTML Entities (Special Characters)
**Most asked:** How to display `<` `>` `&`?
- `&lt;` `&gt;` `&amp;`

```html
<p>Use &lt;h1&gt; and &amp; keep it clean.</p>
```
Learn more: https://developer.mozilla.org/en-US/docs/Glossary/Entity

---

## 16) Meta Tags (Must Know)
**Most asked:** Important meta tags?
```html
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="description" content="Short page summary" />
```
Learn more: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta

---

## 17) CSS Including (HTML side)
**Most asked:** Inline vs internal vs external?
- Prefer **external CSS** (clean + scalable)

```html
<link rel="stylesheet" href="style.css" />
```

---

## 18) JavaScript Including (`defer` vs `async`)
**Most asked:** `defer` vs `async`?
- `defer`: downloads now, runs after HTML parses (order kept) ✅ most common
- `async`: runs ASAP when downloaded (order not guaranteed)

```html
<script src="app.js" defer></script>
```
Learn more: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script

---

## 19) Accessibility (Fast Points)
**Most asked:** How to improve accessibility quickly?
- Use correct headings order
- Always use `alt`
- Use `label` for inputs
- Prefer semantic tags
- Use buttons for actions (not clickable divs)

Learn more: https://developer.mozilla.org/en-US/docs/Learn/Accessibility/HTML

---

## 20) Common Tricky / Confusing Questions
**Q: Is HTML case-sensitive?** No (but best practice is lowercase).

**Q: Are tags self-closing in HTML?**
- Some elements are **void elements** (no closing tag): `img`, `br`, `hr`, `meta`, `link`, `input`.
- Others must have opening + closing tags.
Learn more: https://developer.mozilla.org/en-US/docs/Glossary/Void_element

**Q: `required` vs `placeholder`?**
- `required`: validation rule
- `placeholder`: hint text (not a value)

**Q: How to check errors?** Use W3C validator.
Link: https://validator.w3.org/

---

# Ultra-Short Interview/Viva Q&A (Top)
1. **What is HTML?** Markup language to structure web pages.
2. **What is DOCTYPE?** Declares HTML document type; triggers standards mode.
3. **HTML vs HTML5?** HTML5 adds semantic tags, media, better forms features.
4. **Semantic HTML?** Meaningful tags; improves accessibility/SEO.
5. **`id` vs `class`?** `id` unique; `class` reusable.
6. **Block vs inline?** Block new line; inline same line.
7. **Why `alt`?** Accessibility + fallback.
8. **Why `label`?** Accessibility + focus input.
9. **`defer` vs `async`?** `defer` ordered after parse; `async` ASAP unordered.
10. **GET vs POST?** GET in URL; POST in body.
