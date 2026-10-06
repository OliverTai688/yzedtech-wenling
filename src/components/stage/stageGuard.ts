// 舞台的退路（RES-005 §2 規則 11）。
// 舞台版面在首次繪製前就要套用（<html> 的 js 類別由 app/layout.tsx 的行內指令加上），才不會有版面位移；
// 但程式若遲遲沒有接上（檔案載入失敗、網路太慢），訪客會卡在每一幕的第一拍。
// 所以首頁另有一段行內指令：指令檔載入失敗，或頁面載完後過了 STAGE_WAIT 毫秒舞台仍未啟用（.st-root 沒有 data-live），
// 就在 <html> 加上 st-off。舞台版面的 CSS 都以 html.js:not(.st-off) 為條件，加上之後就是一般的直向頁面。
// 之後程式才到位的話：訪客還在頁首就接回舞台，已經往下讀了就維持一般頁面（見 useStage.ts）。
export const STAGE_OFF = 'st-off';
// 等多久才退回：以「頁面資源全部載完（load）」為起點再等 STAGE_WAIT；慢速網路下程式本來就晚到，
// 固定從第一個畫面起算 5 秒會誤判（實測慢速 4G 加 4 倍 CPU 降速時，舞台在 5 秒後才接上，畫面因此來回切換，
// 最大內容繪製也被拖到 6 秒以後）。另設 STAGE_CAP 當作無論如何的上限。
export const STAGE_WAIT = 3500;
export const STAGE_CAP = 20000;

export const STAGE_GUARD = `(function(){var h=document.documentElement,a=0;function off(){if(!document.querySelector('.st-root[data-live]'))h.classList.add('${STAGE_OFF}')}function arm(){if(a)return;a=1;setTimeout(off,${STAGE_WAIT})}if(document.readyState==='complete')arm();else addEventListener('load',arm);setTimeout(off,${STAGE_CAP});addEventListener('error',function(e){var t=e.target;if(t&&t.tagName==='SCRIPT')off()},true)})()`;
