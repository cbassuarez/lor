import { ArrowUpRight } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import {
  REC_COMP_SLUG,
  REC_UTPB_SLUG,
  PaneKey,
  TargetId,
  claims,
  contentByTarget,
  highlights,
  sectionDescriptors,
  sharedContent,
  throughLine,
} from './data';
import './recBrief.shell.css';
import './recBrief.print.css';
import { AppShell } from './components/AppShell';
import { Card, CardHeader } from './components/Card';
import { Chip } from './components/Chip';
import { CopyButton } from './components/CopyButton';
import { Pane } from './components/Pane';
import { PdfPreviewModal } from './components/PdfPreviewModal';
import { Section } from './components/Section';
import { Toast } from './components/Toast';
import { isExternalUrl, toInternalUrl } from './utils/url';

export function RecLetterBriefPage({ targetId }: { targetId: TargetId }) {
  const slug = targetId === 'utpb' ? REC_UTPB_SLUG : REC_COMP_SLUG;
  const accentHue = useMemo(() => {
    const hues = [190, 215, 245, 275, 305, 25, 45, 120];
    return hues[Math.floor(Math.random() * hues.length)];
  }, []);
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

  useEffect(() => {
    const previousTitle = document.title;
    document.title =
      targetId === 'utpb'
        ? 'Letter Brief — Sebastian Suarez-Solis (UTPB)'
        : 'Letter Brief — Sebastian Suarez-Solis (Composition/Music Tech)';

    const faviconHref = toInternalUrl('rec/favicon-rec.svg');
    let iconLink = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    const previousIconHref = iconLink?.getAttribute('href');
    let created = false;

    if (!iconLink) {
      iconLink = document.createElement('link');
      iconLink.rel = 'icon';
      document.head.appendChild(iconLink);
      created = true;
    }

    iconLink.setAttribute('href', faviconHref);

    return () => {
      document.title = previousTitle;
      if (iconLink) {
        if (previousIconHref) {
          iconLink.setAttribute('href', previousIconHref);
        } else if (created) {
          iconLink.remove();
        } else {
          iconLink.removeAttribute('href');
        }
      }
    };
  }, [targetId]);

  const showCopied = () => {
    setToast(true);
    window.setTimeout(() => setToast(false), 1500);
  };

  const toFileUrl = (link: string) => {
    if (isExternalUrl(link)) return link;
    const relativePath = link.startsWith('rec/') ? link : `rec/${slug}/assets/${link}`;
    return toInternalUrl(relativePath);
  };

  const highlightCards = useMemo(
    () => [
      ...highlights.software.map((item) => ({ ...item, variant: 'software' as const })),
      ...highlights.music.map((item) => ({ ...item, variant: 'performance' as const })),
      ...highlights.research.map((item) => ({ ...item, variant: 'research' as const })),
    ],
    [],
  );

  const overviewPane = (
    <Pane title="I. Overview" className="h-full" hint="Context and emphasis guidance for the letter." accentHue={accentHue}>
      <Card className="scroll-mt-12">
        <CardHeader title={sharedContent.heroTitle} />
        <p className="text-sm text-neutral-300">{sharedContent.heroSubhead}</p>
        <p className="text-xs text-neutral-400">{sharedContent.metadata}</p>
      </Card>

      <Section title="a. Courses taught (recent)">
        <Card>
          <ul className="list-disc pl-4 space-y-1 marker:text-neutral-600 text-[13px] leading-5 text-neutral-200">
            {sharedContent.courses.map((course) => (
              <li key={course}>{course}</li>
            ))}
          </ul>
        </Card>
      </Section>

      <Section title="b. Recommended emphasis">
        <Card>
          <ol className="list-decimal pl-4 space-y-1 marker:text-neutral-600 text-[13px] leading-5 text-neutral-200">
            {contentByTarget[targetId].emphasis.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </Card>
      </Section>
    </Pane>
  );

  const claimsPane = (
    <Pane title="II. Claims" className="h-full" hint="Ready-to-cite claims and recent evidence." accentHue={accentHue}>
      <Section title="a. 5 claims you can safely make" descriptor={sectionDescriptors.claims}>
        {claims.map((item, index) => (
          <Card key={item.claim}>
            <CardHeader
              title={`Claim ${index + 1}`}
              action={<CopyButton text={`Claim: ${item.claim}\nEvidence:\n- ${item.evidence.join('\n- ')}`} onCopied={showCopied} label="Copy" className="print-hide" />}
            />
            <div className="space-y-1">
              <p className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">Claim</p>
              <p className="text-[13px] leading-5 text-neutral-200">{item.claim}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">Evidence</p>
              <ul className="pl-4 space-y-1 marker:text-neutral-600 text-[13px] leading-5 text-neutral-200 list-disc">
                {item.evidence.map((evidence) => (
                  <li key={evidence}>{evidence}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-1">
              <p className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">Where it shows up</p>
              <a
                href={toFileUrl(item.link)}
                target={isExternalUrl(item.link) ? '_blank' : undefined}
                rel={isExternalUrl(item.link) ? 'noopener noreferrer' : undefined}
                className="group inline-flex items-center gap-1 text-xs text-neutral-300 underline"
              >
                Source material
                {isExternalUrl(item.link) ? <ArrowUpRight className="h-3.5 w-3.5 opacity-70 transition-opacity group-hover:opacity-100" /> : null}
              </a>
            </div>
          </Card>
        ))}

        <Card>
          <CardHeader title={throughLine.label} subtext="Cross-cutting through-line" />
          <div className="space-y-1">
            <p className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">Claim</p>
            <p className="text-[13px] leading-5 text-neutral-200">{throughLine.claim}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">Evidence</p>
            <ul className="pl-4 space-y-1 marker:text-neutral-600 text-[13px] leading-5 text-neutral-200 list-disc">
              {throughLine.evidence.map((evidence) => (
                <li key={evidence}>{evidence}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-1">
            <p className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">Where it shows up</p>
            <a
              href={toFileUrl(throughLine.link)}
              target={isExternalUrl(throughLine.link) ? '_blank' : undefined}
              rel={isExternalUrl(throughLine.link) ? 'noopener noreferrer' : undefined}
              className="group inline-flex items-center gap-1 text-xs text-neutral-300 underline"
            >
              Source material
              {isExternalUrl(throughLine.link) ? <ArrowUpRight className="h-3.5 w-3.5 opacity-70 transition-opacity group-hover:opacity-100" /> : null}
            </a>
          </div>
        </Card>
      </Section>

      <Section title="b. Recent work highlights" descriptor={sectionDescriptors.highlights}>
        {highlightCards.map((item) => (
          <Card key={item.title}>
            <CardHeader title={item.title} subtext={item.what} action={<Chip label={item.variant} variant={item.variant} />} />
            <ul className="pl-4 space-y-1 marker:text-neutral-600 text-[13px] leading-5 text-neutral-200 list-disc">
              {item.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
            <a
              href={toFileUrl(item.link)}
              target={isExternalUrl(item.link) ? '_blank' : undefined}
              rel={isExternalUrl(item.link) ? 'noopener noreferrer' : undefined}
              className="group inline-flex items-center gap-1 text-xs text-neutral-300 underline"
            >
              Source material
              {isExternalUrl(item.link) ? <ArrowUpRight className="h-3.5 w-3.5 opacity-70 transition-opacity group-hover:opacity-100" /> : null}
            </a>
          </Card>
        ))}
      </Section>
    </Pane>
  );

  const kitPane = (
    <Pane title="III. Letter kit" className="h-full" hint="Copy-ready paragraphs and submission logistics." accentHue={accentHue}>
      <p className="border border-neutral-800 bg-neutral-900/40 p-2 text-xs text-neutral-300 lg:hidden">You may want to skim Overview/Claims first.</p>

      <Section title="a. Letter-writing kit" descriptor={sectionDescriptors.kit}>
        <ParagraphCard title="Paragraph 1" text={sharedContent.coreParagraph} onCopied={showCopied} className="scroll-mt-12" />
        <ParagraphCard title="Paragraph 2" text={contentByTarget[targetId].roleParagraph} onCopied={showCopied} />
        <ParagraphCard title="Paragraph 3" text={sharedContent.closingStarter} onCopied={showCopied} />
      </Section>

      <Section title="b. How to submit letters">
        {contentByTarget[targetId].logistics.map((item) => (
          <Card key={item.school}>
            <CardHeader title={item.school} />
            <p className="text-[13px] leading-5 text-neutral-200">Deadline: {item.deadline}</p>
            <p className="text-[13px] leading-5 text-neutral-200">Where/how to upload: {item.upload}</p>
            <p className="text-[13px] leading-5 text-neutral-200">Contact: {item.contact}</p>
          </Card>
        ))}
        <Card>
          <p className="text-xs italic text-neutral-300">If you need 2 bullet examples from recent work to match your emphasis, text/email me and I’ll send them immediately.</p>
        </Card>
      </Section>
    </Pane>
  );

  return (
    <>
      <AppShell
        slug={slug}
        onOpen={(label, filename, url) => setModal({ open: true, title: `${label} — ${filename}`, url })}
        onCopied={showCopied}
        coreParagraph={sharedContent.coreParagraph}
        accentHue={accentHue}
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

function ParagraphCard({
  title,
  text,
  onCopied,
  className = '',
}: {
  title: string;
  text: string;
  onCopied: () => void;
  className?: string;
}) {
  return (
    <Card className={className}>
      <CardHeader title={title} action={<CopyButton text={text} onCopied={onCopied} label="Copy" className="print-hide" />} />
      <p className="text-[13px] leading-5 text-neutral-200">{text}</p>
    </Card>
  );
}
