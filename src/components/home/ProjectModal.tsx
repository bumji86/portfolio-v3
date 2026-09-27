'use client';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import Media from './Media';

// A reference slot at the bottom of the modal: image, self-hosted video, or an embed (e.g. YouTube).
export type ProjectMedia =
  | { type: 'image'; src: string; alt?: string }
  | { type: 'video'; src: string; poster?: string }
  | { type: 'embed'; src: string; title?: string };

export type Project = {
  title: string;
  image: string | null;
  desc?: string;
  tags: string[];
  body?: string[]; // paragraphs; lorem ipsum until real copy exists
  media?: (ProjectMedia | null)[]; // null = placeholder
};

const LOREM = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
];

const ModalContext = createContext<(project: Project) => void>(() => {});

export function useOpenProject() {
  return useContext(ModalContext);
}

// Provides `useOpenProject()` to the cards and renders the single shared <dialog>.
// <dialog>.showModal() gives us the top layer, Escape-to-close and focus containment for free.
export function ProjectModalProvider({ children }: { children: React.ReactNode }) {
  const [project, setProject] = useState<Project | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dialog.current;
    if (!d || !project) return;
    d.showModal();
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = 'hidden';
    return () => {
      root.style.overflow = prev;
    };
  }, [project]);

  const close = () => dialog.current?.close();

  return (
    <ModalContext value={setProject}>
      {children}
      <dialog
        ref={dialog}
        onClose={() => setProject(null)}
        // a click that lands on the <dialog> itself (not its content) is a backdrop click
        onClick={(e) => e.target === e.currentTarget && close()}
        aria-labelledby="project-modal-title"
        className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-[960px] overflow-hidden rounded-[20px] bg-white p-0 text-neutral-900 shadow-2xl backdrop:bg-black/50 open:animate-modal-in motion-reduce:open:animate-none dark:bg-neutral-900 dark:text-neutral-100"
      >
        {project && (
          <>
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/90 text-neutral-800 shadow-sm backdrop-blur transition-colors hover:bg-neutral-100 md:top-5 md:right-5 dark:bg-neutral-800/90 dark:text-neutral-200 dark:hover:bg-neutral-700"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
            <div className="max-h-[calc(100dvh-2rem)] overflow-y-auto overscroll-contain px-6 pt-10 pb-14 md:px-12 md:pt-12 md:pb-24">
              <ProjectBody project={project} />
            </div>
          </>
        )}
      </dialog>
    </ModalContext>
  );
}

function ProjectBody({ project }: { project: Project }) {
  const { title, image, desc, tags, body = LOREM, media = [null, null] } = project;

  return (
    <article>
      <h2 id="project-modal-title" className="pr-10 text-2xl font-bold tracking-tight md:text-[32px]">
        {title}
      </h2>

      <Media src={image} alt={title} sizes="(min-width: 1024px) 864px, 100vw" className="mt-6 aspect-[864/400] rounded-xl" />

      <p className="mt-6 text-neutral-500 dark:text-neutral-400">{desc ?? 'One-line summary of the project goes here.'}</p>

      <ul className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <li key={tag} className="rounded-full bg-neutral-900 px-3 py-1 text-xs font-medium text-white dark:bg-white dark:text-neutral-900">
            {tag}
          </li>
        ))}
      </ul>

      <hr className="mt-6 border-neutral-200 dark:border-neutral-800" />

      <div className="mt-6 space-y-6 text-[15px] leading-7 text-neutral-700 dark:text-neutral-300">
        {body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <div className="mt-14 grid gap-4 sm:grid-cols-2">
        {media.map((m, i) => (
          <ReferenceMedia key={i} media={m} />
        ))}
      </div>
    </article>
  );
}

function ReferenceMedia({ media }: { media: ProjectMedia | null }) {
  const box = 'relative aspect-video overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-800';
  if (!media) return <div className={box} aria-hidden />;
  if (media.type === 'image') {
    return <Media src={media.src} alt={media.alt ?? ''} sizes="(min-width: 640px) 424px, 100vw" className="aspect-video rounded-lg" />;
  }
  if (media.type === 'video') {
    return (
      <div className={box}>
        <video src={media.src} poster={media.poster} controls playsInline className="h-full w-full object-cover" />
      </div>
    );
  }
  return (
    <div className={box}>
      <iframe
        src={media.src}
        title={media.title ?? 'Embedded video'}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}

// Stretched, invisible button that makes a whole card open the modal.
export function OpenProjectButton({ project }: { project: Project }) {
  const open = useOpenProject();
  return (
    <button
      type="button"
      onClick={() => open(project)}
      aria-label={project.title}
      aria-haspopup="dialog"
      className="absolute inset-0 z-10 cursor-pointer rounded-[inherit] focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none focus-visible:ring-inset"
    />
  );
}
