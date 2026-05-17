import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { PhysicsFigure } from './PhysicsFigure';

const childSvg = (
  <svg data-testid="svg" viewBox="0 0 100 100">
    <rect width="100" height="100" />
  </svg>
);

describe('PhysicsFigure', () => {
  it('hero variant carries the 700px max-width class', () => {
    const { container } = render(<PhysicsFigure variant="hero">{childSvg}</PhysicsFigure>);
    const figure = container.querySelector('figure');
    expect(figure?.className).toMatch(/max-w-\[700px\]/);
    expect(figure?.getAttribute('data-figure-variant')).toBe('hero');
  });

  it('plate variant carries the 1100px max-width class', () => {
    const { container } = render(<PhysicsFigure variant="plate">{childSvg}</PhysicsFigure>);
    const figure = container.querySelector('figure');
    expect(figure?.className).toMatch(/max-w-\[1100px\]/);
    expect(figure?.getAttribute('data-figure-variant')).toBe('plate');
  });

  it('inline variant carries the 320px max-width class', () => {
    const { container } = render(<PhysicsFigure variant="inline">{childSvg}</PhysicsFigure>);
    const figure = container.querySelector('figure');
    expect(figure?.className).toMatch(/max-w-\[320px\]/);
    expect(figure?.getAttribute('data-figure-variant')).toBe('inline');
  });

  it('default variant is hero', () => {
    const { container } = render(<PhysicsFigure>{childSvg}</PhysicsFigure>);
    expect(container.querySelector('figure')?.getAttribute('data-figure-variant')).toBe('hero');
  });

  it('renders a figcaption when caption is provided', () => {
    const { container } = render(
      <PhysicsFigure caption={{ ar: 'تعليق', he: 'הערה', en: 'A caption' }}>
        {childSvg}
      </PhysicsFigure>,
    );
    expect(container.querySelector('figcaption')).not.toBeNull();
    expect(container.textContent).toContain('A caption');
    expect(container.textContent).toContain('تعليق');
  });

  it('omits the figcaption block when no caption / number / source is given', () => {
    const { container } = render(<PhysicsFigure>{childSvg}</PhysicsFigure>);
    expect(container.querySelector('figcaption')).toBeNull();
  });

  it('renders figure number and source note', () => {
    const { container } = render(
      <PhysicsFigure figureNumber="Fig. 3" sourceNote="after Halliday">
        {childSvg}
      </PhysicsFigure>,
    );
    expect(container.textContent).toContain('Fig. 3');
    expect(container.textContent).toContain('after Halliday');
  });
});
