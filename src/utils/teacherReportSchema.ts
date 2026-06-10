import type { PublicTeacherReportData } from '@/types/schema';
import type { TeacherReportResponse, TeacherReportTemplate, TeacherReportSchema } from '@/types/teacherReport';
import { DEFAULT_TEACHER_REPORT } from '@/constants/defaultTeacherReport';

type SourceWithQuestions =
  | TeacherReportTemplate
  | TeacherReportResponse
  | PublicTeacherReportData
  | any;

export const DEFAULT_TEACHER_REPORT_TEMPLATE: Omit<TeacherReportTemplate, 'id' | 'createdAt'> = DEFAULT_TEACHER_REPORT;


export const getTeacherReportSchema = (source: SourceWithQuestions): TeacherReportSchema => {
  if (source?.schema?.sections?.length) return source.schema;
  return DEFAULT_TEACHER_REPORT_TEMPLATE.schema;
};

export const countTeacherReportFields = (source: SourceWithQuestions) => {
  const schema = getTeacherReportSchema(source);
  const sectionCount = schema.sections.length;
  const fieldCount = schema.sections.reduce((acc, section) => acc + section.fields.length, 0);
  return { sectionCount, fieldCount };
};
