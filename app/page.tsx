import HomeHero from '../src/components/home/HomeHero';
import NeedEntries from '../src/components/home/NeedEntries';
import { GoldenPath, PathSection } from '../src/components/home/GoldenPath';
import {
  FeaturedServices,
  HomeTestimonials,
  FounderIntro,
  HomeMedia,
  ResourcesBand,
  HomeFaq,
} from '../src/components/home/HomeSections';
import CtaBand from '../src/components/CtaBand';
import StickyCtaBar from '../src/components/StickyCtaBar';
import { homeContent } from '../src/data';

export const metadata = {
  title: '豐盛之翼學苑｜能量療癒・希塔與靈氣認證培訓',
  description: '豐盛之翼學苑提供能量療癒服務與希塔、靈氣認證培訓，由創辦人文齡老師帶領，陪你在感情、家庭、事業與人生方向中找到適合的起點。',
};

// 首頁（PLN-004 D1；定案見 RES-002 §1）。區塊順序依 RES-001 §6.1：
// Hero → 需求入口 → 精選服務 →（精選見證，待授權）→ 創辦人 → 媒體 → 免費資源 → FAQ → 最終 CTA。
// 新手入門引導待文案（RPT-001 T1）到位後加在需求入口之後。
export default function Page() {
  return (
    <>
      <HomeHero />
      <GoldenPath>
        <PathSection id="personas-section">
          <NeedEntries />
        </PathSection>
        <PathSection id="featured-services">
          <FeaturedServices />
        </PathSection>
        {homeContent.testimonials.authorized && (
          <PathSection id="home-testimonials">
            <HomeTestimonials />
          </PathSection>
        )}
        <PathSection id="founder">
          <FounderIntro />
        </PathSection>
        <PathSection id="media-section">
          <HomeMedia />
        </PathSection>
        <PathSection id="free-resources">
          <ResourcesBand />
        </PathSection>
        <PathSection id="home-faq">
          <HomeFaq />
        </PathSection>
      </GoldenPath>
      <CtaBand onHome />
      <StickyCtaBar
        primary={{ label: homeContent.stickyCta.primary, href: '#personas-section' }}
        lineLabel={homeContent.stickyCta.line}
      />
    </>
  );
}
