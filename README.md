# Homestead Academy

A home-education platform for classical Christian homeschooling households. Vite + React + Supabase.

Features: student dashboards, a curriculum library with interactive lessons, a Multiplication Quest game, region-aware transcripts (US / UK / EU / Asia), a parent improvement-plan dashboard, and an admin panel for CRUD + weekly planning. All data is per-household and protected by Supabase Row Level Security.

## Local setup

```bash
npm install
cp .env.example .env.local   # then fill in your Supabase URL + anon key
npm run dev
```

The app runs at http://localhost:5173.

## Supabase

1. Create a project at https://supabase.com.
2. Copy the **Project URL** and **anon public key** (Project Settings → API).
3. Paste them into `.env.local`:

   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJ...
   ```

4. In the Supabase SQL editor, run the migrations in order:
   - `supabase/migrations/001_initial_schema.sql`
   - `supabase/migrations/002_rls_policies.sql`

   These create the `households`, `students`, `grades`, `attendance`, and `lesson_completions` tables and the RLS policies that scope every row to the signed-in household.

5. Under **Authentication → Providers**, make sure **Email** is enabled. Disable "Confirm email" for local testing, or keep it on and verify via email.

## Auth

- `/signup` — creates an auth user, a `households` row owned by that user, and seeds demo students/grades so the UI has something to render.
- `/login` — password sign-in, then redirect to wherever the user was heading.
- All app routes (`/`, `/student/:id`, `/parent`, `/library`, `/library/:slug`, `/lesson/:id`, `/games`, `/games/mult-quest`, `/records`, `/admin`) require a session; unauthenticated visitors are bounced to `/login`.
- Sign out from the top-right button in the nav.

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import it in Vercel as a Vite project — Vercel auto-detects `npm run build` and `dist/`.
3. Add the two env vars in **Settings → Environment Variables**:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy. Redeploy after any env-var change.

Client-side routing is handled by React Router; Vercel serves the Vite SPA without extra config.

## Project layout

```
src/
  App.jsx               # auth + data providers, routes
  main.jsx              # BrowserRouter entry
  index.css             # Google Fonts + keyframe animations
  components/           # Nav, RegionSetupModal, SubjectDetailPane, StudentForm
  views/                # Home, Student, Parent, Library, SubjectDetail, Lesson, Games, Records, Admin, Login, Signup
  games/                # MultiplicationQuest
  data/                 # INITIAL_STUDENTS, subjectLibrary, mathGrade3, regions
  lib/
    supabase.js         # Supabase client
    auth.jsx            # AuthProvider + useAuth
    api.js              # household / students / grades / seeding
    gradeConversion.js  # avg, trend, mastery, regional transcripts
supabase/migrations/    # schema + RLS
```

## Scripts

- `npm run dev` — Vite dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the production build locally
- `npm run lint` — ESLint
