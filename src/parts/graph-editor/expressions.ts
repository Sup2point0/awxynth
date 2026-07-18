export enum Id {
  SHAPER        = "shaper",
  SHAPER_RENDER = "shaper-render",
  SHAPER_FILL   = "shaper-fill",
}

/** Is `expr` the shaper function we want from the user? */
export function is_shaper(expr: Desmos.ExpressionState): boolean
{
  const SHAPER_LATEX_FORMAT = /[a-z] *(\\left)?\( *[a-z] *(\\right)?\)/;

  return Boolean(
    expr.id === Id.SHAPER && expr?.latex?.length
    || expr?.latex?.match(SHAPER_LATEX_FORMAT)?.length
  );
}
