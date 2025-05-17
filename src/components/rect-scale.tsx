import type { MouseEvent } from 'react';
import { useState, useRef, useCallback, useLayoutEffect } from 'react';


type Point = {x: number, y: number};
type Rect = [Point, Point];

const width = 640;
const height = 360;
const ratio = 2;

export const RectScale = () => {
  const ref = useRef<HTMLCanvasElement>();
  const onMove = useRef(false);

  const [k, setK] = useState(1.5);
  const [point, setPoint] = useState<Point>({x: 50, y: 50});

  useLayoutEffect(() => {
    ref.current.width = width * ratio;
    ref.current.height = height * ratio;
  }, []);

  useLayoutEffect(() => {
    const ctx = ref.current.getContext('2d');
    draw(ctx, point, k);
  }, [point, k]);

  const onMouseDown = () => {
    onMove.current = true;
  };
  const onMouseUp = () => {
    onMove.current = false;
  };
  const onMouseMove = (e: MouseEvent) => {
    if (!onMove.current) return;
    const { offsetX, offsetY } = e.nativeEvent;
    setPoint({x: offsetX, y: offsetY});
  };
  const onClick = (e: MouseEvent) => {
    const { offsetX, offsetY } = e.nativeEvent;
    setPoint({x: offsetX, y: offsetY});
  };

  const onWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const delta = e.deltaY > 0 ? 0.1 : -0.1;
    setK(value => value + delta);
  }, []);

  useLayoutEffect(() => {
    ref.current.addEventListener('wheel', onWheel, {passive: false});
    return () => ref.current.removeEventListener('wheel', onWheel);
  }, [onWheel]);

  return (
    <canvas
      ref={ref} style={{width, height, borderRadius: 4}}
      onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseLeave={onMouseUp}
      onMouseMove={onMouseMove} onClick={onClick}
    />
  );
};

function draw(ctx: CanvasRenderingContext2D, point: Point, k: number): void {
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  ctx.lineWidth = 0.5;
  ctx.fillStyle = '#202027';
  ctx.fillRect(0, 0, width, height);

  const rect: Rect = [{x: 100, y: 100}, {x: 260, y: 190}];
  drawRect(ctx, rect, '#6aab81', 0.75);
  const tRect = transformRectWithOrigin(rect, point, k);
  drawRect(ctx, tRect, '#71ab6a', 0.75);

  ctx.lineWidth = 1;
  ctx.strokeStyle = '#d1d1d1';
  ctx.setLineDash([4, 4]);
  drawLine(ctx, rect[0], tRect[0]);
  drawLine(ctx, {x: rect[1].x, y: rect[0].y}, {x: tRect[1].x, y: tRect[0].y});
  drawLine(ctx, {x: rect[0].x, y: rect[1].y}, {x: tRect[0].x, y: tRect[1].y});
  drawLine(ctx, rect[1], tRect[1]);

  ctx.setLineDash([]);
  drawPoint(ctx, point, 4, '#d1d1d1');
}

function drawRect(ctx: CanvasRenderingContext2D, rect: Rect, color: string, alpha?: number): void {
  const [p1, p2] = rect;
  const width = p2.x - p1.x;
  const height = p2.y - p1.y;

  if (alpha) ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.fillRect(p1.x, p1.y, width, height);
  if (alpha) ctx.globalAlpha = 1;

  ctx.strokeStyle = '#d1d1d1';
  ctx.strokeRect(p1.x, p1.y, width, height);
  drawPoint(ctx, p1, 2, '#d1d1d1');
  drawPoint(ctx, {x: p1.x + width, y: p1.y}, 2, '#d1d1d1');
  drawPoint(ctx, p2, 2, '#d1d1d1');
  drawPoint(ctx, {x: p1.x, y: p1.y + height}, 2, '#d1d1d1');
}

function drawPoint(ctx: CanvasRenderingContext2D, point: Point, r: number, color: string): void {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(point.x, point.y, r,0, 2 * Math.PI);
  ctx.fill();
}

function drawLine(ctx: CanvasRenderingContext2D, p1: Point, p2: Point): void {
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.stroke();
}

function transformRectWithOrigin(rect: Rect, origin: Point, k: number): Rect {
  const [p1, p2] = rect;
  const { x, y } = origin;

  return [
    {x: k * (p1.x - x) + x, y: k * (p1.y - y) + y},
    {x: k * (p2.x - x) + x, y: k * (p2.y - y) + y},
  ];
}
