# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/b56e9a3a-866e-4e42-97b4-5039ca24240d

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/b56e9a3a-866e-4e42-97b4-5039ca24240d) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Publishing a blog article

Start with `content/blog/ar/first-post.md`. Save Arabic articles under `content/blog/ar/` and English articles under `content/blog/en/`. Use lowercase letters, digits, and hyphens in each filename. For example, `content/blog/ar/website-planning.md` becomes `/ar/blog/website-planning`.

Each file starts with YAML front matter, followed by the article in Markdown.

```markdown
---
title: "Planning a business website"
description: "What to decide before you start building a business website."
date: 2026-11-24
draft: true
---

Start with the question the article answers.

## What to prepare

Write the rest of the article here.
```

- Use the publication date in `YYYY-MM-DD` format. The page uses the title from the front matter, so start any body headings at `##`.
- Use the same filename in both language folders when the files are translations of the same article. Each translation can be published independently.
- Put optional images in `public/blog-images/` and link to them from Markdown with a path such as `/blog-images/example.webp`.
- Keep `draft: true` while writing. Set `draft: false` when the article is ready, then run `npm run build` and publish through the site's regular deployment. The build generates the article page, archive entry and sitemap entry together.

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/b56e9a3a-866e-4e42-97b4-5039ca24240d) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
