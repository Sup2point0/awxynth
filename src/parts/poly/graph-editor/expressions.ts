import type { Latex } from "#scripts/types";


export const INTERNAL_ID_PREFIX = "awx";

export enum Id {
  SHAPER                = `${INTERNAL_ID_PREFIX}-shaper`,
  SHAPER_HELPER         = `${INTERNAL_ID_PREFIX}-shaper-helper`,
  SHAPER_CLIPPER        = `${INTERNAL_ID_PREFIX}-shaper-clipper`,
  SHAPER_RENDER         = `${INTERNAL_ID_PREFIX}-shaper-render`,
  SHAPER_RENDER_CLIPPED = `${INTERNAL_ID_PREFIX}-shaper-render-clipped`,
  SHAPER_RENDER_FILL    = `${INTERNAL_ID_PREFIX}-shaper-fill`,
}

export enum Func {
  SAMPLER = "g_{AwxynthInternal}"
}


/** Is `expr` the shaper function we want from the user? */
export function is_shaper(expr: Desmos.ExpressionState): expr is Desmos.ExpressionState & { latex: Latex }
{
  const SHAPER_LATEX_FORMAT = /f *(\\left)?\( *[a-z] *(\\right)?\) *=/;

  return Boolean(
    expr.id === Id.SHAPER && expr?.latex?.length
    || expr?.latex?.match(SHAPER_LATEX_FORMAT)?.length
  );
}
