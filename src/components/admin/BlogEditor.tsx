'use client';

import { useRef, useState } from 'react';
import { EditorContent, useEditor, useEditorState, type Editor } from '@tiptap/react';
import type { JSONContent } from '@tiptap/core';
import { Placeholder } from '@tiptap/extensions';
import {
  Bold, Heading2, Heading3, ImagePlus, Italic, Link2, List, ListOrdered, Loader2, Minus, Quote,
  Redo2, Strikethrough, Type, Underline, Undo2, Youtube,
} from 'lucide-react';
import { blogExtensions } from '../../../lib/blog/extensions';
import { imageFilesFrom, uploadImage } from './uploadImage';

// 文章編輯器（PRD-005 §2 #3）：Tiptap 所見即所得。內容區套用 .blog-prose，和前台文章頁同一份樣式。
// 圖片可以按工具列上傳、拖放或貼上；YouTube 貼上網址就會變成嵌入影片（也可以按工具列）。

const isSafeHref = (href: string) => /^(https?:|mailto:|tel:|\/(?!\/)|#)/i.test(href.trim());

interface BlogEditorProps {
  initialContent: JSONContent | null;
  onChange: (content: JSONContent) => void;
}

function ToolButton({ label, active, disabled, onClick, children }: { label: string; active?: boolean; disabled?: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      // 按工具列時不要讓編輯區失去選取範圍
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
      className="inline-flex size-9 items-center justify-center rounded-lg text-card-foreground transition-colors hover:bg-accent/60 disabled:opacity-40 aria-pressed:bg-accent aria-pressed:text-primary-foreground"
    >
      {children}
    </button>
  );
}

const Divider = () => <span aria-hidden="true" className="mx-1 h-6 w-px bg-border" />;

function Toolbar({ editor, uploading, onPickImage }: { editor: Editor; uploading: boolean; onPickImage: () => void }) {
  const state = useEditorState({
    editor,
    selector: ({ editor: e }) => ({
      h2: e.isActive('heading', { level: 2 }),
      h3: e.isActive('heading', { level: 3 }),
      bold: e.isActive('bold'),
      italic: e.isActive('italic'),
      underline: e.isActive('underline'),
      strike: e.isActive('strike'),
      link: e.isActive('link'),
      bullet: e.isActive('bulletList'),
      ordered: e.isActive('orderedList'),
      quote: e.isActive('blockquote'),
      image: e.isActive('image'),
      canUndo: e.can().undo(),
      canRedo: e.can().redo(),
    }),
  });

  function setLink() {
    const previous = editor.getAttributes('link').href ?? '';
    const href = window.prompt('連結網址（留空代表移除連結）', previous);
    if (href === null) return;
    if (!href.trim()) {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    if (!isSafeHref(href)) {
      window.alert('只接受 https://、mailto:、tel: 或站內路徑（/ 開頭）');
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: href.trim() }).run();
  }

  function addYoutube() {
    const src = window.prompt('YouTube 影片網址');
    if (!src) return;
    if (!editor.chain().focus().setYoutubeVideo({ src: src.trim() }).run()) {
      window.alert('不是有效的 YouTube 網址');
    }
  }

  function setAlt() {
    const alt = window.prompt('圖片的替代文字（給看不到圖片的讀者與搜尋引擎）', editor.getAttributes('image').alt ?? '');
    if (alt !== null) editor.chain().focus().updateAttributes('image', { alt: alt.trim() }).run();
  }

  return (
    <div className="sticky top-[61px] z-10 flex flex-wrap items-center gap-0.5 rounded-t-[18px] border-b border-border bg-popover/95 px-2 py-1.5 backdrop-blur">
      <ToolButton label="復原" disabled={!state.canUndo} onClick={() => editor.chain().focus().undo().run()}>
        <Undo2 className="size-4" />
      </ToolButton>
      <ToolButton label="重做" disabled={!state.canRedo} onClick={() => editor.chain().focus().redo().run()}>
        <Redo2 className="size-4" />
      </ToolButton>
      <Divider />
      <ToolButton label="大標題" active={state.h2} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
        <Heading2 className="size-4" />
      </ToolButton>
      <ToolButton label="小標題" active={state.h3} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
        <Heading3 className="size-4" />
      </ToolButton>
      <Divider />
      <ToolButton label="粗體" active={state.bold} onClick={() => editor.chain().focus().toggleBold().run()}>
        <Bold className="size-4" />
      </ToolButton>
      <ToolButton label="斜體" active={state.italic} onClick={() => editor.chain().focus().toggleItalic().run()}>
        <Italic className="size-4" />
      </ToolButton>
      <ToolButton label="底線" active={state.underline} onClick={() => editor.chain().focus().toggleUnderline().run()}>
        <Underline className="size-4" />
      </ToolButton>
      <ToolButton label="刪除線" active={state.strike} onClick={() => editor.chain().focus().toggleStrike().run()}>
        <Strikethrough className="size-4" />
      </ToolButton>
      <ToolButton label="連結" active={state.link} onClick={setLink}>
        <Link2 className="size-4" />
      </ToolButton>
      <Divider />
      <ToolButton label="項目清單" active={state.bullet} onClick={() => editor.chain().focus().toggleBulletList().run()}>
        <List className="size-4" />
      </ToolButton>
      <ToolButton label="編號清單" active={state.ordered} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        <ListOrdered className="size-4" />
      </ToolButton>
      <ToolButton label="引言" active={state.quote} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
        <Quote className="size-4" />
      </ToolButton>
      <ToolButton label="分隔線" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <Minus className="size-4" />
      </ToolButton>
      <Divider />
      <ToolButton label="上傳圖片" disabled={uploading} onClick={onPickImage}>
        {uploading ? <Loader2 className="size-4 animate-spin" /> : <ImagePlus className="size-4" />}
      </ToolButton>
      <ToolButton label="嵌入 YouTube" onClick={addYoutube}>
        <Youtube className="size-4" />
      </ToolButton>
      {state.image && (
        <button
          type="button"
          onMouseDown={(event) => event.preventDefault()}
          onClick={setAlt}
          className="ml-1 inline-flex h-9 items-center gap-1 rounded-lg border border-border px-2.5 text-sm font-semibold text-accent-foreground hover:bg-accent/60"
        >
          <Type className="size-4" aria-hidden="true" />
          替代文字
        </button>
      )}
    </div>
  );
}

export default function BlogEditor({ initialContent, onChange }: BlogEditorProps) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  // 上傳多張圖片，依序插入到 pos（沒給就是目前游標位置）
  async function insertImages(editor: Editor, files: File[], pos?: number) {
    if (!files.length) return;
    setUploading(true);
    setError('');
    try {
      let at = pos;
      for (const file of files) {
        const { url } = await uploadImage(file);
        const node = editor.schema.nodes.image.create({ src: url, alt: '' });
        if (at === undefined) {
          editor.chain().focus().insertContent({ type: 'image', attrs: { src: url, alt: '' } }).run();
        } else {
          editor.view.dispatch(editor.state.tr.insert(at, node));
          at += node.nodeSize;
        }
      }
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : '上傳失敗');
    } finally {
      setUploading(false);
    }
  }

  const editor = useEditor({
    extensions: [...blogExtensions, Placeholder.configure({ placeholder: '開始寫文章…（可以直接拖放或貼上圖片、貼上 YouTube 網址）' })],
    content: initialContent ?? '',
    immediatelyRender: false,
    editorProps: {
      attributes: { class: 'blog-prose min-h-[28rem] px-5 py-5 focus:outline-none sm:px-8', 'aria-label': '文章內容' },
      handlePaste: (_view, event) => {
        const files = imageFilesFrom(event.clipboardData?.files);
        if (!files.length || !editorRef.current) return false;
        void insertImages(editorRef.current, files);
        return true;
      },
      handleDrop: (view, event, _slice, moved) => {
        const files = moved ? [] : imageFilesFrom(event.dataTransfer?.files);
        if (!files.length || !editorRef.current) return false;
        event.preventDefault();
        const pos = view.posAtCoords({ left: event.clientX, top: event.clientY })?.pos;
        void insertImages(editorRef.current, files, pos);
        return true;
      },
    },
    onUpdate: ({ editor: e }) => onChange(e.getJSON()),
  });
  // editorProps 的處理函式在 useEditor 之前建立，用 ref 拿到編輯器
  const editorRef = useRef<Editor | null>(null);
  editorRef.current = editor;

  return (
    <div className="rounded-[18px] border border-border bg-stage">
      {editor ? <Toolbar editor={editor} uploading={uploading} onPickImage={() => fileInput.current?.click()} /> : <div className="h-12 rounded-t-[18px] border-b border-border bg-popover" />}
      {error && (
        <p role="alert" className="border-b border-border bg-popover px-5 py-2 text-sm text-destructive">
          {error}
        </p>
      )}
      <EditorContent editor={editor} />
      <input
        ref={fileInput}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        multiple
        hidden
        onChange={(event) => {
          if (editor) void insertImages(editor, imageFilesFrom(event.target.files));
          event.target.value = '';
        }}
      />
    </div>
  );
}
