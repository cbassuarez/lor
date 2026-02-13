import { useEffect, useMemo, useState } from 'react';
import {
  REC_COMP_PATH,
  REC_COMP_SLUG,
  REC_UTPB_PATH,
  REC_UTPB_SLUG,
  PaneKey,
  TargetId,
  claims,
  contentByTarget,
  highlights,
  sharedContent,
  throughLine,
} from './data';
import './recBrief.shell.css';
import './recBrief.print.css';
import { AppShell } from './components/AppShell';
import { Card } from './components/Card';
import { CopyButton } from './components/CopyButton';
import { Pane } from './components/Pane';
import { PdfPreviewModal } from './components/PdfPreviewModal';
import { Toast } from './components/Toast';

export function RecLetterBriefPage({ targetId }: { targetId: TargetId }) {
  const slug = targetId === 'utpb' ? REC_UTPB_SLUG : REC_COMP_SLUG;
  const selectedPath = targetId === 'utpb' ? REC_UTPB_PATH : REC_COMP_PATH;
  const assetBase = `/rec/${slug}/assets`;
  const [toast, setToast] = useState(false);
  const [mobilePane, setMobilePane] = useState<PaneKey>('kit');
  const [modal, setModal] = useState<{ open: boolean; title: string; url: string }>({ open: false, title: '', url: '' });

  useEffect(() => {
    document.body.classList.add('recbrief-lock');
    document.documentElement.classList.add('recbrief-lock');
    return () => {
      document.body.classList.remove('recbrief-lock');
      document.documentElement.classList.remove('recbrief-lock');
    };
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)').matches;
    if (!desktop) setMobilePane((localStorage.getItem('recBriefPane') as PaneKey) || 'kit');
  }, []);

  useEffect(() => {
    localStorage.setItem('recBriefPane', mobilePane);
  }, [mobilePane]);

  useEffect(() => {
    let robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    let created = false;
    if (!robots) {
      robots = document.createElement('meta');
      robots.name = 'robots';
      robots.content = 'noindex, nofollow';
      document.head.appendChild(robots);
      created = true;
    } else {
      robots.content = 'noindex, nofollow';
    }
    return () => {
      if (created) robots?.remove();
    };
  }, []);

  const showCopied = () => {
    setToast(true);
    window.setTimeout(() => setToast(false), 1500);
  };

  const toFileUrl = (filename: string) => `${assetBase}/${filename}`;

  const highlightCards = useMemo(() => [...highlights.software, ...highlights.music, ...highlights.research], []);

  const overviewPane = (
    <Pane title="Overview & Emphasis" className="h-full">
      <Card>
        <h1 className="text-sm font-semibold">{sharedContent.heroTitle}</h1>
        <p className="mt-1 text-sm text-neutral-300">{sharedContent.heroSubhead}</p>
        <p className="mt-2 text-xs text-neutral-400">{sharedContent.metadata}</p>
      </Card>
      <Card className="mt-2">
        <h2 className="font-mono text-xs uppercase tracking-wider text-neutral-300">Courses taught (recent)</h2>
        <ul className="mt-2 list-disc pl-5 text-sm">
          {sharedContent.courses.map((course) => (
            <li key={course}>{course}</li>
          ))}
        </ul>
      </Card>
      <Card className="mt-2">
        <h2 className="font-mono text-xs uppercase tracking-wider text-neutral-300">Recommended emphasis</h2>
        <ol className="mt-2 list-decimal pl-5 text-sm">
          {contentByTarget[targetId].emphasis.map((item) => (
            <li key={item} className="mb-1">{item}</li>
          ))}
        </ol>
      </Card>
    </Pane>
  );

  const claimsPane = (
    <Pane title="Claims & Highlights" className="h-full">
      <Card>
        <h2 className="font-mono text-xs uppercase tracking-wider text-neutral-300">5 claims you can safely make (with evidence)</h2>
        <div className="mt-2 space-y-2">
          {claims.map((item, index) => (
            <div key={item.claim} className="rounded-none border border-neutral-700 p-2">
              <p className="text-sm">{item.claim}</p>
              <ul className="mt-1 list-disc pl-5 text-xs text-neutral-300">
                {item.evidence.map((evidence) => (
                  <li key={evidence}>{evidence}</li>
                ))}
              </ul>
              <a href={toFileUrl(item.link)} className="mt-1 inline-block text-xs underline">Where to click</a>
              <div className="mt-2 print-hide">
                <CopyButton text={`Claim: ${item.claim}\nEvidence:\n- ${item.evidence.join('\n- ')}`} onCopied={showCopied} label={`Copy claim ${index + 1}`} />
              </div>
            </div>
          ))}
          <div className="rounded-none border border-neutral-700 p-2">
            <p className="font-mono text-xs uppercase tracking-wider">{throughLine.label}</p>
            <p className="mt-1 text-sm">{throughLine.claim}</p>
            <ul className="mt-1 list-disc pl-5 text-xs text-neutral-300">
              {throughLine.evidence.map((evidence) => (
                <li key={evidence}>{evidence}</li>
              ))}
            </ul>
            <a href={toFileUrl(throughLine.link)} className="mt-1 inline-block text-xs underline">Where to click</a>
          </div>
        </div>
      </Card>

      <Card className="mt-2">
        <h2 className="font-mono text-xs uppercase tracking-wider text-neutral-300">Recent work highlights</h2>
        <div className="mt-2 space-y-2">
          {highlightCards.map((item) => (
            <div key={item.title} className="rounded-none border border-neutral-700 p-2">
              <p className="text-xs font-semibold uppercase tracking-wide">{item.title}</p>
              <p className="mt-1 text-xs text-neutral-300">{item.what}</p>
              <ul className="mt-1 list-disc pl-5 text-xs text-neutral-300">
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <a href={toFileUrl(item.link)} className="mt-1 inline-block text-xs underline">Where to click</a>
            </div>
          ))}
        </div>
      </Card>
    </Pane>
  );

  const kitPane = (
    <Pane title="Letter kit & Submit" className="h-full">
      <p className="mb-2 text-xs italic text-neutral-400 lg:hidden">You may want to skim Overview/Claims first.</p>
      <Card>
        <h2 className="font-mono text-xs uppercase tracking-wider text-neutral-300">Letter-writing kit (copy-ready paragraphs)</h2>
        <ParagraphCard text={sharedContent.coreParagraph} onCopied={showCopied} />
        <ParagraphCard text={contentByTarget[targetId].roleParagraph} onCopied={showCopied} />
        <ParagraphCard text={sharedContent.closingStarter} onCopied={showCopied} />
      </Card>
      <Card className="mt-2">
        <h2 className="font-mono text-xs uppercase tracking-wider text-neutral-300">How to submit letters</h2>
        <ul className="mt-2 space-y-2 text-xs">
          {contentByTarget[targetId].logistics.map((item) => (
            <li key={item.school} className="rounded-none border border-neutral-700 p-2">
              <p>{item.school}</p>
              <p>Deadline: {item.deadline}</p>
              <p>Where/how to upload: {item.upload}</p>
              <p>Contact: {item.contact}</p>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-xs italic">If you need 2 bullet examples from recent work to match your emphasis, text/email me and I’ll send them immediately.</p>
      </Card>
    </Pane>
  );

  return (
    <>
      <AppShell
        selectedPath={selectedPath}
        assetBase={assetBase}
        onOpen={(label, filename, url) => setModal({ open: true, title: `${label} — ${filename}`, url })}
        onCopied={showCopied}
        coreParagraph={sharedContent.coreParagraph}
        mobilePane={mobilePane}
        setMobilePane={setMobilePane}
        overview={overviewPane}
        claims={claimsPane}
        kit={kitPane}
      />
      <PdfPreviewModal open={modal.open} title={modal.title} url={modal.url} onClose={() => setModal({ open: false, title: '', url: '' })} />
      <Toast show={toast} message="Copied" />
    </>
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
