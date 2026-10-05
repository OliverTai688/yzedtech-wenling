import { notFound } from 'next/navigation';
import OfferingDetail from '../../../src/components/offering/OfferingDetail';
import { offeringContent } from '../../../src/content/offerings';
import { certificationCourses, offeringsContent, siteLinks, thetaTrainingCourses } from '../../../src/data';

const allTrainingItems = [...thetaTrainingCourses, ...certificationCourses];

interface TrainingDetailPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return allTrainingItems.map((item) => ({ id: item.id }));
}

export async function generateMetadata({ params }: TrainingDetailPageProps) {
  const { id } = await params;
  const course = allTrainingItems.find((c) => c.id === id);
  if (!course) {
    return { title: '找不到此課程｜豐盛之翼學苑' };
  }
  return {
    title: `${course.name}｜豐盛之翼學苑`,
    description: course.objective,
  };
}

// 課程詳細頁（PLN-004 D3；定案見 RES-002 §3）。與服務詳細頁共用 OfferingDetail；
// 希塔療癒三門課另外顯示「學習路徑」，標出這門課在三階中的位置。
export default async function Page({ params }: TrainingDetailPageProps) {
  const { id } = await params;
  const theta = thetaTrainingCourses.find((c) => c.id === id);
  const cert = certificationCourses.find((c) => c.id === id);
  const course = theta ?? cert;
  if (!course) {
    notFound();
  }
  const labels = offeringsContent;
  const facts = theta
    ? [theta.duration, theta.certification, ...(theta.prerequisite ? [theta.prerequisite] : [])]
    : [course.duration];

  return (
    <OfferingDetail
      back={{ label: labels.detail.courseBack, href: '/training' }}
      eyebrow={theta ? labels.training.thetaTrack : labels.training.reikiTrack}
      title={course.name}
      facts={facts}
      price={course.price}
      cta={{ label: labels.detail.courseCta, href: course.ctaLink ?? siteLinks.line }}
      content={offeringContent[id]}
      fallbackDescription={course.objective}
      audience={course.targetAudience}
      path={
        theta
          ? {
              steps: thetaTrainingCourses.map((c) => ({
                id: c.id,
                name: c.level,
                href: `/training/${c.id}`,
                current: c.id === id,
              })),
            }
          : undefined
      }
    />
  );
}
