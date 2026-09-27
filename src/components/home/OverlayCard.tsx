import Media from './Media';
import Tag from './Tag';
import { OpenProjectButton } from './ProjectModal';

type Props = {
  image: string | null;
  title: string;
  desc?: string;
  tags: string[];
  sizes: string;
  size?: 'lg' | 'sm';
  className?: string; // sizing/aspect of the card box
};

// Image card with the title laid over it. On hover (keyboard focus, or always on touch screens)
// the image zooms and darkens top→bottom while the description and tags slide up.
// `reveal:` is a custom variant defined in app/globals.css. Clicking the card opens the project modal.
export default function OverlayCard({ image, title, desc, tags, sizes, size = 'lg', className = '' }: Props) {
  const lg = size === 'lg';

  return (
    <div className={`group relative isolate overflow-hidden ${className}`}>
      <Media
        src={image}
        alt={title}
        sizes={sizes}
        className="h-full w-full"
        imgClassName="transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none"
      />

      {/* light base scrim so the title reads on bright images */}
      <div className="absolute inset-0 bg-linear-to-t from-black/45 via-black/0 via-45% to-transparent" />
      {/* reveal scrim: light at the top, darker toward the bottom */}
      <div className="absolute inset-0 bg-linear-to-b from-black/5 via-black/35 to-black/80 opacity-0 transition-opacity duration-300 ease-out reveal:opacity-100 motion-reduce:transition-none" />

      <div className={`absolute inset-x-0 bottom-0 text-white ${lg ? 'p-6' : 'p-4'}`}>
        <h3 className={`font-semibold drop-shadow-sm ${lg ? 'text-xl tracking-wide md:text-[22px]' : 'text-base md:text-lg'}`}>
          {title}
        </h3>

        {/* 0fr → 1fr row lets the details take no space until revealed, pushing the title up smoothly */}
        <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-400 ease-out reveal:grid-rows-[1fr] motion-reduce:transition-none">
          <div className="overflow-hidden">
            <div className="translate-y-4 opacity-0 transition duration-400 ease-out reveal:translate-y-0 reveal:opacity-100 motion-reduce:transition-none">
              {desc && <p className={`text-white/85 ${lg ? 'pt-2 text-sm' : 'pt-1.5 text-xs'}`}>{desc}</p>}
              <div className={`flex flex-wrap ${lg ? 'gap-2 pt-3' : 'gap-1.5 pt-2'}`}>
                {tags.map((tag) => (
                  <Tag key={tag} size={lg ? 'md' : 'sm'}>
                    {tag}
                  </Tag>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <OpenProjectButton project={{ title, image, desc, tags }} />
    </div>
  );
}
