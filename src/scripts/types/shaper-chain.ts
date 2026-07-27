import type { Latex, Shaper } from "#scripts/types";


export interface ShaperChain<
  Instance extends ShaperChainInstance = ShaperChainInstance
>
{
  /** Should this shaper chain be restricted to only allowing 1 global usage? */
  limit_single?: true;

  title:  string;
  colour: string;
  desmos: {
    latex: Latex | Latex[];
  };
  desc:   string[];

  create_instance(): Instance
}


export interface ShaperChainInstance
{
  original: ShaperChain;
  disabled: boolean;
  shapers:  Shaper[];
}
