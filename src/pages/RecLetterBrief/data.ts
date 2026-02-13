export const REC_SLUG = '2026-a7c91f';
export const REC_PATH = `/rec/${REC_SLUG}/`;

export type TargetKey = 'utpb' | 'comp';

export const targetOptions = [
  { key: 'utpb' as const, label: 'UT Permian Basin (AP / Percussion Director)' },
  { key: 'comp' as const, label: 'Composition + Music Tech' },
];

export const emphasisByTarget: Record<TargetKey, string[]> = {
  utpb: [
    'Teaching leadership + curriculum design (syllabi/rubrics; critique cycles; clear outcomes).',
    'Transfer-based percussion pedagogy (conceptual + physical mapping across instruments).',
    'Performance credibility with specific contemporary anchors (Viñao / Rzewski / Aperghis) as evidence of seriousness + range.',
    'Production and reliability (curating/producing concert series; running labs; delivering on deadlines).',
    'Community-facing service + governance (institutional committee work; hosting/curation).',
    'Applied versatility (multiple instruments; ensemble contexts; coaching students into performance-ready outcomes).',
  ],
  comp: [
    'Composer-researcher framing (production of space + cybernetics as a coherent research spine).',
    'Systems builder credibility (Flux / Praetorius / Tenney / SyncTimer / VPP as evidence of shipped tools).',
    'Interdisciplinary output (interactive media + spatialized electroacoustic practice, not just “pieces on stands”).',
    'Studio-lab pedagogy (iterative critique, prototypes → revision → publication; assessment clarity).',
    'Technical fluency (Max/MSP, SuperCollider, Swift, TypeScript, etc.) as means to musical ends.',
    'Evidence of durable leadership (nonprofit infrastructure + multi-artist production).',
  ],
};

export const submissionItems = [
  {
    school: 'UT Permian Basin — AP / Percussion Director',
    deadline: 'TODO: add deadline',
    upload: 'TODO: portal upload instructions + recommender flow',
  },
  {
    school: 'Composition + Music Tech (various)',
    deadline: 'TODO: add deadline',
    upload: 'TODO: list schools + per-school portal links',
  },
];

export const contact = {
  email: 'TODO-replace@example.com',
};
