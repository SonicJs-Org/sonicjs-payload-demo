# Speed Demo Seed Scripts

Shared seed infrastructure for the SonicJS vs Payload CMS speed demo.
Both systems are seeded with **50,000 identical employees** (same names, departments,
regions, job titles, emails) so the comparison is apples-to-apples.

## How it works

| Step | Script | Output |
|------|--------|--------|
| 1 | `seed/generate.ts` | `seed/employees-seed.json` (12 MB, gitignored) |
| 2a | `seed/seed-payload.ts` | 50k employees → Payload D1 (`payload-sonicjs`) |
| 2b | `my-sonicjs-app/scripts/seed-employees-50k.ts` | 50k employees → SonicJS D1 |

Both seeders share the same seeded PRNG (LCG, seed=42) so even without the JSON
file, running either with `--inline` produces bitwise-identical data.

## Data layout

- **9 departments** (Engineering, Product, Design, Marketing, Sales, HR, Finance, Legal, Operations)
- **6 regions** (US-East, US-West, EU-West, EU-North, APAC, LATAM)
- **50,000 employees** — name, job title, department, region, email, phone, avatar seed

## Seeding Payload CMS

```bash
# 1. Authenticate with Cloudflare (if not already done)
pnpm wrangler login

# 2. Generate the canonical seed file
npx tsx seed/generate.ts

# 3. Seed Payload's D1 database (payload-sonicjs) directly via SQL
npx tsx seed/seed-payload.ts

# Dry-run to preview SQL execution without touching the database
npx tsx seed/seed-payload.ts --dry-run
```

## Seeding SonicJS

```bash
# From the sonicjs repo root:

# Option A: use the same JSON file (requires generate.ts to have been run)
SEED_FILE=../sonicjs-payload-demo/seed/employees-seed.json \
  npx tsx my-sonicjs-app/scripts/seed-employees-50k.ts

# Option B: generate inline (no JSON file needed — same PRNG, same output)
npx tsx my-sonicjs-app/scripts/seed-employees-50k.ts --inline

# Dry-run
npx tsx my-sonicjs-app/scripts/seed-employees-50k.ts --dry-run
```

## Technical details

### Payload schema (from `src/migrations/20261123_191629.ts`)
```
departments: id, name, description, icon, color, updated_at, created_at
regions:     id, name, display_name, timezone, flag_emoji, updated_at, created_at
employees:   id, first_name, last_name, department_id, job_title, region_id,
             email, phone, avatar_seed, updated_at, created_at
```

### SonicJS schema (from `my-sonicjs-app/migrations/0002_documents.sql`)
All collections stored in `documents` table as JSON in `data` column.
Each record seeded as `is_current_draft=1, is_published=1, status='published'` (single row).
Department/region references use deterministic IDs: `dept-engineering`, `region-us-east`, etc.

### PRNG
LCG (multiplicative congruential generator):
```
s = (s × 16807) mod 2147483647
value = (s − 1) / 2147483646
```
Both scripts use the same seed (`42`) and pick sequence, so they generate
the exact same sequence of departments, regions, names, and titles.
