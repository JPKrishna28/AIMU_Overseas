import { client } from "@/sanity/client";
import { PageHeader } from "@/components/PageHeader";
import { StudentChatBoard, type StudentQuestion } from "@/components/StudentChatBoard";

export const metadata = { title: "Student Chat — AIMU Global" };
export const dynamic = "force-dynamic";

// Threads disappear from the board 30 days after they were asked.
const QUESTIONS_QUERY = `*[
  _type == "studentQuestion" &&
  dateTime(createdAt) > dateTime(now()) - 60*60*24*30
] | order(createdAt desc) {
  _id,
  name,
  question,
  createdAt,
  answers[]{ _key, name, text, isAdmin, createdAt }
}`;

export default async function StudentChatPage() {
  const questions = await client.fetch<StudentQuestion[]>(QUESTIONS_QUERY);

  return (
    <>
      <PageHeader
        title="Student Chat"
        subtitle="Ask anything about CAS, visas, part-time work, or life abroad. Fellow students and the AIMU team answer. Threads disappear after 30 days."
      />
      <div className="mx-auto max-w-4xl px-6 py-16">
        <StudentChatBoard initialQuestions={questions} />
      </div>
    </>
  );
}
