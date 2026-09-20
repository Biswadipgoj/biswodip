import { headingMarkup } from '@/lib/motion-markup';

/** Readable server output with an aria-hidden visual copy for individual glyph motion. */
export function AnimatedText({ children, className = '' }: { children: string; className?: string }) {
  return <span className={'animated-text ' + className} data-type="heading">
    <span className="sr-only">{children}</span>
    <span aria-hidden="true" data-motion-visual dangerouslySetInnerHTML={{ __html: headingMarkup(children) }}/>
  </span>;
}
