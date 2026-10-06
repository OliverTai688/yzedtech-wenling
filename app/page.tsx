import HomeStage from '../src/components/stage/HomeStage';
import StageFounder from '../src/components/stage/StageFounder';
import StageMedia from '../src/components/stage/StageMedia';
import StageSocial from '../src/components/stage/StageSocial';
import StageFaq from '../src/components/stage/StageFaq';
import StageStickyCta from '../src/components/stage/StageStickyCta';
import { STAGE_GUARD } from '../src/components/stage/stageGuard';
import CtaBand from '../src/components/CtaBand';
import { homeContent, pageMeta } from '../src/data';

// <title> 與 description 是文案集原文，集中在 src/data.ts 的 pageMeta。
export const metadata = pageMeta.home;

// 首頁（PRD-004；分鏡見 RES-005 §3）。七張 slide，文案與錨點都沿用既有內容，元件都在 src/components/stage/：
// 01 Hero → 02 書（需求入口）→ 03 三階段＋精選服務：釘住的三幕，由 HomeStage 自己輸出。
// 04 創辦人 → 05 媒體 → 06 社群 → 07 常見問題：一般捲動的段落（呼吸），以 children 傳進同一個舞台根元素，
// 金翼羅盤才能從 03 一路飛到創辦人身後。
// 五章的編號與錨點在 homeContent.chapters；data-chapter 供手機底部固定列判斷目前章節。
const [, , , c4, c5] = homeContent.chapters.items;

export default function Page() {
  return (
    <>
      {/* 程式遲遲沒有接上舞台時，退回一般的直向頁面（見 stageGuard.ts） */}
      <script dangerouslySetInnerHTML={{ __html: STAGE_GUARD }} />

      <HomeStage>
        {/* slide 04 創辦人、05 媒體 */}
        <div data-chapter={c4.id}>
          <StageFounder id={c4.id} />
          <StageMedia />
        </div>

        {/* slide 06 社群、07 常見問題 */}
        <div data-chapter={c5.id}>
          <StageSocial id={c5.id} />
          <StageFaq />
        </div>
      </HomeStage>

      <CtaBand onHome />
      <StageStickyCta lastChapterId={c5.id} />
    </>
  );
}
