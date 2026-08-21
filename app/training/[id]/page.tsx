import { notFound } from 'next/navigation';
import { thetaTrainingCourses, reikiCourses, certificationCourses } from '../../../src/data';
import TrainingDetailClientPage from './TrainingDetailClientPage';

const allTrainingItems = [...thetaTrainingCourses, ...reikiCourses, ...certificationCourses];

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
    return { title: '找不到此課程 — 幸運教主 文齡 Keila' };
  }
  return {
    title: `${course.name} — 幸運教主 文齡 Keila`,
    description: course.objective,
  };
}

export default async function Page({ params }: TrainingDetailPageProps) {
  const { id } = await params;
  const course = allTrainingItems.find((c) => c.id === id);

  if (!course) {
    notFound();
  }

  return <TrainingDetailClientPage course={course} />;
}
