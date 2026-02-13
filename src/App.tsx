import { Route, Routes } from 'react-router-dom';
import { REC_PATH, REC_SLUG } from './pages/RecLetterBrief/data';
import { RecLetterBriefPage } from './pages/RecLetterBrief/RecLetterBriefPage';

function Home() {
  return (
    <main className="min-h-screen bg-slate-50 p-8 text-slate-800">
      <h1 className="text-2xl font-semibold">lor</h1>
      <p className="mt-2 text-sm">letters of rec static website</p>
      <p className="mt-4 text-xs text-slate-500">Direct URL route configured for private recommender brief.</p>
      <code className="mt-2 block rounded bg-white p-2 text-xs">{REC_PATH} ({REC_SLUG})</code>
    </main>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path={REC_PATH} element={<RecLetterBriefPage />} />
    </Routes>
  );
}
