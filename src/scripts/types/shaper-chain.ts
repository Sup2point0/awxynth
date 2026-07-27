import type { Latex, Shaper } from "#scripts/types";


export interface ShaperChain<
  Instance extends ShaperChainInstance = ShaperChainInstance
>
{
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
  disabled: boolean;
  shapers:  Shaper[];
}
