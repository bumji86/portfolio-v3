'use client';
import { useTranslations } from 'next-intl';
import Media from './Media';
import { useModal } from './modal-context';
import type { ProjectMedia } from '@/content/home';


export type { ProjectMedia };

export type Project = {
  title: string;
  image: string | null;
  desc?: string;
  tags: string[];
  body?: string[]; // paragraphs; lorem ipsum until real copy exists
  media?: (ProjectMedia | null)[]; // null = placeholder slot; [] = no reference row
  builtWith?: string[]; // tools/stack chips under the tags
  tools?: { name: string; desc: string; link?: string }[]; // sub-projects listed after the body
};

const LOREM = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
];

export function ProjectBody({ project }: { project: Project }) {
  const { title, image, desc, tags, body = LOREM, media = [null, null], builtWith, tools } = project;
  const t = useTranslations('home.works');

  return (
    <article className="px-6 pt-10 pb-14 md:px-12 md:pt-12 md:pb-24">
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

      {builtWith && builtWith.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
          {builtWith.map((b) => (
            <span key={b} className="rounded-full border border-neutral-300 px-3 py-1 text-neutral-700 dark:border-neutral-700 dark:text-neutral-300">
              {b}
            </span>
          ))}
        </div>
      )}

      <hr className="mt-6 border-neutral-200 dark:border-neutral-800" />

      <div className="mt-6 space-y-6 text-[15px] leading-7 text-neutral-700 dark:text-neutral-300">
        {body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {tools && tools.length > 0 && (
        <div className="mt-8 divide-y divide-neutral-200 border-t border-neutral-200 dark:divide-neutral-800 dark:border-neutral-800">
          {tools.map((tool) => (
            <section key={tool.name} className="py-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-lg font-semibold tracking-tight">{tool.name}</h3>
                {tool.link && (
                  <a
                    href={tool.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-neutral-500 hover:text-neutral-900 hover:underline dark:text-neutral-400 dark:hover:text-white"
                  >
                    {t('visit')} ↗
                  </a>
                )}
              </div>
              <p className="mt-2 text-[15px] leading-7 text-neutral-700 dark:text-neutral-300">{tool.desc}</p>
            </section>
          ))}
        </div>
      )}

      {media.length > 0 && (
        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {media.map((m, i) => (
            // with an odd count the first item spans the full row (e.g. a lead video above two photos)
            <div key={i} className={media.length % 2 === 1 && i === 0 ? 'sm:col-span-2' : ''}>
              <ReferenceMedia media={m} />
            </div>
          ))}
        </div>
      )}
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
  const { openProject } = useModal();
  return (
    <button
      type="button"
      onClick={() => openProject(project)}
      aria-label={project.title}
      aria-haspopup="dialog"
      className="absolute inset-0 z-10 cursor-pointer rounded-[inherit] focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none focus-visible:ring-inset"
    />
  );
}
