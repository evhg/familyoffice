/**
 * The breeze-block library.
 *
 * Every module is drawn on a 120 x 120 unit tile: a solid border 10 units wide,
 * openings inside the 100 x 100 face. Modules sit on a 126 unit pitch (a 6 unit joint).
 * Each module is described only by its openings, as one SVG path drawn with
 * fill-rule: evenodd. From that we get both renderings:
 *   - on Plaster: the face in Canopy with the openings cut out (see facePath)
 *   - on Canopy (the hero): only the openings, in Plaster
 */

export const TILE = 120;
export const BORDER = 10;
export const JOINT = 6;
export const PITCH = TILE + JOINT;

/** Thickness of the solid webs between openings inside a module. */
const WEB = 8;
const C = TILE / 2;

export type ModuleName = 'ring' | 'petal' | 'diamond' | 'step' | 'wave' | 'mark' | 'caveman';

export const MODULE_NAMES: ModuleName[] = ['ring', 'petal', 'diamond', 'step', 'wave', 'mark', 'caveman'];

const n = (v: number) => Number(v.toFixed(3)).toString();

/** Rotate a point about the centre of the tile by a multiple of 90 degrees. */
function rot(x: number, y: number, quarterTurns: number): [number, number] {
  let dx = x - C;
  let dy = y - C;
  for (let i = 0; i < quarterTurns; i++) [dx, dy] = [-dy, dx];
  return [C + dx, C + dy];
}

function polygon(points: [number, number][]): string {
  return 'M' + points.map(([x, y]) => `${n(x)} ${n(y)}`).join('L') + 'Z';
}

function square(inset: number): string {
  const a = inset;
  const b = TILE - inset;
  return polygon([
    [a, a],
    [b, a],
    [b, b],
    [a, b],
  ]);
}

/** 1. Ring: one circular opening, diameter 84, centred. */
function ring(): string {
  const r = 42;
  return `M${n(C - r)} ${n(C)}A${r} ${r} 0 1 0 ${n(C + r)} ${n(C)}A${r} ${r} 0 1 0 ${n(C - r)} ${n(C)}Z`;
}

/**
 * 2. Petal: the classic four-petal block. Each petal is a lens between two quarter-circle
 * arcs, centred on the middles of two neighbouring edges of the face, running from the
 * centre of the tile to a corner. The arcs are pulled in by half a web so the petals
 * stay clear of each other and of the border.
 */
function petal(): string {
  const half = (TILE - 2 * BORDER) / 2; // 50: radius of the full quarter-circle on the face
  const r = half - WEB / 2; // 46
  // Arcs centred on (C, BORDER) and (BORDER, C) meet on the diagonal x = y.
  // (x - C)^2 + (x - BORDER)^2 = r^2
  const s = C + BORDER; // 70
  const disc = Math.sqrt(s * s - 2 * (C * C + BORDER * BORDER - r * r));
  const tip = (s - disc) / 2; // near the corner
  const mid = (s + disc) / 2; // near the centre
  let d = '';
  for (let q = 0; q < 4; q++) {
    const [x1, y1] = rot(tip, tip, q);
    const [x2, y2] = rot(mid, mid, q);
    d += `M${n(x1)} ${n(y1)}A${n(r)} ${n(r)} 0 0 0 ${n(x2)} ${n(y2)}A${n(r)} ${n(r)} 0 0 0 ${n(x1)} ${n(y1)}Z`;
  }
  return d;
}

/**
 * 3. Diamond: a square set at 45 degrees with its points on the middle of each inner edge.
 * The diamond's outline is a solid web; the openings are the diamond inside it and the
 * four triangles left in the corners.
 */
function diamond(): string {
  const inner = TILE / 2 - BORDER; // 50: half-diagonal of the diamond
  const off = (WEB / 2) * Math.SQRT2; // offset in |x| + |y| for a web of WEB
  const k = inner - off;
  const a = BORDER;
  const b = TILE - BORDER;
  let d = polygon([
    [C, C - k],
    [C + k, C],
    [C, C + k],
    [C - k, C],
  ]);
  const t = inner - off; // leg of each corner triangle
  d += polygon([
    [a, a],
    [a + t, a],
    [a, a + t],
  ]);
  d += polygon([
    [b, a],
    [b, a + t],
    [b - t, a],
  ]);
  d += polygon([
    [b, b],
    [b - t, b],
    [b, b - t],
  ]);
  d += polygon([
    [a, b],
    [a, b - t],
    [a + t, b],
  ]);
  return d;
}

/** 4. Step: three nested square openings stepping inwards, like a stack of frames. */
function step(): string {
  // From the face edge inwards: opening 12, web 8, opening 12, web 8, opening 20 square.
  const o = 12;
  const e1 = BORDER;
  const e2 = e1 + o;
  const e3 = e2 + WEB;
  const e4 = e3 + o;
  const e5 = e4 + WEB;
  return square(e1) + square(e2) + square(e3) + square(e4) + square(e5);
}

/** 5. Wave: two half-circle openings back to back and offset, forming an S. */
function wave(): string {
  const r = 34;
  const top = C - WEB / 2; // flat side of the upper half-circle
  const bottom = C + WEB / 2; // flat side of the lower half-circle
  const x1 = BORDER + r; // upper half-circle sits to the left
  const x2 = TILE - BORDER - r; // lower half-circle sits to the right
  return (
    `M${n(x1 - r)} ${n(top)}A${r} ${r} 0 0 1 ${n(x1 + r)} ${n(top)}Z` +
    `M${n(x2 + r)} ${n(bottom)}A${r} ${r} 0 0 1 ${n(x2 - r)} ${n(bottom)}Z`
  );
}

/** 6. Mark: a wide V. The Verspui mark. */
function mark(): string {
  const yTop = 28;
  const yBottom = 92;
  const outer = 14; // outer top corner, from the tile edge
  const arm = 23; // horizontal width of each arm
  const foot = 11; // half-width of the flat foot of the V
  const slope = (yBottom - yTop) / (C - foot - outer);
  const innerY = yTop + slope * (C - (outer + arm));
  return polygon([
    [outer, yTop],
    [outer + arm, yTop],
    [C, innerY],
    [TILE - outer - arm, yTop],
    [TILE - outer, yTop],
    [C + foot, yBottom],
    [C - foot, yBottom],
  ]);
}

/**
 * 7. Caveman: Paleo Robbie's caveman face, redrawn as a block. The opening is the face:
 * a jagged fringe of hair across the top, straight sides and a round jaw. The two eyes are
 * left solid inside it. Used only for Paleo Robbie in Track record.
 */
function caveman(): string {
  const left = 20;
  const right = TILE - left; // 100
  const jawY = 64; // centre of the round jaw
  const r = (right - left) / 2; // 40: jaw radius, so the chin sits at 104, inside the border
  // The hairline: three pointed tufts of hair hang down over the forehead.
  const top = 30;
  const tuft = (x: number, depth: number): [number, number][] => [
    [x - 6, top],
    [x, top + depth],
    [x + 6, top],
  ];
  const fringe: [number, number][] = [
    [left, jawY - 10],
    [left, top + 4],
    [left + 4, top],
    ...tuft(40, 16),
    ...tuft(60, 18),
    ...tuft(80, 16),
    [right - 4, top],
    [right, top + 4],
  ];
  const face =
    'M' +
    fringe.map(([x, y]) => `${n(x)} ${n(y)}`).join('L') +
    `L${n(right)} ${n(jawY)}A${n(r)} ${n(r)} 0 0 1 ${n(left)} ${n(jawY)}Z`;
  const eye = (cx: number, cy: number, er: number) =>
    `M${n(cx - er)} ${n(cy)}A${er} ${er} 0 1 0 ${n(cx + er)} ${n(cy)}A${er} ${er} 0 1 0 ${n(cx - er)} ${n(cy)}Z`;
  return face + eye(44, 66, 7) + eye(76, 66, 7);
}

export const OPENINGS: Record<ModuleName, string> = {
  ring: ring(),
  petal: petal(),
  diamond: diamond(),
  step: step(),
  wave: wave(),
  mark: mark(),
  caveman: caveman(),
};

/** The block face: the whole tile, with the openings cut out (fill-rule: evenodd). */
export function facePath(name: ModuleName): string {
  return `M0 0H${TILE}V${TILE}H0Z` + OPENINGS[name];
}

export const MODULE_LABELS: Record<ModuleName, string> = {
  ring: 'Ring',
  petal: 'Petal',
  diamond: 'Diamond',
  step: 'Step',
  wave: 'Wave',
  mark: 'Mark',
  caveman: 'Caveman (Paleo Robbie)',
};

/** Hex values for illustrations rendered outside CSS (share image, favicon, logo). */
export const COLOURS = {
  canopy: '#1F3A2E',
  plaster: '#E4E4DA',
  turmeric: '#D7A23F',
} as const;

/** A standalone module as an SVG document: Canopy face, openings in the given colour. */
export function moduleSvg(name: ModuleName, size: number, openingColour: string = COLOURS.turmeric): string {
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${TILE} ${TILE}">` +
    `<rect width="${TILE}" height="${TILE}" fill="${COLOURS.canopy}"/>` +
    `<path fill="${openingColour}" fill-rule="evenodd" d="${OPENINGS[name]}"/>` +
    `</svg>`
  );
}

/** Ring and Petal in a checkerboard, as the hero wall uses them. */
export function checker(row: number, col: number): ModuleName {
  return (((row + col) % 2) + 2) % 2 === 0 ? 'ring' : 'petal';
}
