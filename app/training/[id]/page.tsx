import { notFound } from 'next/navigation';
import OfferingDetail from '../../../src/components/offering/OfferingDetail';
import { offeringContent } from '../../../src/content/offerings';
import { certificationCourses, courseBlurbs, offeringMeta, offeringsContent, pageMeta, siteLinks, thetaTrainingCourses } from '../../../src/data';

const allTrainingItems = [...thetaTrainingCourses, ...certificationCourses];

interface TrainingDetailPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return allTrainingItems.map((item) => ({ id: item.id }));
}

// <title> 是課程名稱加學苑名，description 是文案集 Home Block 4 的一句話（courseBlurbs）。
export async function generateMetadata({ params }: TrainingDetailPageProps) {
  const { id } = await params;
  const course = allTrainingItems.find((c) => c.id === id);
  if (!course) {
    return pageMeta.home;
  }
  return offeringMeta(course.name, courseBlurbs[id]);
}

// 課程詳細頁（PLN-006 P3；提案見 proposals/pages-v2/course-detail/PAGE.md）。與服務詳細頁共用 OfferingDetail；
// 希塔療癒三門課另外顯示「學習路徑」，標出這門課在三階中的位置。
// 費用是文案集的條列原文（src/data.ts 的 price）。facts 的每一行都已經在該課程的「課程資訊」段落裡
// （同一份原文），所以不在頁首重複。
export default async function Page({ params }: TrainingDetailPageProps) {
  const { id } = await params;
  const theta = thetaTrainingCourses.find((c) => c.id === id);
  const cert = certificationCourses.find((c) => c.id === id);
  const course = theta ?? cert;
  if (!course) {
    notFound();
  }
  const labels = offeringsContent;

  return (
    <OfferingDetail
      route="course-detail"
      back={{ label: labels.detail.courseBack, href: '/training' }}
      eyebrow={theta ? labels.training.thetaTrack : labels.training.reikiTrack}
      title={course.name}
      price={course.price}
      cta={{ label: labels.detail.courseCta, href: course.ctaLink ?? siteLinks.line }}
      content={offeringContent[id]}
      fallbackDescription={courseBlurbs[id]}
      path={
        theta
          ? {
              label: labels.training.thetaTrack,
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
