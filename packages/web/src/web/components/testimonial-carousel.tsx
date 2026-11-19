import { Children, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function TestimonialCarousel({ children }: { children: ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const count = Children.count(children);
  function go(index: number) {
    const next = (index + count) % count;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.current?.scrollTo({
      left: next * track.current.clientWidth,
      behavior: reduced ? "instant" : "smooth",
    });
  }
  return (
    <section
      className="testimonial-carousel"
      aria-label="Client testimonials"
      aria-roledescription="carousel"
    >
      <div
        className="testimonial-track"
        ref={track}
        onScroll={() => {
          if (track.current)
            setActive(Math.round(track.current.scrollLeft / track.current.clientWidth));
        }}
      >
        {Children.map(children, (child, index) => (
          <section
            className="testimonial-slide"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${count}`}
          >
            {child}
          </section>
        ))}
      </div>
      <div className="testimonial-controls">
        <button type="button" onClick={() => go(active - 1)} aria-label="Previous testimonial">
          <ChevronLeft size={20} />
        </button>
        <div className="testimonial-dots">
          {Array.from({ length: count }, (_, index) => (
            <button
              type="button"
              key={index}
              className={index === active ? "selected" : ""}
              aria-label={`Show testimonial ${index + 1}`}
              aria-pressed={index === active}
              onClick={() => go(index)}
            />
          ))}
        </div>
        <span className="testimonial-counter" aria-live="polite" aria-atomic="true">
          {active + 1} / {count}
        </span>
        <button type="button" onClick={() => go(active + 1)} aria-label="Next testimonial">
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}
