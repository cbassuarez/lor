import { useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Accordion } from './components/Accordion';
import { Card } from './components/Card';
import { Chip } from './components/Chip';
import { CopyButton } from './components/CopyButton';
import { Section } from './components/Section';
import { StickyNav, navItems } from './components/StickyNav';
import { TargetTabs } from './components/TargetTabs';
import { REC_SLUG, TargetKey, contact, emphasisByTarget, submissionItems } from './data';
import './rec-letter-brief.css';

const coreParagraph = 'Sebastian Suarez-Solis (they/them) is a composer-performer and educator whose work moves fluidly between percussion performance, interactive media, and spatial practice. What stands out is the way they connect rigor with curiosity: they build situations where students and collaborators can feel how structure becomes experience – whether that structure is a rehearsal method, a performance system, or a physical installation.';
const rolePerc = 'For a percussion director role, Sebastian brings deep, stylistically wide performance experience and an ability to translate that experience into clear, motivating pedagogy. Their background spans contemporary solo repertoire and advanced technique (e.g. Alejandro Viñao’s Khan Variations, Frederic Rzewski’s To the Earth, and Georges Aperghis’ Le Corps à Corps), alongside multi-percussion, mallets, drumset, and ensemble settings – paired with real instructional leadership in higher-ed contexts.';
const roleComp = 'Sebastian’s recent work is best understood in three connected strands: (1) music (large-format pieces and performance-installations including CONSTRUCTIONS and Organum quadruplum “lux nova”), (2) software/tools (systems for reactive scores, responsive portfolio publishing, rehearsal synchronization, and just-intonation practice), and (3) research/writing (a “production of space” / cybernetics-centered dissertation portfolio and hosted writing samples). The materials are organized so letter writers can quickly cite specific outcomes, listen/watch examples, and reference concrete artifacts.';
const closingStarter = 'I also want to note Sebastian’s collegiality and reliability in collaborative settings. They follow through consistently, communicate clearly, and show a strong long-term trajectory that aligns well with institutions needing both artistic depth and operational steadiness.';

const claims = [
  {
    title: 'Claim 1',
    claim: 'Sebastian Suarez-Solis is a composer-performer working at the intersection of percussion, interactive media, and spatialized electroacoustic practice.',
    evidence: [
      'Composer-performer practice spanning percussion, interactive media, and spatial work.',
      'Recent major works and portfolio materials organized for fast citation.',
    ],
    links: [`/rec/${REC_SLUG}/assets/Suarez-Solis_Sebastian_Works_List.pdf`, `/rec/${REC_SLUG}/assets/Suarez-Solis_Sebastian_Submission_Packet.pdf`],
    chips: ['Performance', 'Research'],
  },
  {
    title: 'Claim 2',
    claim: 'As an educator, they build transferable technique – mapping shared physical concepts across instruments so students can write and perform idiomatically across the percussion family.',
    evidence: [
      'Transfer-based percussion pedagogy centered on technique that generalizes across instruments.',
      'Iterative score labs and reading sessions that treat revision as core skill.',
    ],
    links: [`/rec/${REC_SLUG}/assets/Suarez-Solis_Sebastian_Teaching_Portfolio.pdf`],
    chips: ['Teaching'],
  },
  {
    title: 'Claim 3',
    claim: 'They have proven, end-to-end leadership by founding and directing a CC-BY 4.0 nonprofit sample library, publishing 5TB of recordings with 25 artists and sustaining real audience reach through nonprofit infrastructure.',
    evidence: [
      'Founder/director of a CC-BY 4.0 nonprofit publishing multi-terabyte releases.',
      'Sustained delivery with multi-artist coordination and public-facing operations.',
    ],
    links: [`/rec/${REC_SLUG}/assets/Suarez-Solis_Sebastian_CV.pdf`],
    chips: ['Service'],
  },
  {
    title: 'Claim 4',
    claim: 'They build artist tools that make practice legible and shareable – e.g., Praetorius (audio-linked PDFs / responsive portfolio workflow) and Tenney (just-intonation tuner + lattice up to 31-limit), alongside related systems.',
    evidence: [
      'Tool-building that converts complex creative workflows into legible systems.',
      'Demonstrated software outputs across tuning, publishing, and rehearsal systems.',
    ],
    links: [`/rec/${REC_SLUG}/assets/Software_OnePager.pdf`, `/rec/${REC_SLUG}/assets/Suarez-Solis_Sebastian_Submission_Packet.pdf`],
    chips: ['Software'],
  },
  {
    title: 'Through-line',
    claim: 'Through-line: their work asks how systems produce space—bridging cybernetics, immanence, and “production of space” across composition, performance, and tooling.',
    evidence: [
      'Research framing connects cybernetics + production of space to practice-based work.',
      'Portfolio and writing samples emphasize method-to-artifact continuity.',
    ],
    links: [`/rec/${REC_SLUG}/assets/Writing_Samples.pdf`],
    chips: ['Research', 'Teaching'],
  },
];

export function RecLetterBriefPage() {
  const [target, setTarget] = useState<TargetKey>(() => (localStorage.getItem('recBriefTarget') as TargetKey) || 'utpb');
  const [active, setActive] = useState('overview');
  const reduced = useReducedMotion();

  useEffect(() => {
    localStorage.setItem('recBriefTarget', target);
  }, [target]);

  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((n): n is HTMLElement => n !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0.01 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const emphasis = useMemo(() => emphasisByTarget[target], [target]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-4 lg:grid lg:grid-cols-[220px_1fr] lg:gap-4">
      <StickyNav active={active} />
      <div className="space-y-4">
        <div className="sticky top-0 z-20 space-y-2 border border-slate-200 bg-slate-100 p-2 lg:hidden print:hidden">
          <TargetTabs target={target} onChange={setTarget} />
          <select
            value={active}
            className="w-full rounded border border-slate-300 bg-white p-2 text-sm"
            onChange={(e) => {
              const id = e.target.value;
              document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {navItems.map((item) => (
              <option key={item.id} value={item.id}>{item.label}</option>
            ))}
          </select>
        </div>

        <motion.section
          id="overview"
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={reduced ? {} : { opacity: 1, y: 0 }}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <h1 className="text-2xl font-semibold">Letter of Recommendation Brief — Sebastian Suarez-Solis</h1>
          <p className="mt-2 text-sm text-slate-700">Composer-performer + educator + builder of accountable creative systems (music, research, software).</p>
          <div className="mt-4 flex flex-wrap gap-2 print:hidden">
            <a className="rounded bg-slate-900 px-3 py-2 text-sm text-white" href="#submit">How to submit letters</a>
            <CopyButton text={coreParagraph} label="Copy core paragraph" />
            <a className="rounded border border-slate-300 bg-white px-3 py-2 text-sm" href={`/rec/${REC_SLUG}/assets/Suarez-Solis_Sebastian_CV.pdf`}>Download CV</a>
            <a className="rounded border border-slate-300 bg-white px-3 py-2 text-sm" href={`/rec/${REC_SLUG}/assets/Suarez-Solis_Sebastian_Submission_Packet.pdf`}>Download Submission Packet</a>
          </div>
          <p className="mt-3 text-xs text-slate-600">DMA Performer-Composer (ABD), CalArts; Lecturer in Composition, Herb Alpert School of Music</p>
          <div className="mt-4 hidden lg:block print:hidden"><TargetTabs target={target} onChange={setTarget} /></div>

          <div className="mt-4">
            <h3 className="font-medium">Courses taught (recent)</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
              <li>Writing for Percussion (GR)</li>
              <li>BFA Composers’ Forum (UG)</li>
              <li>Individual lessons / supervision (5–10 students per semester)</li>
              <li>HASOM Project Week guest lecture (large-format composition module)</li>
            </ul>
          </div>
        </motion.section>

        <Section id="claims" title="5 claims you can safely make (with evidence)">
          <div className="mb-4 print:hidden"><TargetTabs target={target} onChange={setTarget} /></div>
          <div className="mb-4 rounded-lg border border-slate-200 bg-slate-50 p-3">
            <h3 className="font-medium">Recommended emphasis</h3>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm">
              {emphasis.map((item) => <li key={item}>{item}</li>)}
            </ol>
          </div>
          <div className="space-y-3">
            {claims.map((item) => (
              <Card key={item.title}>
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="mt-1 text-sm">{item.claim}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {['Teaching', 'Research', 'Software', 'Performance', 'Service'].map((chip) => (
                    <Chip key={chip} label={chip} muted={!item.chips.includes(chip) && !((target === 'utpb' && (chip === 'Teaching' || chip === 'Performance' || chip === 'Service')) || (target === 'comp' && (chip === 'Research' || chip === 'Software')))} />
                  ))}
                </div>
                <ul className="mt-2 list-disc pl-5 text-sm text-slate-700">{item.evidence.map((e) => <li key={e}>{e}</li>)}</ul>
                <div className="mt-2 text-sm">
                  <p className="font-medium">Where it shows up:</p>
                  <ul className="list-disc pl-5">
                    {item.links.map((l) => (
                      <li key={l}><a className="text-blue-700 underline" href={l}>{l}</a></li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </Section>

        <Section id="highlights" title="Recent work highlights">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            <Card><h3 className="font-semibold">Software</h3><ul className="mt-2 space-y-2 text-sm">
              {['SyncTimer','Tenney','Viable Prompt Protocol','Praetorius','Flux'].map((n)=><li key={n}><p className="font-medium">{n}</p><p>Operational tool for creative workflow execution and documentation.</p><ul className="list-disc pl-5"><li>Demonstrates shipped systems thinking.</li><li>Citable as concrete technical output.</li><li><a className="text-blue-700 underline" href={`/rec/${REC_SLUG}/assets/Software_OnePager.pdf`}>Where to click</a></li></ul></li>)}
            </ul></Card>
            <Card><h3 className="font-semibold">Music</h3><ul className="mt-2 space-y-2 text-sm">
              {['CONSTRUCTIONS','AMPLIFICATIONS','Organum quadruplum “lux nova”'].map((n)=><li key={n}><p className="font-medium">{n}</p><p>Piece/performance artifact with spatial or interactive compositional structure.</p><ul className="list-disc pl-5"><li>Novelty: form integrated with system constraints.</li><li>Proves role as composer-performer.</li><li><a className="text-blue-700 underline" href={`/rec/${REC_SLUG}/assets/Music_Reel.pdf`}>View/listen</a></li></ul></li>)}
            </ul></Card>
            <Card><h3 className="font-semibold">Research + Teaching</h3><ul className="mt-2 space-y-2 text-sm">
              {['Embodied Manifestations of Space','Studio-and-lab pedagogy','Writing for Percussion / Composers’ Forum'].map((n)=><li key={n}><p className="font-medium">{n}</p><p>Research-to-instruction framework with practice-linked artifacts.</p><ul className="list-disc pl-5"><li>Novelty: method traced to outcomes.</li><li>Proves instructional and scholarly coherence.</li><li><a className="text-blue-700 underline" href={n==='Embodied Manifestations of Space'?`/rec/${REC_SLUG}/assets/Writing_Samples.pdf`:`/rec/${REC_SLUG}/assets/Suarez-Solis_Sebastian_Teaching_Portfolio.pdf`}>Where to click</a></li></ul></li>)}
            </ul></Card>
          </div>
        </Section>

        <Section id="copy" title="Letter-writing kit (copy-ready paragraphs)">
          <div className="space-y-2">
            <Accordion title="Core paragraph (general)"><p className="text-sm">{coreParagraph}</p><div className="mt-2 print:hidden"><CopyButton text={coreParagraph} /></div></Accordion>
            <Accordion title="Role-specific paragraph (Percussion Director)"><p className="text-sm">{rolePerc}</p><div className="mt-2 print:hidden"><CopyButton text={rolePerc} /></div></Accordion>
            <Accordion title="Role-specific paragraph (Composition + Music Tech)"><p className="text-sm">{roleComp}</p><div className="mt-2 print:hidden"><CopyButton text={roleComp} /></div></Accordion>
          </div>
          <div className="mt-4 rounded border border-slate-200 p-3">
            <p className="text-sm">{closingStarter}</p>
            <div className="mt-2 print:hidden"><CopyButton text={closingStarter} /></div>
          </div>
        </Section>

        <Section id="links" title="Materials">
          <ul className="space-y-1 text-sm">
            <li><a className="text-blue-700 underline" href={`/rec/${REC_SLUG}/assets/Suarez-Solis_Sebastian_CV.pdf`}>CV (PDF)</a></li>
            <li><a className="text-blue-700 underline" href={`/rec/${REC_SLUG}/assets/Suarez-Solis_Sebastian_Teaching_Portfolio.pdf`}>Teaching portfolio (PDF)</a></li>
            <li><a className="text-blue-700 underline" href={`/rec/${REC_SLUG}/assets/Suarez-Solis_Sebastian_Works_List.pdf`}>Works list (PDF)</a></li>
            <li><a className="text-blue-700 underline" href={`/rec/${REC_SLUG}/assets/Suarez-Solis_Sebastian_Submission_Packet.pdf`}>Submission packet (PDF)</a></li>
          </ul>
          <h3 className="mt-4 font-medium">If you only click one thing</h3>
          <ul className="mt-2 space-y-1 text-sm">
            <li><a className="text-blue-700 underline" href={`/rec/${REC_SLUG}/assets/Music_Reel.pdf`}>Music</a></li>
            <li><a className="text-blue-700 underline" href={`/rec/${REC_SLUG}/assets/Software_OnePager.pdf`}>Software</a></li>
            <li><a className="text-blue-700 underline" href={`/rec/${REC_SLUG}/assets/Teaching_Snapshot.pdf`}>Teaching</a></li>
          </ul>
        </Section>

        <Section id="submit" title="How to submit letters">
          <ul className="space-y-2">
            {submissionItems.map((item) => (
              <li key={item.school} className="rounded border border-slate-200 p-3 text-sm">
                <p className="font-medium">{item.school}</p>
                <p>Deadline: {item.deadline}</p>
                <p>Upload: {item.upload}</p>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm">Contact: <a className="text-blue-700 underline" href={`mailto:${contact.email}`}>{contact.email}</a></p>
          <p className="mt-3 text-sm italic">If you need 2 bullet examples from recent work to match your emphasis, text/email me and I’ll send them immediately.</p>
        </Section>
      </div>
    </main>
  );
}
