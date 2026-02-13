export const REC_UTPB_SLUG = '2026-a7c91f';
export const REC_COMP_SLUG = '2026-f13d0c2b';

export const REC_UTPB_PATH = `/rec/${REC_UTPB_SLUG}/`;
export const REC_COMP_PATH = `/rec/${REC_COMP_SLUG}/`;

export type TargetId = 'utpb' | 'comp';

export const pageOptions = [
  { label: 'UT Permian Basin (AP / Percussion Director)', path: REC_UTPB_PATH, targetId: 'utpb' as const },
  { label: 'Composition + Music Tech', path: REC_COMP_PATH, targetId: 'comp' as const },
];

export const fileDefs = [
  { key: 'cv', label: 'CV', filename: 'Suarez-Solis_Sebastian_CV.pdf' },
  { key: 'submission', label: 'Submission packet', filename: 'Suarez-Solis_Sebastian_Submission_Packet.pdf' },
  { key: 'teaching', label: 'Teaching portfolio', filename: 'Suarez-Solis_Sebastian_Teaching_Portfolio.pdf' },
  { key: 'works', label: 'Works list', filename: 'Suarez-Solis_Sebastian_Works_List.pdf' },
  { key: 'software', label: 'Software one-pager', filename: 'Software_OnePager.pdf' },
  { key: 'writing', label: 'Writing samples', filename: 'Writing_Samples.pdf' },
  { key: 'music', label: 'Music reel', filename: 'Music_Reel.pdf' },
  { key: 'snapshot', label: 'Teaching snapshot', filename: 'Teaching_Snapshot.pdf' },
] as const;

export const sharedContent = {
  heroTitle: 'Letter of Recommendation Brief — Sebastian Suarez-Solis',
  heroSubhead: 'Composer-performer + educator + builder of accountable creative systems (music, research, software).',
  metadata: 'DMA Performer-Composer (ABD), CalArts; Lecturer in Composition, Herb Alpert School of Music',
  courses: [
    'Writing for Percussion (GR)',
    'BFA Composers’ Forum (UG)',
    'Individual lessons / supervision (5–10 students per semester)',
    'HASOM Project Week guest lecture (large-format composition module)',
  ],
  coreParagraph:
    'Sebastian Suarez-Solis (they/them) is a composer-performer and educator whose work moves fluidly between percussion performance, interactive media, and spatial practice. What stands out is the way they connect rigor with curiosity: they build situations where students and collaborators can feel how structure becomes experience – whether that structure is a rehearsal method, a performance system, or a physical installation.',
  closingStarter:
    'In sum, I recommend Sebastian with confidence. They are a reliable, collegial collaborator with a clear trajectory and the rare ability to connect artistic goals to concrete systems and outcomes. I believe they would contribute immediately to your students and faculty culture while also building durable work over the long term.',
};

export const contentByTarget: Record<TargetId, { emphasis: string[]; roleParagraph: string; logistics: { school: string; deadline: string; upload: string }[] }> = {
  utpb: {
    emphasis: [
      'Teaching leadership + curriculum design (syllabi/rubrics; critique cycles; clear outcomes).',
      'Transfer-based percussion pedagogy (conceptual + physical mapping across instruments).',
      'Performance credibility with specific contemporary anchors (Viñao / Rzewski / Aperghis) as evidence of seriousness + range.',
      'Production and reliability (curating/producing concert series; running labs; delivering on deadlines).',
      'Community-facing service + governance (institutional committee work; hosting/curation).',
      'Applied versatility (multiple instruments; ensemble contexts; coaching students into performance-ready outcomes).',
    ],
    roleParagraph:
      'For a percussion director role, Sebastian brings deep, stylistically wide performance experience and an ability to translate that experience into clear, motivating pedagogy. Their background spans contemporary solo repertoire and advanced technique (e.g. Alejandro Viñao’s Khan Variations, Frederic Rzewski’s To the Earth, and Georges Aperghis’ Le Corps à Corps), alongside multi-percussion, mallets, drumset, and ensemble settings – paired with real instructional leadership in higher-ed contexts.',
    logistics: [
      {
        school: 'UT Permian Basin — AP / Percussion Director',
        deadline: 'TODO: add deadline',
        upload: 'TODO: add portal upload steps for recommenders',
      },
    ],
  },
  comp: {
    emphasis: [
      'Composer-researcher framing (production of space + cybernetics as a coherent research spine).',
      'Systems builder credibility (Flux / Praetorius / Tenney / SyncTimer / VPP as evidence of shipped tools).',
      'Interdisciplinary output (interactive media + spatialized electroacoustic practice, not just “pieces on stands”).',
      'Studio-lab pedagogy (iterative critique, prototypes → revision → publication; assessment clarity).',
      'Technical fluency (Max/MSP, SuperCollider, Swift, TypeScript, etc.) as means to musical ends.',
      'Evidence of durable leadership (nonprofit infrastructure + multi-artist production).',
    ],
    roleParagraph:
      'Sebastian’s recent work is best understood in three connected strands: (1) music (large-format pieces and performance-installations including CONSTRUCTIONS and Organum quadruplum “lux nova”), (2) software/tools (systems for reactive scores, responsive portfolio publishing, rehearsal synchronization, and just-intonation practice), and (3) research/writing (a “production of space” / cybernetics-centered dissertation portfolio and hosted writing samples). The materials are organized so letter writers can quickly cite specific outcomes, listen/watch examples, and reference concrete artifacts.',
    logistics: [
      {
        school: 'Composition + Music Tech (various)',
        deadline: 'TODO: add school-specific deadlines',
        upload: 'TODO: add upload links/instructions per school',
      },
    ],
  },
};

export const claims = [
  {
    claim:
      'Sebastian Suarez-Solis is a composer-performer working at the intersection of percussion, interactive media, and spatialized electroacoustic practice.',
    evidence: [
      'Composer-performer practice spanning percussion, interactive media, and spatial work.',
      'Recent major works and portfolio materials organized for fast citation.',
    ],
    links: ['Works list PDF', 'Submission packet PDF'],
    chips: ['Performance', 'Research'],
  },
  {
    claim:
      'As an educator, they build transferable technique – mapping shared physical concepts across instruments so students can write and perform idiomatically across the percussion family.',
    evidence: [
      'Transfer-based percussion pedagogy centered on technique that generalizes across instruments.',
      'Iterative score labs and reading sessions that treat revision as core skill.',
    ],
    links: ['Teaching portfolio PDF'],
    chips: ['Teaching'],
  },
  {
    claim:
      'They have proven, end-to-end leadership by founding and directing a CC-BY 4.0 nonprofit sample library, publishing 5TB of recordings with 25 artists and sustaining real audience reach through nonprofit infrastructure.',
    evidence: [
      'Founder/director of a CC-BY 4.0 nonprofit publishing multi-terabyte releases.',
      'Sustained delivery with multi-artist coordination and public-facing operations.',
    ],
    links: ['CV PDF'],
    chips: ['Service'],
  },
  {
    claim:
      'They build artist tools that make practice legible and shareable – e.g., Praetorius (audio-linked PDFs / responsive portfolio workflow) and Tenney (just-intonation tuner + lattice up to 31-limit), alongside related systems.',
    evidence: [
      'Tool-building that converts complex creative workflows into legible systems.',
      'Demonstrated software outputs across tuning, publishing, and rehearsal systems.',
    ],
    links: ['Software one-pager PDF', 'Submission packet PDF'],
    chips: ['Software'],
  },
];

export const throughLine = {
  label: 'Through-line',
  body: 'Through-line: their work asks how systems produce space—bridging cybernetics, immanence, and “production of space” across composition, performance, and tooling.',
  evidence: [
    'Research framing connects cybernetics + production of space to practice-based work.',
    'Portfolio and writing samples emphasize method-to-artifact continuity.',
  ],
  links: ['Writing samples PDF'],
  chips: ['Research'],
};

export const contact = { email: 'TODO-replace@example.com' };
