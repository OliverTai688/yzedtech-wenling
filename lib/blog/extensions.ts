import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Youtube from '@tiptap/extension-youtube';

// 編輯器（瀏覽器）與伺服器產生 HTML 共用同一組擴充套件，後台看到的就是前台輸出的結構（PRD-005 §3.5）。
// 這裡只放「會影響文件結構與輸出 HTML」的設定；Placeholder 等只在編輯時有用的擴充放在 BlogEditor。
export const blogExtensions = [
  StarterKit.configure({
    heading: { levels: [2, 3] },
    // 程式碼區塊與行內程式碼用不到
    codeBlock: false,
    code: false,
    link: {
      openOnClick: false,
      autolink: true,
      defaultProtocol: 'https',
      protocols: ['mailto', 'tel'],
      HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' },
    },
  }),
  Image.configure({
    inline: false,
    allowBase64: false,
    HTMLAttributes: { loading: 'lazy', decoding: 'async' },
  }),
  Youtube.configure({
    nocookie: true,
    modestBranding: true,
    rel: 0,
    // 實際寬高由 .blog-prose 的 16:9 外框決定
    width: 640,
    height: 360,
    HTMLAttributes: { loading: 'lazy', title: 'YouTube' },
  }),
];
