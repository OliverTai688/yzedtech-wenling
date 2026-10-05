import { notFound } from 'next/navigation';
import OfferingDetail from '../../../src/components/offering/OfferingDetail';
import { offeringContent } from '../../../src/content/offerings';
import { offeringsContent, services, serviceTypes } from '../../../src/data';

interface ServiceDetailPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return services.map((service) => ({ id: service.id }));
}

export async function generateMetadata({ params }: ServiceDetailPageProps) {
  const { id } = await params;
  const service = services.find((s) => s.id === id);
  if (!service) {
    return { title: '找不到此服務｜豐盛之翼學苑' };
  }
  return {
    title: `${service.name}｜豐盛之翼學苑`,
    description: service.description,
  };
}

// 服務詳細頁（PLN-004 D2；定案見 RES-002 §2）。摘要欄位來自 src/data.ts 的 services，
// 完整文案來自 src/content/offerings.ts（文案集逐字轉出）。
export default async function Page({ params }: ServiceDetailPageProps) {
  const { id } = await params;
  const service = services.find((s) => s.id === id);
  if (!service) {
    notFound();
  }
  const type = serviceTypes.find((t) => t.serviceIds.includes(id));

  return (
    <OfferingDetail
      back={{ label: offeringsContent.detail.serviceBack, href: '/services' }}
      eyebrow={type?.label}
      title={service.name}
      facts={[service.duration]}
      price={service.price}
      cta={{ label: service.ctaText, href: service.ctaLink }}
      content={offeringContent[id]}
      fallbackDescription={service.description}
      audience={service.targetAudience}
    />
  );
}
