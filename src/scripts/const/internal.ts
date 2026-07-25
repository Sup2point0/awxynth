/** How many samples points of a shaping function to take over the time range. */
export const SHAPER_SAMPLE_RES = 512;

/** Downsampling rate for frequency spectrum visualisers. */
export const FREQUENCY_DOWNSAMPLE = 32;

/** Lowest frequency to start spectrum visualisers from. */
export const MIN_FREQUENCY = 20;

/** Highest frequency to end spectrum visualisers at. */
export const MAX_FREQUENCY = 20_000;

/** Maximum master gain. Leaves headroom to avoid clipping client-side. */
export const MAX_GAIN = 0.4;

/** Frames per second for continuous UI updates, such as meters. */
export const FRAME_RATE = 30;
