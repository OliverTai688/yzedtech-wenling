import { notFound } from 'next/navigation';
import { services } from '../../../src/data';
import ServiceDetailClientPage from './ServiceDetailClientPage';

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

export default async function Page({ params }: ServiceDetailPageProps) {
  const { id } = await params;
  const service = services.find((s) => s.id === id);

  if (!service) {
    notFound();
  }

  return <ServiceDetailClientPage service={service} />;
}
