# The Visual Way

Visual, interactive course notes that run entirely in the browser. No server, no database, no build step: every file in this repository is served as it is.

The first course is **PPS, the visual way** (CES 1102, B.Tech CSE Semester 1): five units, 29 lessons, 37 practice problems, 5 unit quizzes.

## What is where

```
index.html                    Site home: course list, install tips, backup buttons
manifest.webmanifest          Makes the site installable ("Add to Home Screen")
sw.js                         Offline support (cache list and update rules)
assets/
  style.css                   One stylesheet for every course (colours are tokens on :root)
  engine.js                   Quizzes, tracers, labs, progress, learners, backup
  icons/                      App icons for phones and tablets
courses/ces1102/
  index.html                  Course home with the unit roadmap
  unit1.html … unit5.html     One page per unit (lessons, lab, quiz, cheat sheet)
  progress.html               "My progress" dashboard and data controls
  course.js                   Course outline: lesson ids and lab problem ids per unit
  data/unit1.js … unit5.js    Questions and widget data for each unit
```

## Try it on your computer

Any static web server works. From the repository folder:

```
python3 -m http.server 8000
```

Then open http://localhost:8000. Offline support is switched off on localhost, so you always see your latest edits.

## Publish on GitHub Pages

1. Create a new repository on GitHub (for example `visual-way`) and upload or push these files to the `main` branch.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**, choose `main` and `/ (root)`, and save.
4. After a minute the site is live at `https://<your-username>.github.io/visual-way/`.

Every later push to `main` republishes automatically. All links are relative, so the site works at any address, including a custom domain (add it under Settings → Pages).

The `.nojekyll` file tells GitHub Pages to serve the files exactly as they are.

**Moving later:** Cloudflare Pages, Netlify and Vercel can each import this repository directly. Use no build command and the repository root as the output folder.

## Install on an iPad, iPhone or Android phone

- **iPad or iPhone:** open the site in Safari, tap **Share**, then **Add to Home Screen**.
- **Android:** open it in Chrome, tap the menu, then **Add to Home screen** or **Install app**.

It then opens full screen like an app and works offline after the first visit.

## How progress is stored

Everything is saved with the browser's `localStorage` on that device. Nothing is sent anywhere.

| Key | Contents |
|---|---|
| `pps-learners` | The list of learner names and who is currently selected |
| `pps:learner:<name>` | That learner's data, per course: lessons completed, solved lab problems, every quick-check and quiz answer (choice, right or wrong, attempts, time), quiz attempts and best scores |

On first visit the site asks **who is learning**. Each name has separate progress, so two learners can share a device. The chip in the top bar switches between them.

**Backups.** Storage belongs to one browser on one device. Clearing website data erases it, and Safari can clear data for sites that have not been visited for about a week; sites added to the Home Screen are not affected by that rule. Use **Export progress** (site home or My progress) to download a `.json` backup, and **Load from a file** to restore it on any device.

## Updating content

Offline support serves the saved copy instantly and fetches the new version in the background, so a change you publish shows up on the **second** visit. To make every device refresh at once, change `VERSION` in `sw.js` (for example `v1` → `v2`) when you publish.

If you add a new file to a course, also add its path to the `PRECACHE` list in `sw.js` so it works offline from the first visit.

### Add or edit a quick-check question

Open `courses/ces1102/data/unitN.js` and find the lesson's list, for example `Q.u2l3`. Each question looks like this:

```js
{q:'What is 17 % 5?', o:['3','2','3.4','5'], a:1, w:'17 = 3 × 5 + 2, so the remainder is 2.'}
```

`q` is the question, `o` the options, `a` the index of the right option (counting from 0) and `w` the explanation shown after answering. Unit quiz questions use the same format in `PPS.UQ.uN`.

Saved answers are matched by position, so add new questions at the **end** of a list rather than in the middle.

### Add a lesson

1. In `unitN.html`, copy an existing `<section class="lesson" …>` block and give it a new id (for example `u2l8`) and a `data-title` beginning with its number (for example `2.8 Nested loops`).
2. Inside it, the quick-check box is `<div class="qc" data-set="u2l8"></div>` and the completion button is `<button class="btn ghost" data-done="u2l8"></button>`.
3. Add the questions to `data/unit2.js` as `Q.u2l8=[ … ];`.
4. Add `["u2l8", "2.8 Nested loops"]` to that unit's `lessons` list in `course.js`.

The side menu and the unit mind map pick up the new lesson automatically.

### Add a practice lab problem

Copy an `<article class="prob" …>` block in the unit's practice lab section. Give its **Mark as solved** button a new `data-solved` id (for example `u2labI`), set `data-level` to `easy`, `medium` or `exam`, and add the same id to the unit's `labs` list in `course.js`.

### Building blocks you can reuse

| In the HTML | Data in `data/unitN.js` | What it does |
|---|---|---|
| `<div class="qc" data-set="KEY">` | `PPS.Q.KEY = [questions]` | Quick-check questions, answers saved |
| `<div class="uq" data-set="uN">` | `PPS.UQ.uN = [questions]` | One-at-a-time unit quiz with score history |
| `<div class="widget tracer" data-t="KEY">` | `PPS.TR.KEY = {code, steps}` or `{code, input, gen}` | Step through code with memory and output |
| `<div class="widget stepper" data-s="KEY">` | `PPS.ST.KEY = {frames}` | Step-by-step text, with ⟦highlight⟧ marks |
| `<div class="widget tabsw" data-k="KEY">` | `PPS.TB.KEY = {title, tabs}` | Switch between code versions |
| `<div class="widget orderw" data-o="KEY">` | `PPS.OR.KEY = {steps, ok, hint}` | Put steps in the right order |
| `<div class="widget sorterw" data-s="KEY">` | `PPS.SO.KEY = {cats, items}` | Sort items into categories |
| `<pre class="c" data-hl>` | (none) | C code with syntax colouring |
| `<div class="mindmap" data-center="Unit N|Title">` | (none) | Mind map built from the unit's lessons |

Look at the existing data files for complete examples of each.

### Add a new course

1. Copy `courses/ces1102` to `courses/<new-id>`.
2. In every page of the new folder, change `data-course="ces1102"` on the `<body>` tag to the new id.
3. In `course.js`, change the id and outline.
4. Replace the unit pages and data files with the new content, and update the top-bar links if the number of units differs.
5. Add a course card to the site `index.html` (copy the existing `course-card` link and its `course.js` script tag).
6. Add the new files to `PRECACHE` in `sw.js`.

Progress for each course is stored separately under its id, so courses never overwrite each other.
