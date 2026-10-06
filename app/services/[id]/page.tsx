import { notFound } from 'next/navigation';
import OfferingDetail from '../../../src/components/offering/OfferingDetail';
import { offeringContent } from '../../../src/content/offerings';
import { offeringMeta, offeringsContent, pageMeta, serviceBlurbs, services, serviceTypes } from '../../../src/data';

interface ServiceDetailPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return services.map((service) => ({ id: service.id }));
}

// <title> 是服務名稱加學苑名，description 是文案集 Home Block 3 的一句話（serviceBlurbs）。
export async function generateMetadata({ params }: ServiceDetailPageProps) {
  const { id } = await params;
  const service = services.find((s) => s.id === id);
  if (!service) {
    return pageMeta.home;
  }
  return offeringMeta(service.name, serviceBlurbs[id]);
}

// 服務詳細頁（PLN-006 P3；提案見 proposals/pages-v2/service-detail/PAGE.md）。名稱與按鈕文字來自
// src/data.ts 的 services（文案集原文），完整文案來自 src/content/offerings.ts（文案集逐字轉出）。
// 文案集沒有單句的費用或時長，所以費用不放在第一個畫面，而是頁內小導覽的「方案與費用」。
export default async function Page({ params }: ServiceDetailPageProps) {
  const { id } = await params;
  const service = services.find((s) => s.id === id);
  if (!service) {
    notFound();
  }
  const type = serviceTypes.find((t) => t.serviceIds.includes(id));

  return (
    <OfferingDetail
      route="service-detail"
      back={{ label: offeringsContent.detail.serviceBack, href: '/services' }}
      eyebrow={type?.label}
      title={service.name}
      cta={{ label: service.ctaText, href: service.ctaLink }}
      content={offeringContent[id]}
      fallbackDescription={serviceBlurbs[id]}
    />
  );
}
