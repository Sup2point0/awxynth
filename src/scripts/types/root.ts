export type int = number;

/** An integer in `[MIN_OCTAVE, MAX_OCTAVE]`. */
export type Octave = int;

/** A float in `[0.0, 1.0]`. */
export type Scalar = number;

/** A sound amplitude sample in `[-1.0, 1.0]`. */
export type Amplitude = Scalar;

/** A duration in seconds. */
export type Seconds = number;

/** A scheduled time calculated from `AudioContext.currentTime`. */
export type ScheduledTime = number;


export type Latex = string;


export type MaybeArray<T> = T | T[];
