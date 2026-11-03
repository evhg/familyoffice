// Build-time images: the share image, logo and favicons, all drawn from the module library.
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { Resvg } from '@resvg/resvg-js';
import satori from 'satori';
import { COLOURS, OPENINGS, PITCH, TILE, checker, moduleSvg, type ModuleName } from '../illustrations/modules';

export function svgToPng(svg: string, width: number): Buffer {
  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: width }, background: 'rgba(0,0,0,0)' });
  return resvg.render().asPng();
}

/** The Mark module: Canopy face, Turmeric opening. */
export function markSvg(size: number): string {
  return moduleSvg('mark', size, COLOURS.turmeric);
}

/** An .ico file holding one 32px PNG. */
export function pngToIco(png: Buffer, size: number): Buffer {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);
  const entry = Buffer.alloc(16);
  entry.writeUInt8(size, 0);
  entry.writeUInt8(size, 1);
  entry.writeUInt8(0, 2);
  entry.writeUInt8(0, 3);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(png.length, 8);
  entry.writeUInt32LE(22, 12);
  return Buffer.concat([header, entry, png]);
}

/** A screen wall of openings on Canopy, as an SVG string. */
function wallSvg(cols: number, rows: number, mark: [number, number], unit: number): string {
  let shapes = '';
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const isMark = mark[0] === r && mark[1] === c;
      const name: ModuleName = isMark ? 'mark' : checker(r, c);
      const fill = isMark ? COLOURS.turmeric : COLOURS.plaster;
      shapes += `<path transform="translate(${c * PITCH} ${r * PITCH})" fill="${fill}" fill-rule="evenodd" d="${OPENINGS[name]}"/>`;
    }
  }
  const w = cols * PITCH;
  const h = rows * PITCH;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${(w / PITCH) * unit}" height="${(h / PITCH) * unit}" viewBox="0 0 ${w} ${h}">${shapes}</svg>`;
}

async function font(file: string): Promise<Buffer> {
  return readFile(path.resolve(process.cwd(), 'src/og/fonts', file));
}

/** 1200 x 630 share image: wordmark and headline on Canopy, the hero wall bleeding off the right. */
export async function shareImagePng(): Promise<Buffer> {
  const [heading, wordmark] = await Promise.all([font('archivo-115-600.ttf'), font('archivo-125-600.ttf')]);
  const unit = 96;
  const wall = wallSvg(5, 7, [3, 1], unit);
  const wallUri = `data:image/svg+xml;base64,${Buffer.from(wall).toString('base64')}`;

  const node = {
    type: 'div',
    props: {
      style: {
        width: 1200,
        height: 630,
        display: 'flex',
        position: 'relative',
        backgroundColor: COLOURS.canopy,
        overflow: 'hidden',
      },
      children: [
        {
          type: 'img',
          props: {
            src: wallUri,
            width: 5 * unit,
            height: 7 * unit,
            style: { position: 'absolute', left: 760, top: -24 },
          },
        },
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              left: 72,
              top: 64,
              width: 620,
              height: 502,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              color: COLOURS.plaster,
            },
            children: [
              {
                type: 'div',
                props: { style: { fontFamily: 'Wordmark', fontSize: 40 }, children: 'Verspui' },
              },
              {
                type: 'div',
                props: {
                  style: { fontFamily: 'Heading', fontSize: 62, lineHeight: 1.08, letterSpacing: -0.6 },
                  children: 'A strategic Thai partner in business and real estate.',
                },
              },
            ],
          },
        },
      ],
    },
  };

  const svg = await satori(node as unknown as Parameters<typeof satori>[0], {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Heading', data: heading, weight: 600, style: 'normal' },
      { name: 'Wordmark', data: wordmark, weight: 600, style: 'normal' },
    ],
  });
  return svgToPng(svg, 1200);
}

export { TILE };
