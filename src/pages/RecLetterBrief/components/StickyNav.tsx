const items = [
  { id: 'overview', label: 'Overview' },
  { id: 'claims', label: 'Claims' },
  { id: 'highlights', label: 'Highlights' },
  { id: 'copy', label: 'Copy Blocks' },
  { id: 'links', label: 'Links' },
  { id: 'submit', label: 'Submit' },
];

export function StickyNav({ active }: { active: string }) {
  return (
    <nav className="sticky top-4 hidden rounded-xl border border-slate-200 bg-white p-3 shadow-sm lg:block print:hidden">
      <ul className="space-y-1 text-sm">
        {items.map((item) => (
          <li key={item.id}>
            <a
              className={`block rounded px-2 py-1 ${active === item.id ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'}`}
              href={`#${item.id}`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export const navItems = items;
