export interface GraphBounds
{
  // NOTE: Desmos doesn't (currently) support LaTeX in viewport bounds, so we'll need to store actual numbers
  x: [lower: number, upper: number];
  y: [lower: number, upper: number];
  
  x_pi?: boolean;
  y_pi?: boolean;

  /** Should a bit of extra padding be applied to the y-axis to prevent the extremes of the graph from touching the viewport edges? */
  pad_y?: boolean;
}
