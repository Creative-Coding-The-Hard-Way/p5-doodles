import P5 from "p5";

/**
 * Animate a circle being drawn by lerping the circumfrence.
 *
 * @param p5 the p5 sketch
 * @param cx the x coordinate of the center of the circle
 * @param cy the y coordinate of the center of the circle
 * @param diameter the diameter of the circle
 * @param t the interpolation factor in the range [0, 1]
 * @param direction 1 for positive angular direction, -1 for negative
 */
export function circle_arc_lerp(
  p5: P5,
  cx: number,
  cy: number,
  diameter: number,
  t: number,
  direction?: number
): void {
  let d = direction == undefined ? 0 : direction;
  p5.push();
  p5.translate(cx, cy);
  p5.rotate(d * p5.TWO_PI * t);
  p5.arc(0, 0, diameter, diameter, 0, p5.TWO_PI * t);
  p5.pop();
}

/**
 * Animate a line being drawn by lerping from the start point to the endpoint.
 *
 * @param p5 the p5 sketch
 * @param sx the starting x coordinate
 * @param sy the starting y coordinate
 * @param ex the ending x coordinate
 * @param ey the ending y coordinate
 * @param t the interpolation factor
 */
export function line_lerp(
  p5: P5,
  sx: number,
  sy: number,
  ex: number,
  ey: number,
  t: number
): void {
  const dx = ex - sx;
  const dy = ey - sy;
  p5.line(sx, sy, sx + t * dx, sy + t * dy);
}
