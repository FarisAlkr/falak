# Past Bagrut Archive

Repository for past Israeli 5-unit (5 יח״ל) physics Bagrut exams. Used to source authentic exam questions for each unit's `exam.ts` and to keep Falak's content tightly aligned with the actual exam style.

## Exam codes

| Code        | Section                          | Falak units                   |
| ----------- | -------------------------------- | ----------------------------- |
| **036-361** | מכניקה (Mechanics)               | 1, 2, 3, 4, 5, 6, 7           |
| **036-371** | אלקטרומגנטיות (Electromagnetism) | 8, 9, 10                      |
| **036-282** | קרינה וחומר (Radiation & Matter) | 11, 12, 13, 14                |
| _no code_   | מעבדה (Lab)                      | not covered by Falak directly |

## Target years and sittings

Six years × two sittings (where available):

- 2020 (קיץ summer · חורף winter)
- 2021 (קיץ · חורף)
- 2022 (קיץ · חורף)
- 2023 (קיץ · חורף)
- 2024 (קיץ · חורף)
- 2025 (קיץ · חורף)

Some years/sittings are missing from public sources. Document gaps in this file as they're discovered.

## Sources

Past exams are typically published by:

1. **Israeli Ministry of Education** — official source. https://cms.education.gov.il/EducationCMS/Units/Mazkirut_Pedagogit/Phizika/
2. **Weizmann Institute Physics Teachers Center (PTC)** — high-quality solution archives. https://ptc.weizmann.ac.il/
3. **Geva, Kidum, High-Q** — major tutoring platforms; sometimes have higher-quality scans than the Ministry's PDFs.
4. **Campus IL** — Israeli MOOC platform; free physics courses with linked exam reviews. https://campus.gov.il/

## File-naming convention

```
bagrut/
├── mechanics/
│   ├── 2024_summer_036-361.pdf
│   ├── 2024_summer_036-361_solutions.pdf
│   ├── 2024_winter_036-361.pdf
│   └── ...
├── electromagnetism/
│   └── 2024_summer_036-371.pdf
└── radiation-matter/
    └── 2024_summer_036-282.pdf
```

Solutions live alongside the exam with the suffix `_solutions.pdf` so a tooling pass can pair them automatically.

## Copyright and usage

Past Bagrut exams are published by the Ministry of Education. They are publicly distributed for educational review.

**Before using any verbatim question in Falak's `exam.ts`:**

1. Confirm fair-use applicability for educational platforms. Common practice in Israeli tutoring is unrestricted reuse of past questions with attribution; verify this still holds before commercial Falak distribution.
2. Cite the year, sitting, and exam code in the question's metadata: `year: 2024, season: 'summer'`.
3. Do not redistribute the original PDFs in the deployed product. The PDFs in this folder are local working copies for question authoring.

If usage rights become a concern at any point, switch to **Bagrut-style original questions** authored by Faris that mirror past-exam patterns without verbatim reuse.

## Status

Empty as of 2026-04-26. Population is a Phase 0 → Phase 1 bridge task; targeted to be substantially populated before §4.2.1 (Unit 3 exam research) begins.
