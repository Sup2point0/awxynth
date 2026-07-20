export const INTERNAL =
{
  /** How many samples points of a shaping function to take over the time range. */
  SHAPER_SAMPLE_RES: 512,

  /** Sample rate for audio buffers. */
  AUDIO_SAMPLE_RATE: 48000,

  /** Frames per second for continuous UI updates, such as meters. */
  FRAME_RATE: 30,

  /** Maximum master gain. Leaves headroom to avoid clipping client-side. */
  MAX_GAIN: 0.4,
};
