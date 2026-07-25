/** How many samples points of a shaping function to take over the time range. */
export const SHAPER_SAMPLE_RES = 512;

/** Sample rate for audio buffers. */
export const AUDIO_SAMPLE_RATE = 48000;

/** Downsampling rate for frequency spectrum visualisers. */
export const FREQUENCY_DOWNSAMPLE = 32;

/** Frames per second for continuous UI updates, such as meters. */
export const FRAME_RATE = 30;

/** Maximum master gain. Leaves headroom to avoid clipping client-side. */
export const MAX_GAIN = 0.4;
