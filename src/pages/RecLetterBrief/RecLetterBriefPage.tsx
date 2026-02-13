import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  REC_COMP_PATH,
  REC_COMP_SLUG,
  REC_UTPB_PATH,
  REC_UTPB_SLUG,
  TargetId,
  claims,
  contact,
  contentByTarget,
  fileDefs,
  sharedContent,
  throughLine,
} from './data';
import { Card } from './components/Card';
import { Chip } from './components/Chip';
import { CopyButton } from './components/CopyButton';
import { PdfPreviewModal } from './components/PdfPreviewModal';
import { Toast } from './components/Toast';
import { TopChrome } from './components/TopChrome';
import './recBrief.print.css';

const claimLinkMap: Record<string, string> = {
  'CV PDF': 'Suarez-Solis_Sebastian_CV.pdf',
  'Submission packet PDF': 'Suarez-Solis_Sebastian_Submission_Packet.pdf',
  'Teaching portfolio PDF': 'Suarez-Solis_Sebastian_Teaching_Portfolio.pdf',
  'Works list PDF': 'Suarez-Solis_Sebastian_Works_List.pdf',
  'Software one-pager PDF': 'Software_OnePager.pdf',
  'Writing samples PDF': 'Writing_Samples.pdf',
};

export function RecLetterBriefPage() {
  const location = useLocation();
  const targetId: TargetId = location.pathname === REC_COMP_PATH ? 'comp' : 'utpb';
  const slug = targetId === 'utpb' ? REC_UTPB_SLUG : REC_COMP_SLUG;
  const assetBase = `/rec/${slug}/assets`;
  const [toast, setToast] = useState(false);
  const [modal, setModal] = useState<{ open: boolean; title: string; url: string }>({ open: false, title: '', url: '' });

  useEffect(() => {
    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement('meta');
      robots.setAttribute('name', 'robots');
      document.head.appendChild(robots);
    }
    robots.setAttribute('content', 'noindex, nofollow');
  }, []);

  const openFile = (label: string, filename: string, url: string) => setModal({ open: true, title: `${label} — ${filename}`, url });
  const showCopied = () => {
    setToast(true);
    window.setTimeout(() => setToast(false), 1500);
  };

  const roleParagraph = contentByTarget[targetId].roleParagraph;
  const logistics = contentByTarget[targetId].logistics;
  const cvLink = `${assetBase}/${fileDefs[0].filename}`;
  const packetLink = `${assetBase}/${fileDefs[1].filename}`;

  const highlights = useMemo(
    () => ({
      software: ['SyncTimer', 'Tenney', 'Viable Prompt Protocol', 'Praetorius', 'Flux'],
      music: ['CONSTRUCTIONS', 'AMPLIFICATIONS', 'Organum quadruplum “lux nova”'],
      research: ['Embodied Manifestations of Space', 'Studio-and-lab pedagogy', 'Writing for Percussion / Composers’ Forum'],
    }),
    [],
  );

  return (
    <main className="rec-brief-page min-h-screen bg-neutral-950 p-3 text-sm text-neutral-100 md:p-4">
      <div className="mx-auto max-w-[1500px] space-y-3">
        <div className="print-hide">
          <TopChrome assetBase={assetBase} selectedPath={targetId === 'utpb' ? REC_UTPB_PATH : REC_COMP_PATH} onOpen={openFile} />
        </div>

        <div className="grid gap-3 lg:grid-cols-3">
          <div className="space-y-3">
            <Card>
              <h1 className="text-base font-semibold">{sharedContent.heroTitle}</h1>
              <p className="mt-1 text-neutral-300">{sharedContent.heroSubhead}</p>
              <div className="mt-2 flex flex-wrap gap-2 print-hide">
                <CopyButton text={sharedContent.coreParagraph} onCopied={showCopied} label="Copy core paragraph" />
                <a href={cvLink} className="rounded-none border border-neutral-700 px-2 py-1 text-xs hover:bg-neutral-800">Download CV</a>
                <a href={packetLink} className="rounded-none border border-neutral-700 px-2 py-1 text-xs hover:bg-neutral-800">Download Submission Packet</a>
              </div>
              <p className="mt-2 text-xs text-neutral-400">{sharedContent.metadata}</p>
            </Card>

            <Card>
              <h2 className="font-mono text-xs uppercase tracking-wider text-neutral-300">Courses taught (recent)</h2>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {sharedContent.courses.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </Card>

            <Card>
              <h2 className="font-mono text-xs uppercase tracking-wider text-neutral-300">Recommended emphasis</h2>
              <ol className="mt-2 list-decimal space-y-1 pl-5">
                {contentByTarget[targetId].emphasis.map((item) => <li key={item}>{item}</li>)}
              </ol>
            </Card>
          </div>

          <div className="space-y-3">
            <Card>
              <h2 className="font-mono text-xs uppercase tracking-wider text-neutral-300">5 claims you can safely make (with evidence)</h2>
              <div className="mt-2 space-y-2">
                {claims.map((item) => {
                  const copyText = `Claim: ${item.claim}\nEvidence:\n- ${item.evidence.join('\n- ')}`;
                  return (
                    <div key={item.claim} className="rounded-none border border-neutral-700 p-2">
                      <p className="text-sm">{item.claim}</p>
                      <div className="mt-1 flex flex-wrap gap-1">{item.chips.map((chip) => <Chip key={chip} label={chip} />)}</div>
                      <ul className="mt-1 list-disc pl-5 text-xs text-neutral-300">{item.evidence.map((e) => <li key={e}>{e}</li>)}</ul>
                      <p className="mt-1 text-xs text-neutral-400">Where it shows up:</p>
                      <ul className="list-disc pl-5 text-xs">{item.links.map((link) => <li key={link}><a className="underline" href={`${assetBase}/${claimLinkMap[link]}`}>{link}</a></li>)}</ul>
                      <div className="mt-2 print-hide"><CopyButton text={copyText} onCopied={showCopied} /></div>
                    </div>
                  );
                })}
                <div className="rounded-none border border-neutral-700 p-2">
                  <p className="font-mono text-xs uppercase tracking-wider">{throughLine.label}</p>
                  <p className="mt-1">{throughLine.body}</p>
                  <div className="mt-1 flex flex-wrap gap-1">{throughLine.chips.map((chip) => <Chip key={chip} label={chip} />)}</div>
                  <ul className="mt-1 list-disc pl-5 text-xs text-neutral-300">{throughLine.evidence.map((e) => <li key={e}>{e}</li>)}</ul>
                  <ul className="list-disc pl-5 text-xs">{throughLine.links.map((link) => <li key={link}><a className="underline" href={`${assetBase}/${claimLinkMap[link]}`}>{link}</a></li>)}</ul>
                </div>
              </div>
            </Card>

            <Card>
              <h2 className="font-mono text-xs uppercase tracking-wider text-neutral-300">Recent work highlights</h2>
              <div className="mt-2 grid gap-2 md:grid-cols-2">
                {highlights.software.map((title) => <HighlightCard key={title} title={title} link={`${assetBase}/Software_OnePager.pdf`} description="Software artifact for live or studio workflow." />)}
                {highlights.music.map((title) => <HighlightCard key={title} title={title} link={`${assetBase}/Music_Reel.pdf`} description="Performance/composition output with spatial or structural focus." />)}
                {highlights.research.map((title) => <HighlightCard key={title} title={title} link={title === 'Embodied Manifestations of Space' ? `${assetBase}/Writing_Samples.pdf` : `${assetBase}/Suarez-Solis_Sebastian_Teaching_Portfolio.pdf`} description="Research-teaching bridge with documented method." />)}
              </div>
            </Card>
          </div>

          <div className="space-y-3">
            <Card>
              <h2 className="font-mono text-xs uppercase tracking-wider text-neutral-300">Letter-writing kit (copy-ready paragraphs)</h2>
              <ParagraphCard text={sharedContent.coreParagraph} onCopied={showCopied} />
              <ParagraphCard text={roleParagraph} onCopied={showCopied} />
              <ParagraphCard text={sharedContent.closingStarter} onCopied={showCopied} />
            </Card>

            <Card>
              <h2 className="font-mono text-xs uppercase tracking-wider text-neutral-300">How to submit letters</h2>
              <ul className="mt-2 space-y-2">
                {logistics.map((item) => (
                  <li key={item.school} className="rounded-none border border-neutral-700 p-2 text-xs">
                    <p className="font-medium text-neutral-100">{item.school}</p>
                    <p>Deadline: {item.deadline}</p>
                    <p>Upload: {item.upload}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-xs">Contact: <a className="underline" href={`mailto:${contact.email}`}>{contact.email}</a></p>
              <p className="mt-2 text-xs italic">If you need 2 bullet examples from recent work to match your emphasis, text/email me and I’ll send them immediately.</p>
            </Card>

            <Card>
              <h2 className="font-mono text-xs uppercase tracking-wider text-neutral-300">Contact</h2>
              <p className="mt-1 text-xs">Primary: <a className="underline" href={`mailto:${contact.email}`}>{contact.email}</a></p>
            </Card>
          </div>
        </div>
      </div>

      <PdfPreviewModal open={modal.open} title={modal.title} url={modal.url} onClose={() => setModal({ open: false, title: '', url: '' })} />
      <Toast show={toast} message="Copied" />
    </main>
  );
}

function ParagraphCard({ text, onCopied }: { text: string; onCopied: () => void }) {
  return (
    <div className="mt-2 rounded-none border border-neutral-700 p-2">
      <p className="text-xs leading-relaxed text-neutral-200">{text}</p>
      <div className="mt-2 print-hide">
        <CopyButton text={text} onCopied={onCopied} />
      </div>
    </div>
  );
}

function HighlightCard({ title, description, link }: { title: string; description: string; link: string }) {
  return (
    <div className="rounded-none border border-neutral-700 p-2">
      <h3 className="text-xs font-semibold uppercase tracking-wide">{title}</h3>
      <p className="mt-1 text-xs text-neutral-300">{description}</p>
      <ul className="mt-1 list-disc pl-4 text-xs text-neutral-300">
        <li>Demonstrates concrete outcomes and process discipline.</li>
        <li>Easy citation path for a recommendation letter.</li>
        <li><a className="underline" href={link}>Where to click</a></li>
      </ul>
    </div>
  );
}
