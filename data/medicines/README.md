# Medicine data

The local library contains exactly seven medicines:

| ID | Slug | Remedy | File |
| --- | --- | --- | --- |
| MED-001 | `arsenicum-album` | Arsenicum Album | `arsenicum-album.json` |
| MED-002 | `cinchona-officinalis` | Cinchona Officinalis | `cinchona-officinalis.json` |
| MED-003 | `cuprum-metallicum` | Cuprum Metallicum | `cuprum-metallicum.json` |
| MED-004 | `cephalandra-indica` | Cephalandra Indica | `cephalandra-indica.json` |
| MED-005 | `chamomilla` | Chamomilla | `chamomilla.json` |
| MED-006 | `crocus-sativus` | Crocus Sativus | `crocus-sativus.json` |
| MED-007 | `corallinum` | Corallinum (Corallium rubrum) | `corallinum.json` |

Each file is a complete `Medicine` record (`types/medicine.ts`). The same record
is stored in `medicines.content` (JSONB) in Supabase.

## Provenance and accuracy

- **Arsenicum Album**: preserved exactly as supplied with the existing project.
  It remains under Git history and is seeded unchanged. Enrichment of this entry
  is a separate content task so the original is never lost.
- **Cinchona officinalis**: Boericke, Clarke, Farrington and Allen keynotes —
  loss of vital fluids, every-other-day periodicity, touch sensitivity,
  tympanites, intermittent fever; relationships from Boericke.
- **Cuprum metallicum**: Boericke, Clarke, Hering and Boger — peripheral onset
  of cramps, clenched thumbs, knee aura, metallic taste, cold-water
  amelioration; relationships from Boericke.
- **Cephalandra indica**: Indian provings and clinical reports (S. C. Ghose);
  not a classical Boericke/Clarke remedy, and presented as such. Botanical name
  checked as *Coccinia grandis* (syn. *Coccinia indica*, *Cephalandra indica*),
  Cucurbitaceae.
- **Chamomilla**: Boericke, Nash, Pulford and Allen — oversensitivity to pain,
  one red/hot cheek, carried child, greenish dentition stools, sweat on the head;
  relationships from Boericke.
- **Crocus sativus**: Boericke, Nash, Allen, Phatak — dark stringy clots,
  sensation of something alive moving, alternating moods, chorea; relationships
  from Boericke.
- **Corallinum (Corallium rubrum)**: Boericke and Clarke — minute-gun spasmodic
  cough, post-nasal catarrh, epistaxis, cold-air sensitivity, purple face;
  relationships from Boericke/Clarke.

Fields without reliable traditional support were left empty or omitted rather
than filled with generic text. Corallinum's classical mental picture is not well
developed, so `mind` is omitted and this is explained in the record.

## Educational disclaimer

Homeopathic Materia Medica is presented as traditional educational reference
material. Nothing here is evidence-based medical treatment advice. Several
entries include strong warnings (for example malaria, diabetes, convulsions and
haemorrhage) in `traditionalNote` and `therapeuticApplications.note`.

## Editing workflow

1. Edit the relevant JSON file and keep IDs/slugs stable.
2. Run `npm run db:generate` to refresh `supabase/seed/medicines.sql`.
3. Run `npm run db:seed` to upsert the seven records into Supabase.
4. Run `npm run build` to confirm the TypeScript/JSON shape is still valid.

The JSON files are the single source of truth. Supabase is a delivery layer, not
a second hand-maintained copy.
