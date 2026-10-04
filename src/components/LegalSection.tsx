import { legalDocuments } from '../data';

// PRD-003 §4.14（2026-10-04）：改用文案集 v2 的《免責聲明》《隱私權政策》《服務條款》
// 全文（src/data.ts 的 legalDocuments），取代原本自行撰寫的三段條款。
// 各文件的 id（disclaimer／privacy／terms）是頁尾法律連結的錨點。
export default function LegalSection() {
  return (
    <section id="legal-section" className="py-20 bg-[#FBF1DD]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        <div className="text-center mb-12 space-y-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#3A2A18] font-serif">免責聲明、隱私權政策與服務條款</h1>
          <p className="text-base text-[#6A5642]">
            請在預約、購買或報名豐盛之翼學苑的服務與課程前，詳閱以下內容。
          </p>
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 pt-2 text-base font-semibold text-[#8A5415]">
            {legalDocuments.map((doc) => (
              <li key={doc.id}>
                <a href={`#${doc.id}`} className="underline underline-offset-4 decoration-[#F0DFA0] hover:text-[#3A2409]">
                  {doc.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-8">
          {legalDocuments.map((doc) => (
            <article
              key={doc.id}
              id={doc.id}
              className="scroll-mt-24 bg-[#FFFDF0] rounded-3xl border border-[#F0DFA0] p-6 sm:p-10 space-y-6 text-base text-[#5A4A38] leading-relaxed"
            >
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#3A2A18]">{doc.title}</h2>
              <p>{doc.intro}</p>

              {doc.sections.map((section) => (
                <div key={section.heading} className="space-y-3">
                  <h3 className="text-base font-bold text-[#3A2A18] border-b border-[#F0DFA0]/70 pb-2">
                    {section.heading}
                  </h3>
                  {section.blocks.map((block, idx) =>
                    Array.isArray(block) ? (
                      <ul key={idx} className="list-disc pl-5 space-y-2">
                        {block.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p key={idx}>{block}</p>
                    )
                  )}
                </div>
              ))}
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
