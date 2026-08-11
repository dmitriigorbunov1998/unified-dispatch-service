import type { Translate } from '@/shared/config/i18n';
import { HomeAdvantages } from './ui/HomeAdvantages';
import { HomeCta } from './ui/HomeCta';
import { HomeFeatures } from './ui/HomeFeatures';
import { HomeHero } from './ui/HomeHero';
import { HomeWorkflow } from './ui/HomeWorkflow';

import './Home.css';

export function Home({ t }: { t: Translate }) {
  return (
    <div className="landing">
      <div id="top">
        <HomeHero t={t} />
        <HomeFeatures t={t} />
        <HomeAdvantages t={t} />
        <HomeWorkflow t={t} />
        <HomeCta t={t} />
      </div>
    </div>
  );
}
