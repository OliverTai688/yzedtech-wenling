import { Service, ReikiCourse, ThetaTrainingCourse, BlogPost, ResourceItem, NavGroup, NeedEntry, MediaPublication, MediaShow, LegalDocument } from './types';

// 站台連結與聯絡資訊（PRD-003 §4.2）。元件一律引用這裡，不要各自寫死網址。
// 官方 LINE 依 2026-10-04 決策 D4 統一為 lin.ee/N7QHCND；其餘取自文案集 v2
// 「網站下方區塊調整」（第 269～308 行）與 Home Block 1（第 115 行）。
export const siteLinks = {
  line: 'https://lin.ee/N7QHCND',
  lineId: '@healer.wenling',
  // lin.ee/N7QHCND 實際轉址到的帳號 ID（2026-10-05 查證），LINE 帶話連結用這個 ID，
  // 確保與上面的官方連結是同一個帳號。
  lineBasicId: '@023uzvav',
  // 手機上在服務／課程詳細頁點 LINE 時，是否預先帶入該頁名稱（PRD-004 §4.3）。
  // 尚未在實機驗證；有問題時改成 false 即可全站關閉。
  linePrefill: true,
  shop: 'https://booking.wenling.tw/',
  // Hero 次 CTA 與各服務頁文案使用的社群短網址（進入密碼 168168）
  community: 'https://reurl.cc/8DDd1M',
  // 頁尾文案使用的 LINE 社群直連網址
  lineCommunity: 'https://line.me/ti/g2/p-tQhPwbIsuY_UJY_LvIQjvrVdLMcN4B7nCiHA',
  email: 'lavie@wenling.tw',
  facebook: 'https://m.me/keila.healing',
  instagram: 'https://www.instagram.com/keila.healing1491',
};

// 全站共用的按鈕文字。逐字取自 docs/網站文案集.md（客戶 docx 的轉檔），不自行撰寫：
// - line：第 697 行「私訊官方 LINE：」；lineShort：第 371 行「一對一私訊諮詢」（空間較小的固定列用）。
// - needs：第 114 行 Hero 主按鈕，目的地同樣是首頁的需求入口（#personas-section）。
// - shop：第 49 行「Shop CTA（前往購買）」；shopShort：第 72 行「外部商城連結」。
// - offeringInfo：第 337 行「（點擊各項目可了解詳細服務說明）」。
// - enroll：Home Block 4 各課程的 CTA 按鈕（第 194～206 行）。
export const uiLabels = {
  line: '私訊官方 LINE',
  lineShort: '私訊諮詢',
  needs: '從這裡，開始我的改變',
  shop: '前往購買',
  shopShort: '商城',
  offeringInfo: '了解詳細服務說明',
  enroll: '報名',
};

// 全站主導覽。Header 的桌機導覽與手機抽屜共用這份資料。
// 分組與文字逐字取自文案集「網站下方區塊調整」（第 274～293 行）的三個分組，
// 與頁尾的 footerNavigation 一致（2026-10-05：原「關於我們／客戶見證／更多」等自訂名稱
// 不在 docx 內，已改掉；路由不變）。
// - 「首頁」由 Logo 承擔；「新手入門」「合作夥伴」待頁面文案到位後再加入（PLN-004 §2）。
// - 聯絡頁的名稱取自第 301 行「官方聯繫與諮詢管道」（docx 沒有「聯絡我們」這個頁名）。
// - 私訊與商城是外部連結按鈕，由 Header／MobileNav 引用 siteLinks 與 uiLabels。
export const primaryNavigation: NavGroup[] = [
  {
    id: 'about',
    label: '關於豐盛之翼學苑',
    items: [
      { id: 'about', label: '品牌理念', href: '/about' },
      { id: 'story', label: '創辦人經歷與故事', href: '/story' },
      { id: 'contact', label: '官方聯繫與諮詢管道', href: '/contact' },
    ],
  },
  {
    id: 'services',
    label: '療癒與培訓',
    items: [
      { id: 'services', label: '服務項目', href: '/services' },
      { id: 'training', label: '培訓課程', href: '/training' },
    ],
  },
  {
    id: 'community',
    label: '見證與實用內容',
    items: [
      { id: 'testimonials', label: '真實見證', href: '/testimonials' },
      { id: 'blog', label: '好運blog', href: '/blog' },
      { id: 'resources', label: '免費資源', href: '/resources' },
      { id: 'media', label: '媒體專訪', href: '/media' },
    ],
  },
];

// 8 項能量療癒服務。畫面上的文字一律逐字取自 docs/網站文案集.md（客戶 docx 的轉檔）：
// - name：各服務段落的標題（第 469、557、639、716、800、845、939、994 行）。
// - ctaText：Home Block 3 各服務的 CTA 按鈕文字（第 166～187 行）。
// - 一句話介紹在 serviceBlurbs（Home Block 3）；完整內容在 src/content/offerings.ts。
// 舊版文案集（v1）的摘要、對象、時長與費用欄位已於 2026-10-05 移除：v2 docx 沒有對應的
// 單句原文，詳細頁改由下方「方案與費用」等段落（docx 原文）呈現。
// 主題工作坊的按鈕文案集填的是舊 LINE 網址，連結一律用 siteLinks.line。
export const services: Service[] = [
  {
    id: 'personal-1on1',
    name: '心靈引渡人｜一對一個人能量療癒',
    ctaText: '立即預約', // 第 166 行
    ctaLink: 'https://booking.wenling.tw/activities/soul-healing',
    iconName: 'Sparkles',
    category: 'energy-healing',
    testimonialIds: []
  },
  {
    id: 'spiritual-reading',
    name: '靈性解讀與能量療癒',
    ctaText: '立即預約', // 第 169 行
    ctaLink: 'https://booking.wenling.tw/activities/life-direction',
    iconName: 'Compass',
    category: 'energy-healing',
    testimonialIds: []
  },
  {
    id: 'spiritual-massage',
    name: '靈性按摩｜全域氣場修護與脈輪清理',
    ctaText: '立即預約', // 第 172 行
    ctaLink: 'https://booking.wenling.tw/activities/chakra-cleaning',
    iconName: 'Heart',
    category: 'energy-healing',
    testimonialIds: []
  },
  {
    id: 'group-healing',
    name: '人生推進器｜團體遠距療癒',
    ctaText: '立即加入', // 第 175 行
    ctaLink: 'https://booking.wenling.tw/activities/life-forward',
    iconName: 'Users',
    category: 'energy-healing',
    testimonialIds: []
  },
  {
    id: 'workshop',
    name: '能量身心靈主題工作坊',
    ctaText: '加 LINE 報名', // 第 178 行
    ctaLink: siteLinks.line,
    iconName: 'Wind',
    category: 'energy-healing',
    testimonialIds: []
  },
  {
    id: 'smoke-prayer',
    name: '遠距煙供祈福儀式',
    ctaText: '立即預約', // 第 181 行
    ctaLink: 'https://booking.wenling.tw/activities/pray-all',
    iconName: 'Flame',
    category: 'energy-healing',
    testimonialIds: []
  },
  {
    id: 'abundance-reiki',
    name: '豐盛靈氣｜全方位能量調頻與願望顯化',
    ctaText: '立即預約', // 第 184 行
    ctaLink: 'https://booking.wenling.tw/activities/reiki-healing',
    iconName: 'Coins',
    category: 'energy-healing',
    testimonialIds: []
  },
  {
    id: 'five-elements-perfume',
    name: '五行香水供奉｜佛前加持版',
    ctaText: '立即預約', // 第 187 行
    ctaLink: 'https://booking.wenling.tw/activities/energy-filling',
    iconName: 'Flower2',
    category: 'energy-healing',
    testimonialIds: []
  }
];
// 《七週遇見對的人》課程與「國際希塔與靈氣雙證照培訓」service 項目
// 已依 PRD-001 決策 #5、#6（2026-08-18 使用者確認）移除：文案集查無這兩者的完整課綱來源，不得沿用專案原創內容。
// 《七週遇見對的人》書籍本身的行銷提及（推薦序作者身份）不受影響，
// 保留在 About／Media／TrustSystem 等處。臼井靈氣技術僅保留於 About
// 方法體系表格中作為技術介紹。

// 希塔療癒三門課。畫面上的文字逐字取自 docs/網站文案集.md：
// - level：Home Block 4 的課程短名（第 193、195、197 行），用在詳細頁的三階路徑。
// - name：各課程段落的標題。
// - facts／price：各課程「課程資訊與報名方式」的條列原文（行號見各筆註解），只去掉表情符號。
// 舊版文案集（v1）的目標、對象、時數、證照與重點欄位已於 2026-10-05 移除。
export const thetaTrainingCourses: ThetaTrainingCourse[] = [
  {
    id: 'theta-basic',
    level: '基礎 DNA 課程',
    name: '希塔療癒 基礎 DNA 課程 (ThetaHealing®)',
    // 第 1119、1122 行
    facts: ['上課形式： 實體 (台北松江南京捷運站附近) ＆ 線上 (Zoom) 同步開課'],
    price: '課程費用： NT$ 20,000（含原廠教材、官方國際認證證書、中文書、精選乳香精油）',
    ctaLink: 'https://booking.wenling.tw/activities/basicDNA',
    category: 'theta-training',
    testimonialIds: []
  },
  {
    id: 'theta-advanced-dna',
    level: '進階 DNA 課程',
    name: '希塔療癒 進階 DNA 課程 (Advanced DNA)',
    // 第 1169、1172 行
    facts: ['上課形式： 實體 (台北松江南京捷運站附近) ＆ 線上 (Zoom) 同步開課'],
    price: '課程費用： 單堂 NT$ 20,000',
    ctaLink: 'https://booking.wenling.tw/activities/advanced_DNA',
    category: 'theta-training',
    testimonialIds: []
  },
  {
    id: 'theta-dig-deeper',
    level: '深度信念挖掘班',
    name: '希塔療癒 深度信念挖掘班 (Digging Deeper)',
    // 第 1224、1225、1227、1230 行
    facts: [
      '先修要求： 需完成「希塔療癒基礎班」與「希塔療癒進階班」',
      '上課形式： 實體 (台北松江南京捷運站附近) ＆ 線上 (Zoom) 同步開課',
      '課程時間： 依進度共四到五日，10:00 - 16:00 (含午休 1 小時)',
    ],
    price: '課程費用： 單堂 NT$ 20,000 (支持刷卡、分期，輕鬆投資你的大腦與能量！)',
    ctaLink: 'https://booking.wenling.tw/activities/digdeeper',
    category: 'theta-training',
    testimonialIds: []
  }
];

// 臼井靈氣獨立初/中/高階課程頁資料已依 PRD-001 決策 #6
// （2026-08-18 使用者確認）移除：不建立可購買/報名的獨立靈氣課程頁，臼井靈氣僅
// 保留在 About「方法體系」14 項技術表格中作為技術介紹。

// PRD-003 §4.5（PLN-004 Batch A5，2026-10-04）：原 `reikiCourses` 與上方
// `thetaTrainingCourses` 是同一批希塔課程的兩份資料，已併入後者；舊詳細頁
// `/training/theta-*-cert` 由 next.config.js 轉址到對應的 `/training/theta-*`。

// 靈氣認證三門課。name、facts、price 逐字取自 docs/網站文案集.md 各課程段落（行號見各筆註解）；
// 表格列以「項目　內容」呈現。舊版文案集（v1）的目標、對象、課綱、標籤與退費欄位已於
// 2026-10-05 移除，完整內容在 src/content/offerings.ts。
export const certificationCourses: ReikiCourse[] = [
  {
    id: 'money-reiki-cert',
    level: 'beginner',
    type: 'both',
    name: '金錢靈氣療癒師與導師授證課程',
    // 第 1323、1325 行；費用為第 1308 行表格列
    facts: [
      '上課地點： 實體 (台北松江南京站工作室) ＋ 線上同步',
      '場次安排中，歡迎私訊約課！ (1 人即可彈性排課，三階可拆 2-4 次完成)',
    ],
    price: '三階合報 (療癒師+大師+宗師)　NT$ 14,899 (一世發久久！) (原價 $18,000 / 完訓可授課)',
    ctaLink: 'https://booking.wenling.tw/activities/money-reikei',
    category: 'healer-certification',
    testimonialIds: []
  },
  {
    id: 'love-reiki-cert',
    level: 'intermediate',
    type: 'both',
    name: '愛情靈氣證照課程 (鬱金香熱情靈氣導師班)',
    // 第 1405、1407、1411 行
    facts: ['上課形式： 實體 (台北松江南京站工作室) ＋ 線上同步開課', '課程時數： 8 小時'],
    price: '初訓費用：NT$ 12,520 (含官方證書、課本、教材電子檔)',
    ctaLink: 'https://booking.wenling.tw/activities/love-reiki',
    category: 'healer-certification',
    testimonialIds: []
  },
  {
    id: 'mermaid-reiki-cert',
    level: 'intermediate',
    type: 'both',
    name: '人魚靈氣證照課程 (Mermaid Reiki)',
    // 第 1469、1470、1472 行（表格列）
    facts: ['課程時間　6-8小時，可拆兩次', '授課方式　線上同步直播 ＋ 實體課（同步進行）'],
    price: '課程費用　NT$ 12,520 (支援刷卡/分期付款)',
    ctaLink: 'https://booking.wenling.tw/activities/mermaid-reiki',
    category: 'healer-certification',
    testimonialIds: []
  }
];

// 直覺力培訓：Home Block 5（第 208～212 行，文案集標註「⚠️ 待客戶補充」），不獨立成頁
// （PRD-002 §3.3 v1.1）。標題、內文與按鈕逐字取自第 210～212 行；按鈕連結用 siteLinks.line。
export const healerCertificationAddOn = {
  name: '直覺力培訓｜喚醒你與生俱來的靈通天賦',
  objective: '透過系統化的直覺力訓練，你將學會清晰接收、辨識並運用自己的靈通感知，讓直覺成為你人生中最可靠的指引。',
  status: 'coming-soon' as const,
  ctaLink: siteLinks.line
};

// PLN-004 階段 D（2026-10-05）移除：resolveOfferingHref（已無呼叫點）與 4 筆查無出處的
// 具名見證。見證改用文案集的匿名引言（testimonialQuotes），並以授權開關控制顯示。

// 部落格文章是否顯示。以下 6 篇文章不在客戶的文案集（docx）裡，依「全站文字只能出自 docx」
// 的規定先不顯示（2026-10-05）。資料保留；客戶提供或確認文章後再改成 true。
// 注意：pagesContent.blog 的 allLabel／readLabel／closeLabel 也不是 docx 文字，開啟前要一併補上。
export const SHOW_BLOG_POSTS = false;

export const blogPosts: BlogPost[] = [
  {
    id: 'post-1',
    title: '從《七週遇見對的人》談起：愛情不是苦苦等待，而是自我價值的同頻對齊',
    date: '2026-06-20',
    category: '愛情',
    tags: ['靈魂伴侶', '吸引力法則', '親密關係', '自愛力'],
    summary: '許多人在感情裡反覆受傷，以為自己不夠好，或者運氣差。事實上，你的伴侶往往是你潛意識信念的精準投影。本文從暢銷書《七週遇見對的人》的核心概念出發，剖析如何透過自我價值對齊，重新啟動幸福磁場。',
    content: `在諮詢室裡，我常聽到許多優秀的女孩嘆氣說：「文齡老師，我對感情的要求真的不高，為什麼總是遇到不願意承諾、忽冷忽熱的人？」

這並不是因為你不夠美麗、不夠體貼，更不是命運對你的懲罰。在能量學的視角裡：

**「我們吸引的，往往不是我們大腦『想要』的人，而是我們潛意識『相信自己配得』的人。」**

當你的潛意識底層寫著：「我必須很努力討好，別人才不會丟下我」，你就會下意識被那些需要你過度付出、甚至習慣冷暴力的人所吸引。因為這套熟悉的受傷模式，讓你感到安全。

這正是我很榮幸受邀為暢銷書《七週遇見對的人》改版撰寫推薦序的原因——書中談的正是這套「潛意識投影」的核心概念。如果你也想從能量與潛意識的角度，具體梳理自己的感情卡點，我通常會建議從以下路徑開始：

* **第一步：看見與釋放**：透過「靈性解讀與能量療癒」的靈魂伴侶解讀，看清目前吸引到的能量狀態與關係模式。
* **第二步：自我配得感重塑**：搭配「心靈引渡人｜一對一個人能量療癒」，探掘並解開童年或過往關係中「我不值得被好好珍惜」的深層信念。
* **第三步：對齊靈魂目標**：當你內在充滿了溫暖、自愛與自信的光，你的頻率自然會與那些健康、穩定、成熟的同頻靈魂產生和諧共振。

親愛的，真正的愛情不是苦苦乞求與等待，而是當你決定開始擁抱自己時，那個對的人，早已在與你對齊的路上前行。`,
    readTime: '5 分鐘',
    imageSeed: 'love_meditation'
  },
  {
    id: 'post-2',
    title: '金錢能量的流動：如何清理內在匱乏感，走向物質與心靈的雙重豐盛',
    date: '2026-06-12',
    category: '財運',
    tags: ['金錢靈氣', '豐盛信念', '潛意識清理', '創業者'],
    summary: '你對金錢的態度，決定了金錢是否願意留在你身邊。如果你一花錢就感到心痛、賺了錢卻無比焦慮，那你可能正處於「金錢匱乏能量」中。本文教你 3 個立刻能做的豐盛調頻練習。',
    content: `你是否也有過這樣的經驗：
* 每次看到存摺上的數字減少，即使只是幾百塊，也會感到一陣沒來由的緊縮與心痛？
* 遇到好用的工具或好吃的食物，明明預算足夠，卻總是下意識選擇最便宜、但品質差很多的替代品？
* 賺了錢卻一刻不敢放鬆，深信「如果我現在不拼命，以後一定會破產」？

如果你有以上任何一項，代表你與金錢的關係正處於**「匱乏與恐懼」**的共振中。
    
金錢在本質上，是一種無色無味的「流動能量」。它像水一樣，喜歡流向寬廣、平穩、充滿歡迎的地方。當你對金錢充滿恐懼與防備時，你的能量場就像一塊緊縮的乾癟海綿，水一進來就被你死死捏住，無法產生健康的循環。

### 如何重建與金錢的豐盛能量？

1. **改寫花錢時的能量設定（豐盛付款法）**：
   下次付帳單或買東西時，試著把心中的「天啊，又變窮了」改為：**「謝謝這筆錢，讓我得以享受如此舒適的電力/美味的食物，這筆錢出去了，會帶著十倍的祝福與豐盛流回來。」** 用感激代替焦慮，財富的流動就會變得和諧。

2. **清理潛意識中的「金錢毒素」**：
   我們從小常聽長輩說「有錢人都很自私」、「賺錢要用命去換」。這些限制性信念深深根植在潛意識中。透過金錢靈氣調頻，我們能溫和洗去這些不屬於你的恐懼。

3. **培養核心配得感**：
   相信自己即使什麼都不做，你的存在本身就值得擁有豐盛的生活。當你先成為一個「內在豐盛」的人，外在的物質與機會自然會被你的磁場吸引而來。`,
    readTime: '6 分鐘',
    imageSeed: 'gold_abundance'
  },
  {
    id: 'post-3',
    title: '日常能量護航：用豐盛靈氣為自己創造一個「幸運體質」磁場',
    date: '2026-05-28',
    category: '豐盛靈氣',
    tags: ['能量清理', '靈氣保養', '脈輪平衡', '生活儀式感'],
    summary: '為什麼有的人總是能在關鍵時刻遇到貴人、避開麻煩，彷彿被好運眷顧？這不是天生偏心，而是他們懂得如何維持自己的高頻能量場。本文分享日常三步驟，教你打造防護罩與幸運體質。',
    content: `你有沒有聽過別人說：「某某人氣場很乾淨、很有光澤」？
    
在能量世界的法則裡，這並不是一種誇張的形容。每一個人的身體周圍，都有一圈肉眼難見的「電磁場」，也就是能量氣場（Aura）。
    
當你的氣場乾淨、明亮時，你就像是一座行走的燈塔，好的人緣、機遇、甚至意外的財運（貴人）都會被你的光亮吸引而來。相反地，如果你的氣場累積了太多日常的抱怨、高壓、別人的負面情緒垃圾，你的能量場就會顯得灰暗晦澀，不僅容易感到疲憊，也容易下意識做出錯誤的決策。

### 簡單三步驟，為自己做一場日常能量大掃除：

* **第一步：呼吸排毒法**
  早晨醒來，閉上眼睛做三次深呼吸。吸氣時，想像大自然溫暖的金色光芒從頭頂灌入，充滿全身；呼氣時，張開嘴巴輕輕嘆氣，想像體內所有灰色、沉重的廢氣從腳底排除，回歸大地母親轉化。
  
* **第二步：海鹽泡腳與淨化**
  水是最好的能量載體。每天睡前用一盆溫熱的水，加入兩大匙無添加的天然海鹽，泡腳 15 分鐘。海鹽具有極佳的能量吸附與清理作用，能幫你帶走一整天在辦公室吸附的雜亂頻率。
  
* **第三步：設定你的金光保護罩**
  在出門擠捷運、或者準備開高難度的會議前，在心中默念或想像：**「有一道溫柔且強大的玫瑰金色光罩將我團團包圍。所有良善、有愛的能量都能自由進出，而所有不屬於我的負面情緒與焦慮，都將被光罩溫和地彈回，不影響我的內在平靜。」**

當你把「能量保養」視為跟刷牙洗臉一樣的日常習慣時，你會發現，生活中的摩擦減少了，好運和巧合，開始頻繁地出現在你的生命中。`,
    readTime: '4 分鐘',
    imageSeed: 'aura_protection'
  },
  {
    id: 'post-4',
    title: '給企業主與高階主管：如何在高壓决策與市場變動中，保持大腦能量的平穩？',
    date: '2026-05-15',
    category: '事業',
    tags: ['企業主諮詢', '決策敏銳度', '身心穩定', '事業運勢'],
    summary: '身為決策者，你的一個念頭，決定了團隊的方向與數百萬甚至數億業績的走向。當你處於焦慮、得失心極重的能量狀態時，直覺會被雜音覆蓋。本文探討如何為創業者提供穩定的心靈護航。',
    content: `「文齡老師，我現在每天一睜開眼，想的就是幾十個員工的薪水、租金，還有下個季度的業績目標。我已經很久沒有真正睡過一場好覺了。」
    
這是我在專屬企業主諮詢中，最常聽到的一段話。
    
在外人眼裡，創業者、高階主管與投資人是風光、果斷、充滿自信的。但只有身在其中的人知道，**「高處不勝寒」**的孤獨與決策高壓，會對一個人的能量系統造成多麼劇烈的損耗。
    
許多創業者在長期高壓下，脈輪中的「太陽神經叢（代表個人力量與意志）」與「三眼輪（代表直覺與遠見）」往往呈現過度活躍卻極度脆弱的失衡狀態。這會導致兩個嚴重的決策盲點：
    
1. **防衛性決策**：出於「害怕失去、害怕破產」的匱乏恐懼，而做出保守、甚至掐死團隊創新空間的決定。
2. **直覺鈍化**：腦袋塞滿了密密麻麻的分析數據與焦慮，失去了決策者最珍貴的「靈光一閃」與「市場嗅覺」。

身心靈療癒在企業營運中，扮演的不是「點石成金的法術」，而是**「大腦清道夫」**。
    
透過專業的能量調頻，我們能幫你將混亂的腦波調整回高效率、高定力的 Alpha 或 Theta 狀態。當大腦的背景雜音被清理乾淨，你自然能看清市場的真實脈絡，做出大氣、平穩、兼具遠見的優雅决策。
    
你平穩的能量場，就是團隊最棒的穩定劑，也是吸引大型合作案與豐盛合夥人最強大的磁石。`,
    readTime: '5 分鐘',
    imageSeed: 'executive_peace'
  },
  {
    id: 'post-5',
    title: '從全面崩塌到重生：我如何在人生最黑暗的一年，遇見希塔療癒與自己',
    date: '2026-04-30',
    category: '心路歷程',
    tags: ['創辦人故事', '人生轉折', '希塔療癒', '我的故事'],
    summary: '文齡老師親自撰寫的靈魂自白。分享 2019 年那段家庭、健康、感情與財務同時崩塌的黑暗歲月，如何在接觸希塔療癒後，看見潛意識裡的限制性信念，並在短短數月內迎來翻轉。',
    content: `2019 年的下半年，是我生命中最黑暗、也最無助的時刻。那段時間，所有的挑戰彷彿約好了一起降臨：家庭爆發爭吵與分裂、職場上背負沉重的誤會、外婆突然中風、感情深受創傷，我的身上甚至還背負了百萬的負債。

那時的我，幾乎每天醒來都只想問蒼天：「為什麼這些事都發生在我身上？」深陷在受害者情緒與無力感中的我，覺得人生已經全面崩塌，找不到任何出路。

直到我接觸了「希塔療癒（ThetaHealing®）」，這成為了我生命的終極救贖與轉捩點。

透過冥想進入 θ（Theta）腦波狀態，我終於鼓起勇氣，往自己的內心深處看去。我驚訝地發現，原來這一切外在的崩潰與停滯，都源自於我內在深層的限制性信念——在潛意識裡，我一直覺得自己「不值得被愛」、「不值得成功」。

當我開始運用希塔療癒改寫這些信念，並徹底釋放積壓已久的恐懼與罪惡感後，不可思議的奇蹟開始在我的生命中一一顯化，人生迎來了全面的翻轉：

**💰 財富的絕對大翻轉**：我離開了長達 9 年的工作，全職投入療癒領域，僅僅第三個月的收入，就超過了過去當上班族的時期！我從背負百萬負債，成功翻轉為年收百萬。

**💞 遇見 90% 契合的靈魂伴侶**：因為終於學會不再害怕看自己、學會面對潛意識，我在半年內就遇見了符合我九成條件的靈魂伴侶。

**🎤 影響力的擴展與肯定**：我受邀至《好女人的情場攻略》、《美麗佳人 Podcast》分享我的蛻變故事，更榮幸成為暢銷書《七週遇見對的人》改版推薦序的唯一作者。

這趟旅程帶給我的，遠不止於物質與感情的豐盛。原本自認是「麻瓜」的我，開始能清晰地感知能量、讀取訊息；面對偶爾不順心的事，我不再陷入情緒內耗，而是能迅速覺察背後的根本原因並快速化解。

現在，我每年累積破百次的個案療癒經驗，影響了至少 30 人踏上學習希塔療癒的道路。如果你也正經歷我曾經走過的黑夜，請相信：你本就具備翻轉生命的力量，而我，會在這裡陪你一起把它找回來。`,
    readTime: '7 分鐘',
    imageSeed: 'author_story'
  },
  {
    id: 'post-6',
    title: '個案陪伴故事：從冰凍三尺的家庭關係，看見潛意識和解的奇蹟起點',
    date: '2026-04-12',
    category: '個案成長',
    tags: ['親子關係', '家庭和諧', '希塔探掘', '個案紀錄'],
    summary: '一則關於母女心結的深度陪伴紀實。一對互不說話、一見面就冷嘲熱諷的母女，如何透過潛意識信念的看見，解開糾葛二十年的情感鎖鏈，重回彼此接納與擁抱的溫情。',
    content: `小晴（化名）來到我的工作室時，整個人散發著防衛而緊繃的氣流。
    
「我跟我媽已經兩年沒有好好說過一句話了。她每次打電話來，除了挑剔我的工作、就是催我結婚。上禮拜我們在電話裡大吵一架，她說我是個不孝女，我直接掛了她電話。現在只要看到她的來電，我渾身都在發抖。」
    
這是一個在台灣家庭中，極其常見的「相愛相殺」痛苦寫照。
    
在希塔信念探掘中，我帶著小晴閉上眼睛，回到她潛意識中最深的一幕：那是她六歲時，拿著考了 98 分的考卷回家，渴望得到媽媽的讚美，媽媽卻一臉嚴肅地說：「另外 2 分錯在哪裡？你怎麼這麼粗心？」
    
在那一刻，小晴的潛意識寫下了一條致命的程式：**「媽媽不愛真實的我，只有當我完美無缺、事業有成、聽從她的指令時，我才配得到她的愛。」**
    
而對媽媽而言，她在她自己的成長過程中，也是被用同樣嚴苛的標準對待。媽媽的挑剔，其實是她潛意識裡唯一學會的「愛與保護」的方式——她深怕孩子不夠優秀，會在社會上吃苦。
    
這兩個深愛著彼此、卻都帶著創傷的靈魂，用「防衛」與「挑剔」築起了一座高牆，互相折磨。
    
在療癒中，我們做了以下工作：
1. **釋放罪惡感**：小晴釋放了「沒能滿足媽媽期望，我就是個壞女兒」的沉重枷鎖。
2. **能量同理與和解**：引導小晴在希塔維度中，看見那個同樣在嚴厲家庭中長大、受盡委屈卻只能咬牙撐住的「小女孩媽媽」。
3. **收回靈魂碎片**：修補母女間多年來的關係裂痕。
    
療癒結束兩週後，小晴傳來訊息：
    
*「老師，上週末我媽又打來。原本她又想挑剔我的生活，但這次我沒有生氣，我只是溫柔地跟她說：『媽，我知道你是在擔心我。但我現在過得很好，你也辛苦了一輩子，多為自己想想好嗎？』電話那頭突然一陣沉默，然後，我聽到了我媽二十年來，第一次在我面前流下眼淚……我們那天聊了很久，沒有任何爭吵。謝謝老師，讓我把媽媽找回來了。」*
    
這就是能量療癒的力量。我們不試圖強行改變他人，但當你的內在重回穩定與愛，你周遭的整個世界，也將隨之和諧轉化。`,
    readTime: '6 分鐘',
    imageSeed: 'family_harmony'
  }
];

// PLN-004 階段 D（2026-10-05）移除：原 9 題 FAQ 查無文案集出處。首頁用文案集 Block 8
// 的題目（homeContent.faq），各服務與課程頁用文案集該頁的常見問題。

// 免費資源。文案集沒有 Resources 專頁的文案（第 1585 行只有頁名），內容全部取自 docx 其他段落
// 談免費社群與直播的原文（只去掉表情符號），不自行撰寫：
// - intro／community／sessions：About「不確定自己需要哪一種？」（第 362～372 行）。
// - live：希塔療癒免費體驗課程資訊（第 1249 行）；按鈕「點我加入社群」第 1345 行。
// - community.cta：Hero 次按鈕（第 115 行）；community.note：頁尾（第 306 行）。
// /resources 與首頁的 ResourcesBand 共用。
export const resources: {
  intro: string;
  steps: ResourceItem[];
} = {
  intro: '這裡每天都有滿滿的正能量，歡迎你帶著願望進來，也帶著好消息出去！社群內每週都會舉辦免費的公益直播，參與直播還有機會得到專屬小禮物 。',
  steps: [
    {
      id: 'res-community',
      title: '加入免費社群【豐盛之翼學苑】',
      highlight: '加入密碼：168168',
      description: '輸入168168加入line社群（免費體驗能量療癒、參加線上公益讀書會）',
      ctaText: '加入免費體驗社群：密碼168168',
      ctaLink: siteLinks.community,
    },
    {
      id: 'res-live',
      title: '參加【免費公益體驗直播】',
      description: '加入我的社群，每週一 21:30-22:30 定期舉辦免費直播，帶你實際了解能量應用！',
      list: [
        '能量療癒公益體驗：每週一 21:30',
        '財富＆身心靈成長書單分享與讀書會：每週二 20:30',
        '好運體質養成班 熱烈進行中！',
      ],
      ctaText: '點我加入社群',
      ctaLink: siteLinks.community,
    },
    {
      id: 'res-line',
      title: '一對一私訊諮詢',
      description: '如果你有特定情況想討論，也可以私訊 LINE 官方帳號 [@healer.wenling]，簡單闡述你目前的狀況，我將為你提供適合的療癒建議。',
      ctaText: uiLabels.line,
      ctaLink: siteLinks.line,
    },
  ],
};

// 依文案集「▍ 方法體系：專業療癒與顯化技術總覽 (Methodology)」表格（第 346～367 行）逐項轉錄，
// 共 14 項技術，每項對應「一句話定義」「能解決什麼問題」「適合什麼樣的人」三欄原文。
export const methodologySystems = [
  { id: 1, name: '希塔療癒 (ThetaHealing)', definition: '透過宇宙源頭神聖創造能量，快速轉換潛意識信念的強大工具。', solves: '深層恐懼、原生家庭創傷、限制性信念、不斷重複的負面迴圈。', suitedFor: '想從根源改變人生模式、渴望身心靈獲得突破性成長的人。' },
  { id: 2, name: '臼井靈氣 (Usui Reiki)', definition: '歷史悠久且應用廣泛的宇宙生命能量療法，帶來全方位的深層放鬆與身心平衡。', solves: '身體緊繃疲憊、睡眠品質不佳、情緒焦躁不安、脈輪能量失衡。', suitedFor: '尋求深層放鬆與釋放壓力、想建立穩健身心基礎、需要日常能量保養的人。' },
  { id: 3, name: '百花靈氣 (Flowers Reiki)', definition: '連結大自然百花的高速頻精華，深層修復氣場與情緒，並有效提升人氣與溝通力的能量法門。', solves: '氣場受損破洞、情緒焦躁緊繃、家庭關係不睦、人際與身體能量淤堵。', suitedFor: '需要溫和修復身心情緒、渴望增進家庭和諧、想全面提升個人魅力與溝通順暢度的人。' },
  { id: 4, name: '獨角獸靈氣 (Unicorn Reiki)', definition: '連結純淨的高頻獨角獸能量，深度淨化身心並協助願望加速實現的法門。', solves: '能量混濁沉重、直覺力下降、願望遲遲無法顯化、缺乏靈性指引。', suitedFor: '渴望提高自我覺察力、需要徹底淨化能量、期盼願望順利實現的人。' },
  { id: 5, name: '彩虹靈氣 (Rainbow Reiki)', definition: '運用七彩光譜修補靈魂能量，幫助你敞開接收好運並大幅提升顯化速度的靈氣。', solves: '靈魂深層耗損、好運總是擦身而過、顯化過程受阻或極度緩慢。', suitedFor: '覺得運氣卡關、想要順利承接宇宙好運、渴望加速顯化目標與豐盛的人。' },
  { id: 6, name: '煦陽靈氣 (Solar Reiki)', definition: '引入溫暖強大的光輝能量，專注於疏通身體經絡與能量阻塞的修復法。', solves: '身體莫名僵硬卡卡、經絡能量不通、體質虛寒或缺乏活力。', suitedFor: '身體總覺得卡卡不順、需要疏通體內淤堵能量、渴望找回溫暖活力的人。' },
  { id: 7, name: '金錢靈氣 (Money Reiki)', definition: '專注於淨化金錢業力、提升金錢能量頻率的專屬靈氣。', solves: '金錢焦慮、莫名破財、財務卡關、對金錢有罪惡感。', suitedFor: '想改善財務狀況、清理金錢阻礙、吸引財富順流的人。' },
  { id: 8, name: '豐盛靈氣 (Abundance Reiki)', definition: '整合至少 8 種靈氣，全方位提升生命中「豐盛」頻率與好運的能量技術。', solves: '內在匱乏感、事業停滯、總覺得自己「不配得」。', suitedFor: '渴望在事業、人際、生活中迎來全面豐盛與好運的人。' },
  { id: 9, name: '鬱金香熱情靈氣 (Tulip Passion Reiki)', definition: '療癒心輪創傷、提升自身愛的高頻能量，吸引正緣。', solves: '感情受挫、缺乏自信、遇人不淑（爛桃花）、關係緊繃。', suitedFor: '尋求靈魂伴侶、想修復現有關係、或單純想好好愛自己的人。' },
  { id: 10, name: '人生推進器 (Life Accelerator)', definition: '結合「擴大療癒」與「金銀紫火焰」，強效清理舊業力與斷捨離，為生命騰出空間迎接新契機的神聖能量。', solves: '覺得人生卡關、重複相同情緒與痛點、對過去無法釋懷、面臨關係或工作的抉擇期。', suitedFor: '渴望勇敢斷捨離舊模式、突破現狀活出熱情、準備好讓生命大步前進的人。' },
  { id: 11, name: '煙供 (Smoke Offering)', definition: '透過焚香上供下施，轉化無明業力與累積福報的古老法門。', solves: '運勢低迷、無形靈界干擾、莫名障礙與不順遂。', suitedFor: '覺得近期運勢卡關、希望祈福除障、為自己與家人累積福報的人。' },
  { id: 12, name: '香水供 (Perfume Offering)', definition: '依據個人八字與願望，以五行精油擴香供養，精準補運的開運法門。', solves: '流年運勢不足、五行能量失衡、特定願望（如桃花/事業）缺乏推動力。', suitedFor: '想針對自身八字量身打造開運配方、提升特定願望實現率的人。' },
  { id: 13, name: '人魚靈氣 (Mermaid Reiki)', definition: '源自天狼星系統，喚醒深海魅力、重塑自愛與豐盛能量的覺醒之旅。', solves: '自信低落缺乏吸引力、情緒壓抑創傷、生殖系統機能需要溫和療癒。', suitedFor: '想大幅提升個人魅力與費洛蒙、吸引理想伴侶、釋放受害者心態的人。' },
  { id: 14, name: '脈輪與氣場能量療癒', definition: '不需觸碰身體，運用生命氣場進行淨化、充能與修護的科學療癒法。', solves: '身體能量淤堵、莫名疲憊沉重、特定脈輪能量失衡。', suitedFor: '需要快速恢復能量、重視氣場清潔與講求實用感受的人。' }
];

// PLN-004 階段 D（2026-10-05）移除：合作夥伴的佔位資料。客戶提供療癒師資料後再建立
// （RPT-001 G7／T7）。

// ─────────────────────────────────────────────────────────────────────────
// PRD-003／PLN-004 階段 A（2026-10-04）：以下內容依文案集 v2 轉錄。
// 行號指 docs/網站文案集.md（v2）；更早註解裡的行號是 v1（docs/網站文案集.v1.md）。
// ─────────────────────────────────────────────────────────────────────────

// Home Block 1｜Hero（文案集 v2 第 110～119 行）
export const heroContent = {
  eyebrow: '成為你豐盛之路上的翅膀',
  headlineLines: ['為你的人生開外掛！', '許願成真，就是這麼幸福。'],
  description:
    '豐盛之翼學苑旨在成為大家豐盛之路上的翅膀。無論你正期盼感情的順遂、財富的自由，或是生活的全面好運，我們將透過最白話、最落地的靈性工具，陪你解開內在卡點。讓你從此不再迷惘，活出充滿熱情與使命的幸運人生！',
  primaryCta: { label: '從這裡，開始我的改變', href: '#personas-section' },
  secondaryCta: { label: '加入免費體驗社群：密碼168168', href: siteLinks.community },
  trustBadges: [
    '《七週遇見對的人》暢銷書推薦序作者',
    '500+個案經驗',
    '整合14種以上顯化技術，助你掌握受用一輩子的工具',
  ],
  portraitCaption: '豐盛之翼學苑創辦人 幸運教主文齡 Keila',
};

// Home Block 2｜Persona 快速入口（文案集 v2 第 121～158 行）。
// 文案集的 CTA 都沒有填連結，href 依 CTA 文字對應站內詳細頁（AUD-002 §5.1）；
// 「看練愛大確幸介紹」站內無對應頁，依 PRD-003 §4.9 規則 1 導向商城商品頁。
// 案例中的金額與成果數字依決策 D5 先照文案集上線，待行政確認。
export const needEntriesIntro = {
  heading: '為不同階段的你，量身規劃專屬的改變起點',
  description:
    '身心靈療癒不是迷信，而是幫你的大腦「重新開機、清除雜訊」。不論你處在哪個人生階段，幸運教主文齡 Keila 都為你準備了最理性、安心且溫和的改變地圖。',
};

export const needEntries: NeedEntry[] = [
  {
    id: 'family',
    shortLabel: '家庭',
    iconName: 'heart',
    title: '家庭與孩子守護',
    painPoint:
      '「每天為孩子的課業、情緒操碎了心，還要面對另一半或長輩的壓力。多渴望家裡和睦順利，孩子自動自發，自己也能好好睡個好覺。」',
    stories: [
      {
        title: '媽媽的定心丸',
        text: '孩子原本對讀書沒動力、人際卡關，媽媽幫他遠距預約「人生推進器」祝福後，孩子明顯變得積極，不僅主動分享心事，還說出未來想出國唸書的目標！',
      },
      {
        title: '婆媳與夫妻和解',
        text: '面臨極大婆媳壓力的媳婦，為婆婆預約「靈性按摩」清理身心壓力後，婆婆不再把情緒發洩在她身上；也有先生幫容易爆炸的太太預約，兩人終於能心平氣和地好好說話。',
      },
    ],
    startingPoint: '為辛勞的你提供最深度的安定感。當媽媽的心安定了，整個家就會迎來最溫柔的和諧。',
    ctas: [
      { label: '了解人生推進器', href: '/services/group-healing' },
      { label: '看靈性按摩介紹', href: '/services/spiritual-massage' },
    ],
  },
  {
    id: 'love',
    shortLabel: '感情',
    iconName: 'sparkles',
    title: '幸福真愛與伴侶',
    painPoint:
      '「母胎單身、總是遇不到對的人，或是一再陷入『不斷付出卻受傷』的感情舊模式？到底哪裡出了錯，我也想被好好疼愛啊！」',
    stories: [
      {
        title: '母胎單身逆襲',
        text: '透過心靈引渡人一對一對談，精準找出內心深處「害怕受傷」的愛情盲點。母胎單身的女孩成功告白，現在已經順利結婚生子！',
      },
      {
        title: '打破爛桃花循環',
        text: '透過練愛大確幸專屬課程陪跑，清空過去的感情包袱。不再委曲求全，活出自信閃耀的自己，順利吸引到真正懂你、疼你的另一半。',
      },
    ],
    startingPoint: '幫助你重新愛上自己，拔除感情裡的「有毒習慣」。這是一段溫暖陪伴的旅程，幫你打開心房，遇見真正適合你的人。',
    ctas: [
      { label: '了解心靈引渡人', href: '/services/personal-1on1' },
      { label: '看練愛大確幸介紹', href: 'https://booking.wenling.tw/products/love365', external: true },
    ],
  },
  {
    id: 'business',
    shortLabel: '事業',
    iconName: 'coins',
    title: '企業求財與事業突破',
    painPoint:
      '「身處商場高壓，每天焦慮到不行。面臨業績停滯、找不到神隊友員工，或是投資決策卡關，多渴望能有一股推力，讓財富與事業全面大爆發！」',
    stories: [
      {
        title: '投資人與老闆的神助攻',
        text: '透過豐盛靈氣清理掉「金錢阻礙」後，退休媽媽的股票從虧損 50 萬逆轉正，有操盤手突破個人最高獲利兩千萬！企業主也順利招募到心目中的神隊友員工。',
      },
      {
        title: '業績翻倍超順利',
        text: '珠寶店使用煙供祈福，順利打破長期的業績停滯期，創造每月穩定達到200萬元以上的業績。',
      },
    ],
    startingPoint: '為老闆、創業家、業務員與投資者提供專屬的開運助攻，讓好運與業績自動找上門！',
    ctas: [
      { label: '了解豐盛靈氣', href: '/services/abundance-reiki' },
      { label: '看煙供祈福介紹', href: '/services/smoke-prayer' },
    ],
  },
  {
    id: 'starter',
    shortLabel: '新手',
    iconName: 'sprout',
    title: '開啟身心靈事業 (新手入門)',
    painPoint:
      '「對身心靈充滿好奇，想找個簡單實用的方法解決自己的煩惱；或是想多一份副業收入，卻不知道從哪裡開始最快賺到錢？」',
    stories: [
      {
        title: '占卜師專業大升級',
        text: '塔羅牌占卜師學習希塔療癒後，從「只能給建議」變成「能實際幫客戶解決困擾」，收費價值大幅提升，開拓出全新的賺錢方向。',
      },
      {
        title: '零基礎小白無痛增加收入',
        text: '完全沒有身心靈背景的上班族，學完簡單易懂的金錢靈氣後，開始穩定接案增加收入，甚至能自己開課賺錢，打造完美副業！',
      },
    ],
    startingPoint: '不論是想療癒自己，還是想發展高收入的第二專長，這裡有最簡單、零門檻的教學，帶你把所學變成實際的收入。',
    ctas: [
      { label: '了解希塔療癒', href: '/training/theta-basic' },
      { label: '看金錢靈氣課介紹', href: '/training/money-reiki-cert' },
    ],
  },
];

// Home Block 7｜媒體與出版（文案集 v2 第 230～268 行）與 Media 頁（第 1488～1575 行）。
// 連結規則（PRD-003 §4.7）：文案集有顯示原始網址者用原始網址；只有內嵌在標題上的
// 連結者照內嵌連結（多為 Wayback 存檔）；原始網址已失效者改用文案集內嵌的替代連結。
// 同一集在 Block 7 與 Media 頁連結不同時，採 Block 7（較新、非存檔）的連結。
// featured 為首頁 Block 7 的精選單集。
// 出版品的 heading 是文案集的整行標題（第 235、238、241 行），不拆成書名與自訂的角色說明。
export const mediaIntro = {
  label: '媒體專訪與出版紀錄',
  heading: '幸運教主文齡 Keila的蛻變故事，多次受邀於全台知名 Podcast 節目與暢銷書中分享',
  description:
    '以下為幸運教主文齡 Keila公開可查證的出版與媒體受訪紀錄，用最落地的經驗，陪你走過感情與人生的每個卡關。',
};

export const mediaPublications: MediaPublication[] = [
  {
    id: 'pub-seven-weeks',
    title: '七週遇見對的人',
    heading: '暢銷書《七週遇見對的人》改版唯一推薦序作者',
    description:
      '受邀為經典暢銷書撰寫推薦序，幸運教主文齡 Keila帶領本書讀書會超過10年、幫助破百名學員的深厚實務經驗，已成功陪伴無數學員走過低潮，順利脫單、結婚生子，活出自己最美好的樣子。',
    link: { label: '博客來購書連結', href: 'https://www.books.com.tw/products/0010917426' },
  },
  {
    id: 'pub-love365',
    title: '練愛大確幸',
    heading: '個人著作：《練愛大確幸》實作手帳',
    description:
      '將多年協助個案走過失戀與感情卡關的實務心法，淬鍊成這本專屬的幸福手帳。不只分享改變人生的實作方法，更錄製52則療癒音檔，成為你每天都能輕鬆參與的小練習！',
    link: { label: '購買連結', href: 'https://booking.wenling.tw/products/love365' },
  },
  {
    id: 'pub-good-woman',
    title: '好女人的情場攻略',
    heading: '《好女人的情場攻略》— 節目合作／內容參與',
    description:
      '多次受邀參與節目錄製，並為同名暢銷書的戀愛專家群，分享感情經營與自我價值提升。用最白話的方式，解開你的愛情盲點。',
    note: '曾創下 2022 年度收聽冠軍、2024 前十名！',
    link: { label: '下方收聽 Podcast 精選單集', href: '#media-podcasts' },
  },
];

// 文案集的連結多為網站時光機存檔網址。2026-10-05 逐一檢查：原站仍可連線者改回原始網址（其中 7 個存檔網址已 404），
// 只有原網域已失效的「談芯時刻」保留存檔版。
const WAYBACK = 'https://web.archive.org/web/20250518033113/';
const GOOD_WOMAN_S1 = 'https://player.soundon.fm/p/6362197d-09d1-4b49-82cd-07100717bd33/episodes/';
const MARIE_CLAIRE = 'https://player.soundon.fm/p/10d7b46c-1a7b-4979-8421-6e3039e8c9c5/episodes/';
const HAPPINESS_APPLE =
  'https://podcasts.apple.com/tw/podcast/%E5%B0%8F%E7%B4%80%E8%80%81%E5%B8%AB%E7%9A%84%E5%B9%B8%E7%A6%8F%E5%AD%B8/id1524242943?i=';

export const mediaShows: MediaShow[] = [
  {
    id: 'marie-claire',
    show: '美麗佳人 Podcast',
    kind: 'podcast',
    summary: '多集專訪，分享希塔療癒與失戀急診等主題',
    episodes: [
      { title: 'S2EP29＃情慾瑪麗｜失戀急診:希塔療癒Ft.療癒師文齡 (上)', href: `${MARIE_CLAIRE}65751f59-2024-41a0-b890-335b2f0780d3` },
      { title: 'S2EP35＃情慾瑪麗｜怦然心動的人生整理魔法:希塔療癒 Ft.療癒師文齡(中)', href: `${MARIE_CLAIRE}78189391-fc1e-409f-807f-b01ca6cd9f2d` },
      { title: 'S2EP41＃情慾瑪麗｜就是那個光?!希塔療癒免費體驗來了! Ft.幸運療癒師文齡(下)', href: `${MARIE_CLAIRE}9a4466ab-0dc5-43b6-accb-d7893cd35906` },
      { title: 'S9EP7#情慾瑪麗|練愛大確幸-療癒師手把手帶你成為最好的自己並找到真愛', href: 'https://open.spotify.com/episode/0qA1IYCIPNWwo6ZGUh2bAa?si=sbFnXu3wSAmH1QFEPlafEw', featured: true },
    ],
  },
  {
    id: 'good-woman',
    show: '好女人的情場攻略 Podcast',
    kind: 'podcast',
    summary: '長期合作來賓，2022 年收聽數冠軍、2024 年前十名',
    episodes: [
      { group: '2020 S1', title: 'ep95設好日期脫單術', href: `${GOOD_WOMAN_S1}c0f3494c-b283-4c9a-b44e-14955deb0a6f` },
      { group: '2020 S1', title: 'ep96清理過去，迎接美好愛情', href: `${GOOD_WOMAN_S1}408ef22a-dce0-43ce-8fec-4077be82d06c` },
      { group: '2020 S1', title: 'ep97愛情也需要設定目標', href: `${GOOD_WOMAN_S1}f385a9c6-d6ee-4d3a-ba31-b14e956c753f` },
      { group: '2020 S1', title: 'ep98開啟百人約會計劃', href: `${GOOD_WOMAN_S1}cc451cc7-020e-42f2-ace0-e116233315d6` },
      { group: '2020 S1', title: 'ep99七週遇見對的人讀書會', href: `${GOOD_WOMAN_S1}f7a796df-c7b0-4505-b23a-246af8aa28ad` },
      { group: '2022 S3', title: 'Ep.099｜失戀急救箱：加速放下前任的五個療癒方法！', href: 'https://open.firstory.me/story/cl4l13gnv017h01ygfl3r13t9' },
      { group: '2022 S3', title: 'Ep.100｜醒醒吧！你總是在愛情裡鬼打牆？這集請務必服用！', href: 'https://open.firstory.me/story/cl4nviaac007d01zteuj47jnl' },
      { group: '2022 S3', title: 'Ep.101｜你知道嗎？有形無形的「約定」正阻礙你遇到理想型？', href: 'https://open.firstory.me/story/cl4pg3yez001001wa9q14ezlp' },
      { group: '2022 S3', title: 'Ep.102｜你的擇偶條件是什麼? 你是嚮往愛情，還是愛上對方?', href: 'https://open.firstory.me/story/cl4qqoi9800ni01zy6o8lhtc7' },
      { group: '2022 S3', title: 'Ep.103｜情侶相處溝通的10個超棒秘訣，不藏私一次全告訴你！', href: 'https://open.firstory.me/story/cl4vg6oez001d01t99rpi2bwd', note: '2022年收聽冠軍單集', featured: true },
      { group: '2024 S5', title: 'Ep.005｜【鏡子練習】用肯定句創造理想人生', href: 'https://open.firstory.me/story/clr4bn1gi030i01tzcvvsboco' },
      { group: '2024 S5', title: 'Ep.006｜七週遇見對的人 【理想伴侶訂單】秘技來了', href: 'https://open.firstory.me/story/clr4bnw3103kw01wv9xdkcala' },
      { group: '2024 S5', title: 'Ep.007｜【靈魂伴侶】真的存在嗎？什麼是【雙生火焰】?', href: 'https://open.firstory.me/story/clr759oav00x301w1dlypg1w1' },
      { group: '2024 S5', title: 'Ep.008｜【分手失戀】挽回感情的復合攻略是?', href: 'https://open.firstory.me/story/clr75al6200zp01x3evigd7h9' },
    ],
  },
  {
    id: 'charming-talk',
    show: '迷人說 Podcast',
    kind: 'podcast',
    episodes: [
      { title: '迷人說#20《如何創造魅力氣場，找尋適合你的真愛》幸運療癒師 Wenling 訪談特輯', href: `https://podcasters.spotify.com/pod/show/stellasu/episodes/20-Wenling-e12eoh1` },
    ],
  },
  {
    id: 'happiness-study',
    show: '小紀老師的幸福學 Podcast',
    kind: 'podcast',
    episodes: [
      { title: 'Ep.161 l 打造幸運體質', href: `${HAPPINESS_APPLE}1000591850026` },
      { title: 'Ep.162 l 如何創造貴人', href: `${HAPPINESS_APPLE}1000591959880` },
      { title: 'Ep.163 l 如何成為金錢磁鐵', href: 'https://podcasts.apple.com/tw/podcast/ep-163-l-%E5%A6%82%E4%BD%95%E6%88%90%E7%82%BA%E9%87%91%E9%8C%A2%E7%A3%81%E9%90%B5/id1524242943?i=1000592233229', featured: true },
      { title: 'Ep.164 l 如何吸引好桃花', href: `${HAPPINESS_APPLE}1000592527540` },
      { title: 'Ep.165 l 心想事成許願法', href: `${HAPPINESS_APPLE}1000592780746` },
    ],
  },
  {
    id: 'pink-hell',
    show: '粉紅地獄辛辣麵 Podcast',
    kind: 'podcast',
    episodes: [
      { title: 'S3EP73. 幸運療癒師｜梁文齡：每日三佈施，幸運發光一輩子！', href: 'https://solink.soundon.fm/episode/be34a98f-4cba-4d3d-829b-3b7f0fb3ac8d', featured: true },
      { title: 'S3EP74. 幸運療癒師｜梁文齡：透過靈氣療癒，點亮心中的一盞燈！', href: `https://solink.soundon.fm/episode/14ab7045-e4dd-4cf3-aeca-916cb6214aa6` },
    ],
  },
  {
    id: 'heart-talk',
    show: '談芯時刻',
    kind: 'podcast',
    episodes: [
      { title: 'Ep.246 Stop！停止被潛意識綁架，希塔療癒破除你的限制信念_feat.幸運療癒師文齡 Keila', href: `${WAYBACK}https://chuchu.firstory.io/episodes/clyimzld608pu01zsar0sedw3` },
      // 例外：文案集 Media 頁顯示的原始網址在 chuchu.firstory.io，該網域已無法解析
      // （2026-10-04 查為 NXDOMAIN）。Ep.246 改用文案集內嵌的 Wayback 存檔連結，
      // Ep.282 改用文案集 Block 7 內嵌的 YouTube 連結。
      { title: 'Ep.282【談芯時刻】生活卡關了嗎？一起來做個脈輪健檢吧！ _feat.幸運療癒師 文齡 Keila', href: 'https://youtu.be/gyfw264Gxwo?si=N3lgDii1Bs2nLpy5', featured: true },
    ],
  },
  {
    id: 'theta-fun',
    show: '希塔好好玩 YouTube 直播訪談',
    kind: 'youtube',
    episodes: [
      { title: '如何顯化靈魂伴侶及成為專職療癒師💕', href: 'https://www.youtube.com/watch?v=XIbfVMbPqLA', featured: true },
    ],
  },
  {
    id: 'love-chat',
    show: '戀愛潛聊室 YouTube 直播訪談',
    kind: 'youtube',
    episodes: [
      { title: '《七週遇見對的人》發現真愛吸引力 召換幸福 Ft. 文齡老師', href: `https://youtu.be/Gmathj77aDo?si=O7Wy17xH8DJcPDAq` },
      { title: '分手失戀如何走出來 實測有效的方法 讓你重新出發 Ft.文齡老師', href: `https://youtu.be/YK_zbXTr1sk?si=zE3eQs9JKqhOmRgb` },
    ],
  },
  {
    id: 'island-day',
    show: '小島好日 YouTube 直播訪談',
    kind: 'youtube',
    episodes: [
      { title: '單身的你，如何尋找對的另一半', href: `https://www.youtube.com/watch?v=wwv1UPc1EyA` },
    ],
  },
  {
    id: 'co-cooking',
    show: '共煮生活實驗室 YouTube 直播訪談',
    kind: 'youtube',
    episodes: [
      // 文案集此集的內嵌連結與「小島好日」同一支影片，疑為誤植，先不放連結（待客戶確認）。
      { title: '如何成功招桃花' },
    ],
  },
  {
    id: 'zen-life',
    show: '禪生活的108問 Facebook 直播',
    kind: 'facebook',
    episodes: [
      { title: '教你如何變幸運', href: 'https://www.facebook.com/ZenLifeWithYou/videos/797426094675119' },
    ],
  },
];

// 文案集 v2 Block 7「官方授權認證資歷與合作機構」（第 265～268 行）。
export const mediaPartners: string[] = [
  '暢銷著作合作《七週遇見對的人》《好女人的情場攻略》',
  '愛山林集團、One&Co商務中心、大誠保險經紀人特邀講師',
  '美國 THINK 官方希塔療癒認證導師',
];

// 文案集 v2「網站下方區塊調整」（第 269～308 行）。導覽文字逐字用 docx 的名稱
// （服務項目／培訓課程／真實見證／好運blog，第 286～291 行）。「新手入門」待頁面文案到位後再加入。
export const footerContent = {
  tagline:
    '用理性的商務邏輯，結合溫柔的能量調頻。不只給你心靈的撫慰，更提供落地可執行的行動指南。陪伴你解開愛情、家庭與財富卡點，找回內在的平靜，活出閃閃發光的幸運人生。',
  status: '全球線上遠距服務',
  shopLabel: '訂購商品、服務或課程',
  contactHeading: '官方聯繫與諮詢管道',
  contactIntro: '企業開運講座、讀書會導讀合作或個人開班詢問，歡迎隨時聯繫團隊：',
  communityNote: '輸入168168加入line社群（免費體驗能量療癒、參加線上公益讀書會）',
  // 文案集 sitemap 註記「Footer 免責聲明」（第 105 行）但未附文字；內文取自
  // Home Block 8 Q6 的回答（第 323 行）。
  disclaimerHeading: '免責聲明',
  disclaimer:
    '所有能量療癒與課程皆屬身心靈輔助與自我覺察支持，不能取代專業醫療診斷、精神醫學治療或專業諮商。如有生理或心理疾患，請務必優先諮詢專業醫師。',
};

export const footerNavigation: NavGroup[] = [
  {
    id: 'about',
    label: '關於豐盛之翼學苑',
    items: [
      { id: 'about', label: '品牌理念', href: '/about' },
      { id: 'story', label: '創辦人經歷與故事', href: '/story' },
      // 「合作夥伴」待客戶提供療癒師資料後再加回（RPT-001 G7／T7）；區塊目前不顯示。
    ],
  },
  {
    id: 'services',
    label: '療癒與培訓',
    items: [
      { id: 'services', label: '服務項目', href: '/services' },
      { id: 'training', label: '培訓課程', href: '/training' },
    ],
  },
  {
    id: 'community',
    label: '見證與實用內容',
    items: [
      { id: 'testimonials', label: '真實見證', href: '/testimonials' },
      { id: 'blog', label: '好運blog', href: '/blog' },
      { id: 'resources', label: '免費資源', href: '/resources' },
      { id: 'media', label: '媒體專訪', href: '/media' },
    ],
  },
];

// 旅程（PLN-006、pages-v2/BRIEF §5）：每一頁的上一站與下一站，由 JourneyNext 顯示在頁尾行動區塊之前。
// 這裡只有路由，不含任何文字；連結文字由 JourneyNext 依路由到上面的導覽資料取既有的頁名。
// 服務與課程的詳細頁各用一個固定的 key。
export type JourneyKey =
  | '/about' | '/story' | '/services' | 'service-detail' | '/training' | 'course-detail'
  | '/testimonials' | '/media' | '/resources' | '/contact' | '/blog' | '/legal';

export const journey: Record<JourneyKey, { prev?: string; next?: string }> = {
  '/about': { next: '/story' },
  '/story': { prev: '/about', next: '/testimonials' },
  '/services': { prev: '/about', next: '/training' },
  'service-detail': { prev: '/services', next: '/testimonials' },
  '/training': { prev: '/services', next: '/resources' },
  'course-detail': { prev: '/training', next: '/resources' },
  '/testimonials': { prev: '/story', next: '/media' },
  '/media': { prev: '/testimonials', next: '/services' },
  '/resources': { prev: '/training', next: '/services' },
  '/contact': { next: '/resources' },
  '/blog': { prev: '/media', next: '/resources' },
  '/legal': {},
};

// ─────────────────────────────────────────────────────────────────────────
// PLN-004 階段 D1：首頁（RES-002 §1 定案）。區塊標題、內文與按鈕文字一律逐字取自
// 文案集 v2（docs/網站文案集.md）；docx 沒有的眉標與說明已於 2026-10-05 移除，不自行撰寫。
// ─────────────────────────────────────────────────────────────────────────
export const homeContent = {
  // 需求入口卡片內的小標：Home Block 2 的【真實改變故事】【專屬起點】（第 126、129 行）。
  needs: {
    storiesLabel: '真實改變故事',
    startLabel: '專屬起點',
  },
  // 精選服務：需求入口前三張卡的第一個 CTA 所指的服務（RES-001 §9 決策 4）。
  // 標題與副標：Home Block 3（第 161、163 行）；各服務的一句話在 serviceBlurbs。
  // moreLabel：頁尾導覽的「服務項目」（第 286 行）；itemLabel：第 337 行。
  services: {
    heading: '能量療癒服務｜為你的身心靈量身訂做的解方',
    description: '從一對一深度療癒到遠距能量調頻，8 大服務系統，陪你在對的時間，做對的清理與修復。',
    ids: ['group-healing', 'personal-1on1', 'abundance-reiki'],
    moreLabel: '服務項目',
    itemLabel: uiLabels.offeringInfo,
  },
  // 精選見證：Home Block 6（第 214～227 行）各類第一則。客戶尚未確認可公開使用
  // （RPT-001 C1），authorized 為 false 時首頁不顯示這個區塊。
  testimonials: {
    authorized: false,
    eyebrow: '真實見證',
    heading: '他們，都在這裡找回了人生的主導權',
    description: '來自不同生命階段、不同課題的真實蛻變故事。',
    items: [
      { category: '感情／單身', quote: '調整完伴侶訂單的 3 個月內，我就遇到了新對象！完全突破了以前對另一半的刻板印象！', source: '感情顯化個案' },
      { category: '家庭／媽媽', quote: '幫家裡祈福後，原本晚上容易哭鬧的孩子終於能安穩入睡，家裡的壓力感整個消失了。', source: '家庭祈福個案' },
      { category: '事業／企業主', quote: '煙供後老闆不再找麻煩，卡很久的案子順利成交，那週業績直接翻倍！', source: '事業突破個案' },
    ],
    moreLabel: '真實見證',
  },
  // 創辦人簡介：短簡介（RPT-001 T2）未到，先用 About 的使命宣言原文（第 328～329 行）。
  // 按鈕文字是頁尾導覽的「創辦人經歷與故事」（第 277 行）。
  founder: {
    eyebrow: '創辦人',
    missionLabel: '我的使命與願景',
    missionTitle: '在愛與豐盛中綻放靈魂的光芒',
    mission: '「引導每一位來到這裡的靈魂家人，褪去潛意識的限制與傷痛，喚醒內在的豐盛與平靜，活出最真實、閃耀且充滿力量的人生。」',
    cta: '創辦人經歷與故事',
  },
  // 以下兩個按鈕用頁尾導覽的頁名（第 292、293 行）。
  media: { moreLabel: '媒體專訪' },
  resources: { eyebrow: '免費資源', moreLabel: '免費資源' },
  // FAQ 精選：Home Block 8（第 310～323 行）的 Q1、Q2、Q3、Q6（RPT-001 C4 的預設）。
  faq: {
    heading: '常見問題',
    items: [
      {
        question: '療癒／課程多久會有效？',
        answer: '每個人的能量運作節奏不同。有人隔天就能感受到具體轉變，也有人是在數週內逐步改善。身心感受通常顯現較快，之後請留意生活中的細微變化，例如想法變清晰、習慣模式改變，或身邊的人對待你的態度不同了。',
      },
      {
        question: '這是什麼？會不會是降頭或巫術？',
        answer: '絕對不是降頭或巫術。我們所使用的技術（如希塔療癒、擴大療癒等）皆源自正向、純淨的高頻源頭能量，屬於能量調整與潛意識轉化，非占卜、非通靈，也不涉及任何宗教束縛。',
      },
      {
        question: '我可以幫家人或朋友預約嗎？',
        answer: '個人一對一療癒需經本人同意並親自參與；團體遠距能量服務（如人生推進器、煙供）則可代為預約，但需先提供對方全名，經確認能量意願無誤後再進行安排。',
      },
      {
        question: '這些服務／課程可以取代醫療或心理治療嗎？',
        answer: '不行。所有能量療癒與課程皆屬身心靈輔助與自我覺察支持，不能取代專業醫療診斷、精神醫學治療或專業諮商。如有生理或心理疾患，請務必優先諮詢專業醫師。',
      },
    ],
  },
  // 最終 CTA：收束標語（RPT-001 T3）未到，先用 Hero 的眉批原文。按鈕文字見 uiLabels。
  finalCta: {
    primary: uiLabels.line,
    secondary: uiLabels.needs,
    shop: uiLabels.shop,
  },
  stickyCta: { primary: uiLabels.needs, line: uiLabels.lineShort },
  // 首頁五章（PRD-004 §4.1）。畫面上只顯示編號，不新增任何文字；id 是該章第一個區塊的錨點。
  chapters: {
    items: [
      { id: 'hero', number: '01' },
      { id: 'personas-section', number: '02' },
      { id: 'home-stages', number: '03' },
      { id: 'founder', number: '04' },
      { id: 'free-resources', number: '05' },
    ],
  },
};

// 各服務的一句話介紹：文案集 v2 Home Block 3（第 164～186 行）。首頁精選服務與
// /services 的卡片共用。
export const serviceBlurbs: Record<string, string> = {
  "personal-1on1": "潛入內心深處找出卡點根源，透過希塔療癒與潛意識溝通，直擊核心的深度轉化。",
  "spiritual-reading": "人生指南針、靈魂伴侶、4+1 感知中心天賦挖掘，為迷惘與抉擇中的你點亮方向。",
  "spiritual-massage": "無需接觸的遠距能量 SPA，溫和清理 14 點脈輪氣場，找回身心和諧與流動。",
  "group-healing": "強效清理舊業力、斷捨離舊有模式，為生命騰出空間迎接新契機。",
  "workshop": "3～4 小時輕量體驗，把能量工具帶回日常生活，零基礎即可上手。",
  "smoke-prayer": "古老的焚香上供下施法門，化解無形障礙，為自己與家人累積福報。",
  "abundance-reiki": "整合 8 種以上靈氣能量，全方位提升事業、財富與好運的顯化速度。",
  "five-elements-perfume": "依你的八字客製五行精油開運配方，精準補足流年運勢缺口。"
};

// 各課程的一句話介紹：文案集 v2 Home Block 4（第 193～205 行）。/training 的路徑節點使用。
export const courseBlurbs: Record<string, string> = {
  "theta-basic": "3 天課程，打下潛意識轉化最穩固的基礎，官方認證。",
  "theta-advanced-dna": "解鎖深度清理與跨維度溝通，讓顯化速度全面升級。",
  "theta-dig-deeper": "10 大深度信念挖掘技術，徹底破除「鬼打牆」的人生迴圈。",
  "money-reiki-cert": "從清理金錢業力到療癒師創業，一階到三階完整培訓。",
  "love-reiki-cert": "8 小時完整實戰大綱，療癒心輪創傷、吸引正緣。",
  "mermaid-reiki-cert": "喚醒深海魅力，重塑自愛與豐盛能量的覺醒之旅。"
};

// 服務類型（/services 的類型切換）。歸類待客戶確認（RPT-001 C5）。
// 名稱都是文案集用過的詞：一對一（第 41 行）、團體療癒（第 173 行）、祈福（第 179、185 行
// 「煙供祈福」「香水供祈福」）、工作坊（第 45 行）。
export const serviceTypes: { id: string; label: string; serviceIds: string[] }[] = [
  { id: 'one-on-one', label: '一對一', serviceIds: ['personal-1on1', 'spiritual-reading', 'spiritual-massage'] },
  { id: 'group', label: '團體療癒', serviceIds: ['group-healing', 'abundance-reiki'] },
  { id: 'blessing', label: '祈福', serviceIds: ['smoke-prayer', 'five-elements-perfume'] },
  { id: 'workshop', label: '工作坊', serviceIds: ['workshop'] },
];

// PLN-004 階段 D2～D5：服務／課程的總覽頁與詳細頁（RES-002 §2～§5）。
// 所有標籤逐字取自文案集；docx 沒有對應用語的標籤（原「這適合我嗎」「流程與報名」
// 「時長與形式」「你在這裡」等）已於 2026-10-05 移除，不自行撰寫。
export const offeringsContent = {
  // 各頁共用的導引按鈕（見 uiLabels）
  helper: { needs: uiLabels.needs, line: uiLabels.line },
  detail: {
    // 分組小標：方案與費用（第 498 行「服務方案與費用資訊」）、常見問題（第 311 行）、
    // 注意事項（第 547 行）、真實見證（第 290 行）。其餘分組不加小標，直接列出 docx 的段落標題。
    groups: { plans: '方案與費用', faq: '常見問題', notes: '注意事項', proof: '真實見證' } as Partial<Record<string, string>>,
    lineLabel: uiLabels.lineShort,
    // 麵包屑：頁尾導覽的頁名（第 286、287 行）
    serviceBack: '服務項目',
    courseBack: '培訓課程',
    // 課程的主按鈕：Home Block 4 的 CTA（第 194～206 行）
    courseCta: uiLabels.enroll,
  },
  // /services：頁名第 286 行；眉標與說明用 Home Block 3 的標題與副標（homeContent.services）；
  // 「8 大服務系統」取自副標（第 163 行），當作顯示全部的切換鈕。
  services: {
    title: '服務項目',
    allLabel: '8 大服務系統',
    itemLabel: uiLabels.offeringInfo,
  },
  // /training：頁名第 287 行；標題與說明取自 Home Block 4（第 190～191 行）；系列名稱第 192、200 行；
  // 直覺力培訓第 208 行、即將推出第 199 行、搶先登記第 212 行；credential 取自 Block 7（第 267 行）。
  training: {
    title: '培訓課程',
    heading: '成為療癒師，也成為自己生命的專家',
    description: '如果你渴望更深入地認識自己，甚至將能量療癒發展為第二專長，這裡是你的起點。',
    thetaTrack: '希塔療癒系列（ThetaHealing®）',
    reikiTrack: '靈氣認證系列',
    intuitionTrack: '直覺力培訓',
    comingSoon: '即將推出',
    enrollLabel: uiLabels.enroll,
    lineLabel: uiLabels.line,
    notifyLabel: '搶先登記，開課通知我',
    credential: '美國 THINK 官方希塔療癒認證導師',
  },
};

// PLN-004 階段 D6～D13：其餘內頁（RES-002 §6～§13）。頁名與標籤逐字取自文案集。
export const pagesContent = {
  // 頁名：第 274 行。技術清單的兩個小標是方法體系表格的欄名（第 338 行）。
  about: {
    title: '關於豐盛之翼學苑',
    definitionLabel: '一句話定義是什麼？',
    suitedLabel: '適合什麼樣的人？',
    // 第 1345 行「點我加入社群」
    communityCta: '點我加入社群',
  },
  // 頁名：第 277 行；章節標題第 375 行；認證標題第 399 行。
  story: {
    title: '創辦人經歷與故事',
    chaptersLabel: '我的故事：從全面崩塌到重生的轉折',
    credentialsTitle: '學經歷與專業認證',
    // 人物卡上的資歷重點：逐字取自文案集「學經歷與專業認證」
    highlights: [
      '官方認證導師 (基礎/進階/深度挖掘/神與我/顯化與豐盛) — 美國 THInK 總部發證',
      '台灣大學 政治學系學士畢業',
      'PMP專案管理師',
      '好女人的情場攻略 Podcast 2022收聽數冠軍與2024前十名',
    ],
  },
  // 頁名：第 290 行。docx 沒有「見證整理中」的說明文字，未授權時不顯示任何說明。
  testimonials: {
    title: '真實見證',
    servicesLabel: '服務項目',
  },
  // 出版品（第 234 行）、Podcast 精選訪談（第 244 行）、Podcast / 訪談（第 83 行）、
  // 官方授權認證資歷與合作機構（第 264 行）、連結待更新（第 1489 行）。
  media: {
    booksLabel: '出版品',
    featuredLabel: 'Podcast 精選訪談',
    allShowsLabel: 'Podcast / 訪談',
    partnersLabel: '官方授權認證資歷與合作機構',
    pendingLink: '連結待更新',
  },
  // 頁名：第 292 行。內容見 resources。
  resources: {
    title: '免費資源',
  },
  // 頁名與說明用頁尾的「官方聯繫與諮詢管道」（第 301～302 行，footerContent）。
  // 來意的文字：第 371、302、306 行。
  contact: {
    purposes: [
      { id: 'line', label: '一對一私訊諮詢', channel: 'line' },
      { id: 'email', label: '企業開運講座、讀書會導讀合作或個人開班詢問', channel: 'email' },
      { id: 'community', label: '免費體驗能量療癒、參加線上公益讀書會', channel: 'community' },
    ],
  },
  // 頁名：第 291 行。allLabel／readLabel／closeLabel 不是 docx 文字，只在 SHOW_BLOG_POSTS 開啟後才會出現。
  blog: { title: '好運blog', allLabel: '全部', readLabel: '閱讀全文', closeLabel: '關閉' },
  // 頁名：第 297 行「免責聲明與條款」。
  legal: { title: '免責聲明與條款' },
};

// 各頁的 <title> 與 meta description。title 是 docx 的頁名或標題，加上「｜豐盛之翼學苑」；
// description 是該頁在 docx 裡的一句原文（行號見各筆）。沒有合適原文的頁面不設 description，
// 沿用全站預設（home）。服務與課程詳細頁用 serviceBlurbs／courseBlurbs，見 offeringMeta。
const BRAND = '豐盛之翼學苑';
const metaTitle = (heading: string) => `${heading}｜${BRAND}`;
export const pageMeta = {
  // 第 111、113 行
  home: {
    title: metaTitle(heroContent.eyebrow),
    description: '無論你正期盼感情的順遂、財富的自由，或是生活的全面好運，我們將透過最白話、最落地的靈性工具，陪你解開內在卡點。',
  },
  // 第 276、329 行
  about: {
    title: metaTitle('品牌理念'),
    description: '引導每一位來到這裡的靈魂家人，褪去潛意識的限制與傷痛，喚醒內在的豐盛與平靜，活出最真實、閃耀且充滿力量的人生。',
  },
  // 第 277、395 行
  story: {
    title: metaTitle(pagesContent.story.title),
    description: '真正的療癒，不是逃離現實，而是重新看見內在的光。',
  },
  // 第 286、163 行
  services: { title: metaTitle(offeringsContent.services.title), description: homeContent.services.description },
  // 第 287、191 行
  training: { title: metaTitle(offeringsContent.training.title), description: offeringsContent.training.description },
  // 第 290 行；見證未授權前不放見證的說明句
  testimonials: {
    title: metaTitle(pagesContent.testimonials.title),
    ...(homeContent.testimonials.authorized ? { description: homeContent.testimonials.description } : {}),
  },
  // 第 293、233 行
  media: { title: metaTitle('媒體專訪'), description: mediaIntro.description },
  // 第 292、365 行
  resources: {
    title: metaTitle(pagesContent.resources.title),
    description: '這裡每天都有滿滿的正能量，歡迎你帶著願望進來，也帶著好消息出去！',
  },
  // 第 301、302 行
  contact: { title: metaTitle(footerContent.contactHeading), description: footerContent.contactIntro },
  // 第 291 行
  blog: { title: metaTitle(pagesContent.blog.title) },
  // 第 297、1686 行
  legal: {
    title: metaTitle(pagesContent.legal.title),
    description: '在您報名課程、預約諮詢或使用本平台任何服務之前，請務必詳細閱讀以下聲明。',
  },
};

// 服務／課程詳細頁的 <title> 與 description：名稱加學苑名，說明用 Home Block 3／4 的一句話。
export function offeringMeta(name: string, blurb?: string) {
  return { title: metaTitle(name), ...(blurb ? { description: blurb } : {}) };
}

// 客戶見證：文案集 v2 Home Block 6（第 214～227 行）四類共 8 則。授權確認前不顯示
// （homeContent.testimonials.authorized；RPT-001 C1）。
export const testimonialQuotes: { category: string; quote: string; source: string }[] = [
  { category: '感情／單身', quote: '調整完伴侶訂單的 3 個月內，我就遇到了新對象！完全突破了以前對另一半的刻板印象！', source: '感情顯化個案' },
  { category: '感情／單身', quote: '原本以為自己很清楚要什麼，做完『伴侶訂單微調』才發現潛意識的限制。清理卡點後，對感情的焦慮感瞬間消失，身邊也開始出現好幾個符合解讀特徵的人！', source: '靈魂伴侶解讀個案' },
  { category: '家庭／媽媽', quote: '幫家裡祈福後，原本晚上容易哭鬧的孩子終於能安穩入睡，家裡的壓力感整個消失了。', source: '家庭祈福個案' },
  { category: '家庭／媽媽', quote: '女兒代媽媽預約後，媽媽長期失眠狀況獲得改善，胸口不適感也消失了。', source: '家庭療癒個案' },
  { category: '事業／企業主', quote: '煙供後老闆不再找麻煩，卡很久的案子順利成交，那週業績直接翻倍！', source: '事業突破個案' },
  { category: '事業／企業主', quote: '隔天業績提升、三天後獲得升遷通知。', source: '事業突破個案' },
  { category: '身心蛻變／其他', quote: '透過持續信念挖掘，排除體內負面情緒毒素。沒有特別控制飲食與運動，短短兩個月就瘦了 6 公斤！', source: '希塔療癒學員' },
  { category: '身心蛻變／其他', quote: 'Keila 老師精準讀到我的優勢是凝聚團隊，也挖出我很深的卡點——『覺得休息就會害到別人』。重新校正後，我不必再把責任全扛在身上，團隊也變得更主動了。', source: '4+1 感知中心個案' },
];

// PRD-003 §4.14（PLN-004 Batch A6）：/legal 改用文案集 v2 的《隱私權政策》（第 1589 行起）、
// 《服務條款》（第 1617 行起）與《免責聲明》（第 1684 行起）全文。以下內容由
// 文案集逐段轉錄，未改寫；blocks 內字串為段落、字串陣列為條列。
export const legalDocuments: LegalDocument[] = [
  {
    "id": "disclaimer",
    "title": "網站服務與課程免責聲明",
    "intro": "歡迎您使用本網站/平台之服務。在您報名課程、預約諮詢或使用本平台任何服務之前，請務必詳細閱讀以下聲明。當您使用本平台服務，即表示您已充分理解並同意以下條款：",
    "sections": [
      {
        "heading": "1. 服務目的與範圍",
        "blocks": [
          "本平台提供之課程、示範掃描解讀、一對一諮詢、練習會、講座及相關能量療癒服務與商品，其主要目的為激勵並協助學員探索、學習與擴展健康的情緒與靈性知識，進而為自己、家人或顧客提供促進身心平衡的選擇參考。"
        ]
      },
      {
        "heading": "2. 非醫療與專業意見替代聲明",
        "blocks": [
          "本平台所提供之所有課程、療癒與相關服務內容，均不構成醫療、心理治療、法律、財務或其他專業意見，亦不得取代專業合格醫師之診斷、建議或治療。若您有任何身體、心理或其他醫學上被視為需進行醫療照護之情形，請務必尋求專業合格的醫師、醫療人員或心理諮商師之協助。請勿因本平台之部分資訊或課程內容而延誤就醫、停止治療、忽略專業醫療建議，或中斷必要的醫療措施。"
        ]
      },
      {
        "heading": "3. 產品與療效聲明免責",
        "blocks": [
          "本平台服務過程（含諮詢、能量療癒、解讀）及課程中提及之任何食品、營養補充品、配方、精油或可能授予健康益處等相關陳述或聲明，均未經食品藥物管理署（FDA / TFDA）評估，亦非用於疾病的診斷、療癒、照顧或預防。相關資訊僅供參考，絕不應作為醫療診斷、治療或疾病預防之依據。"
        ]
      },
      {
        "heading": "4. 學習成效與結果不保證",
        "blocks": [
          "本平台之所有課程、練習會、講座、療癒、解讀、諮詢與顧問服務，均僅供學習與參考之用，不保證任何健康、關係、財富、收入或其他特定結果。每位學員因個人背景、身心狀態、學習體驗、實際運用程度及其他客觀因素不同，因此本單位不保證每位學員使用服務後之成效。本平台無須承擔學員因運用相關內容所衍生之任何法律責任。"
        ]
      },
      {
        "heading": "5. 個人風險承擔與特殊身心狀況聲明",
        "blocks": [
          "學員應自行評估自身身心狀況是否適合參加本平台之課程及相關活動。課程與活動後、掃描解讀、個案諮詢之成效，以及懷孕期間仍選擇參加潛意識挖掘活動或其他課程者，所產生的一切結果與影響，均由學員/個案自行評估風險並承擔，本單位概不負責。學員對於因參加課程、運用課程內容及個人決定所產生的一切結果與責任，須由個人完全承擔。"
        ]
      }
    ]
  },
  {
    "id": "privacy",
    "title": "隱私權政策",
    "intro": "歡迎您光臨豐盛之翼學苑（以下簡稱本網站），為了讓您能夠安心的使用本網站的各項服務與資訊，特此向您說明本網站的隱私權政策，以保障您的權益，請您詳閱下列內容：",
    "sections": [
      {
        "heading": "一、隱私權政策的適用範圍",
        "blocks": [
          "隱私權政策內容，包括本網站如何處理在您使用網站服務時收集到的個人識別資料。隱私權政策不適用於本網站以外的相關連結網站，也不適用於非本網站所委託或參與管理的人員。"
        ]
      },
      {
        "heading": "二、個人資料的蒐集、處理及利用方式",
        "blocks": [
          [
            "當您造訪本網站或使用本網站所提供之功能服務時，我們將視該服務功能性質，請您提供必要的個人資料，並在該特定目的範圍內處理及利用您的個人資料；非經您書面同意，本網站不會將個人資料用於其他用途。",
            "本網站在您使用服務信箱、問卷調查等互動性功能時，會保留您所提供的姓名、電子郵件地址、聯絡方式及使用時間等。",
            "於一般瀏覽時，伺服器會自行記錄相關行徑，包括您使用連線設備的IP位址、使用時間、使用的瀏覽器、瀏覽及點選資料記錄等，做為我們增進網站服務的參考依據，此記錄為內部應用，決不對外公佈。",
            "為提供精確的服務，我們會將收集的問卷調查內容進行統計與分析，分析結果之統計數據或說明文字呈現，除供內部研究外，我們會視需要公佈統計數據及說明文字，但不涉及特定個人之資料。"
          ]
        ]
      },
      {
        "heading": "三、資料之保護",
        "blocks": [
          [
            "本網站主機均設有防火牆、防毒系統等相關的各項資訊安全設備及必要的安全防護措施，加以保護網站及您的個人資料採用嚴格的保護措施，只由經過授權的人員才能接觸您的個人資料。",
            "如因業務需要有必要委託其他單位提供服務時，本網站亦會嚴格要求其遵守保密義務，並且採取必要檢查程序以確定其將確實遵守。"
          ]
        ]
      },
      {
        "heading": "四、網網站對外的相關連結",
        "blocks": [
          "本網站的網頁提供其他網站的網路連結，您也可經由本網站所提供的連結，點選進入其他網站。但該連結網站不適用本網站的隱私權政策，您必須參考該連結網站中的隱私權政策。"
        ]
      },
      {
        "heading": "五、與第三人共用個人資料之政策",
        "blocks": [
          "本網站絕不會提供、交換、出租或出售任何您的個人資料給其他個人、團體、私人企業或公務機關，但有法律依據或合約義務者，不在此限。前項但書之情形包括不限於：",
          [
            "經由您書面同意。",
            "法律明文規定。",
            "為免除您生命、身體、自由或財產上之危險。",
            "與公務機關或學術研究機構合作，基於公共利益為統計或學術研究而有必要，且資料經過提供者處理或蒐集者依其揭露方式無從識別特定之當事人。",
            "當您在網站的行為，違反服務條款或可能損害或妨礙網站與其他使用者權益或導致任何人遭受損害時，經網站管理單位研析揭露您的個人資料是為了辨識、聯絡或採取法律行動所必要者。",
            "有利於您的權益。",
            "本網站委託廠商協助蒐集、處理或利用您的個人資料時，將對委外廠商或個人善盡監督管理之責。"
          ]
        ]
      },
      {
        "heading": "六、Cookie 之使用",
        "blocks": [
          "為了提供您最佳的服務，本網站會在您的電腦中放置並取用我們的 Cookie，若您不願接受 Cookie 的寫入，您可在您使用的瀏覽器功能項中設定隱私權等級為高，即可拒絕 Cookie 的寫入，但可能會導致網站某些功能無法正常執行 。"
        ]
      },
      {
        "heading": "七、隱私權政策之修正",
        "blocks": [
          "本網站隱私權政策將因應需求隨時進行修正，修正後的條款將刊登於網站上。"
        ]
      }
    ]
  },
  {
    "id": "terms",
    "title": "服務條款",
    "intro": "當您開始使用豐盛之翼學苑（以下簡稱本網站），即表示您已閱讀、瞭解並同意接受本服務條款。如果您不同意接受本服務條款，即無法使用豐盛之翼學苑提供的服務。",
    "sections": [
      {
        "heading": "一、會員服務條款",
        "blocks": [
          [
            "本會員服務條款所稱之「會員」，為依照本網站所定之加入會員程序加入完成並通過認證者。",
            "當您使用本網站服務時，即表示您同意及遵守本服務條款的規定事項及相關法律之規定。",
            "本網站保留有審核加入會員資格之權利，另外已加入會員者，本網站亦保留有解除其會員資格之權利。",
            "本會員服務條款之修訂，適用於所有會員，當本網站修訂本服務條款時，將於本網站上公告。"
          ]
        ]
      },
      {
        "heading": "二、會員",
        "blocks": [
          [
            "使用本網站所提供之會員服務時，於加入會員時所登錄之帳號及密碼使用之。",
            "會員須善盡帳號及密碼的使用與管理之責任。對於使用該會員之帳號及密碼（無關於會員本身或其他人）利用本網站服務所造成或衍生之所有行為及結果，會員須自行負擔全部責任。",
            "會員之帳號及密碼遺失，或發現無故遭第三者盜用時，應立即通知本網站連絡掛失，因未即時通知，導致本網站無法有效防止及修改時，所造成的所有損失，會員應自負全責。",
            "每次結束使用本服務，執行會員之登出並關閉視窗，以確保您的會員權益。",
            "盜用第三者會員之帳號及密碼，導致第三者或本公司遭其他第三人或行政機關之調查或追訴時，第三者會員或本公司有權向您請求損害賠償，包括但不限於訴訟費用、律師費及商譽損失等。"
          ]
        ]
      },
      {
        "heading": "三、會員登錄資料",
        "blocks": [
          [
            "會員登錄資料須提供您本人正確、最新及完整的資料。",
            "會員登錄資料不得有偽造、不實等之情事（例如：個人資料及信用卡資料），一經發現本公司可拒絕其加入會員資格之權利。並得以暫停或終止其會員資格，若違反中華民國相關法律，亦將依法追究。",
            "會員基本資料（例如：住址、電話及其他登錄資料）有變更時，請不定期更新相關個人資料，確保其正確及完整性。若您提供的資料有錯誤或不符等現象，本網站有權暫停或終止您的帳號，並拒絕您繼續使用本服務。",
            "未經會員本人同意，本公司原則上不會將涉及個人隱私之資料開示給第三者，唯資料共用原則...等不在此限。",
            "會員應妥善保管密碼，不可將密碼洩露或提供給他人知道或使用；以同一個會員身分證字號和密碼使用本服務所進行的所有行為，都將被認為是該會員本人和密碼持有人的行為。",
            "會員如果發現或懷疑有第三人使用其會員身分證字號或密碼，應該立即通知本公司，採取必要的必要的防範措施。但上述通知不得解釋為本公司對會員負有任何形式之賠償或補償之責任或義務。"
          ]
        ]
      },
      {
        "heading": "四、使用行為",
        "blocks": [
          [
            "您使用本服務之一切行為必須符合當地或國際相關法令規範；對於使用者的一切行為，您須自行負擔全部責任。",
            "您同意絕不為非法之目的或以非法方式使用本服務，與確實遵守中華民國相關法規及網際網路之國際慣例，並保證不得利用本服務從事侵害他人權益或違法之行為。",
            "您於使用本網站會員服務時應遵守以下限制：",
            "有損他人人格或商標權、著作權等智慧財產權或其他權利內容。",
            "使用違反公共秩序或善良風俗或其他不法之文字。",
            "強烈政治、宗教色彩的偏激言論。",
            "未經本公司許可，不得利用本服務或本網站所提供其他資源，包括但不限於圖文資料庫、編寫製作網頁之軟體等，從事任何商業交易行為，或招攬廣告商或贊助人。",
            "其他違反本網站「會員服務條款」的內容。"
          ]
        ]
      },
      {
        "heading": "五、本公司專有權利",
        "blocks": [
          [
            "本服務所載，或本服務所連結之一切軟體或內容，或本公司之廣告商或合夥人所提供之內容，均受其著作權或其他專有權利或法律所保障。",
            "當您傳輸資料至本公司提供之服務時，您即同意此一資料為全開放性（任何人均可瀏覽）。您授權並許可本公司得以重製、修飾、改編或以其他形式使用該內容之全部或一部分，及利用該內容製作衍生著作。衍生著作之著作權悉歸本公司所有。",
            "本公司同意除依本使用條款約定，將前述您的資料及衍生著作置於本網站供網路使用者瀏覽，以及本公司所屬相關媒體外，絕不非法轉供其他直接營利目的或侵害您的權利之使用。",
            "所有網頁之頁面出現之廣告看板與活動訊息，所有權及經營權均為本公司所有，使用者除事先取得本公司同意外，不得自行使用所有訊息。",
            "會員同意並授權本網站，得為提供個人化服務或相關加值服務之目的，提供所需之會員資料給合作單位（第三者）做約定範圍內之運用，如會員不同意將其資料列於合作單位（第三者）產品或服務名單內，可通知本網站於名單中刪除其資料，並同時放棄其本網站以外之購物優惠或獲獎權利。",
            "同時為提供行銷、市場分析、統計或研究、或為提供會員個人化服務或加值服務之目的，會員同意本公司、或本公司之策略合作夥伴，得記錄、保存、並利用會員在本網站所留存或產生之資料及記錄，同時在不揭露各該資料之情形下得公開或使用統計資料。",
            "對於會員所登錄之個人資料，會員同意本網站得於合理之範圍內蒐集、處理、保存、傳遞及使用該等資料，以提供使用者其他資訊或服務、或作成會員統計資料、或進行關於網路行為之調查或行銷研究。"
          ]
        ]
      },
      {
        "heading": "六、終止授權",
        "blocks": [
          "您使用本服務之行為若有任何違反法令或本使用條款或危害本網站或第三者權益之虞時，本公司有權不經告知您，立即暫時或永久終止您使用本服務之授權。"
        ]
      },
      {
        "heading": "七、免責事項",
        "blocks": [
          [
            "下列情形發生時，本網站有權可以停止、中斷提供本服務：",
            "對本服務相關軟硬體設備進行更換、升級、保養或施工時。",
            "發生突發性之電子通信設備故障時。",
            "天災或其他不可抗力之因素致使本網站無法提供服務時。",
            "本公司對於使用者在使用本服務或使用本服務所致生之任何直接、間接、衍生之財產或非財產之損害，不負賠償責任。",
            "使用者對於上傳留言之文字、圖片及其它資料，應自行備份；本公司對於任何原因導致其內容全部或一部之滅失、毀損，不負任何責任。",
            "本公司對使用本服務之用途或所產生的結果，不負任何保證責任，亦不保證與本服務相關之軟體無缺失或會予以修正。",
            "對於您在本網站中的所有言論、意見或行為僅代表您個人；不代表本公司的立場，本公司不負任何責任。本公司對於使用者所自稱之身分，不擔保其正確性。",
            "本公司無須對發生於本服務或透過本服務所涉及之任何恐嚇、誹謗、淫穢或其他一切不法行為對您或任何人負責。",
            "對於您透過本服務所購買或取得，或透過本公司之贊助者或廣告商所刊登、銷售或交付之任何貨品或服務，您應自行承擔其可能風險或依法向商品或服務提供者交涉求償，與本公司完全無關，本公司均不負任何責任。"
          ]
        ]
      },
      {
        "heading": "八、修改權",
        "blocks": [
          [
            "當您開始使用本服務時，即表示您已充分閱讀、瞭解與同意接受本條款之內容。本公司有權於任何時間修改與變更本條款之內容，並將不個別通知會員，建議您定期查閱本服務條款。如您於本條款修改與變更後仍繼續使用本服務，則視為您已閱讀、瞭解與同意接受本條款修改或變更。",
            "本公司有權暫時或永久修改或中止提供本服務給您，您不得因此要求任何賠償。"
          ]
        ]
      },
      {
        "heading": "九、智慧財產權的保護",
        "blocks": [
          [
            "本網站所使用之軟體、程式及網站上所有內容，包括但不限於著作、圖片、檔案、資訊、資料、網站架構、網頁設計，均由本網站或其他權利人依法擁有其智慧財產權，包括但不限於商標權、專利權、著作權、營業秘密與專有技術等。",
            "任何人不得逕行使用、修改、重製、公開播送、改作、散布、發行、公開發表、進行還原工程、解編或反向組譯。如欲引用或轉載前述之軟體、程式或網站內容，必須依法取得本網站或其他權利人的事前書面同意。如有違反之情事，您應對本網站或其他權利人負損害賠償責任（包括但不限於訴訟費用及律師費用等）。"
          ]
        ]
      },
      {
        "heading": "十、其他規定",
        "blocks": [
          [
            "本網站使用者條約，免責之內容，亦構成本使用條款之一部分。",
            "凡因使用本服務所生之爭執，均以台灣臺中地方法院為第一審管轄法院。",
            "若因您使用本服務之任何行為，導致本公司遭第三人或行政機關之調查或追訴時，本公司有權向您請求損害賠償，包括但不限於訴訟費用、律師費及商譽損失等。",
            "本公司針對可預知之軟硬體維護工作，有可能導致系統中斷或是暫停者，將會於該狀況發生前，以適當之方式告知會員。"
          ]
        ]
      },
      {
        "heading": "十一、會員身份終止與本公司通知之義務",
        "blocks": [
          [
            "本公司具有更改各項服務內容或終止任一會員帳戶服務之權利。",
            "若會員決定終止本公司會員資格，可直接以電子郵件的方式通知本公司或是由本公司所提供之機制進行取消，本公司將儘快註銷您的會員資料。",
            "會員有通知取消本公司會員資格之義務，並自停止本公司會員身份之日起（以本公司電子郵件發出日期為準），喪失所有本服務所提供之優惠及權益。",
            "為避免惡意情事發生致使會員應享權益損失，當會員通知本公司停止會員身份時，本公司將再次以電子郵件確認無誤後，再進行註銷會員資格。"
          ]
        ]
      }
    ]
  }
];
