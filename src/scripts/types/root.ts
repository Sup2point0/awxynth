export type int = number;

/** An integer in `[MIN_OCTAVE, MAX_OCTAVE]`. */
export type Octave = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

/** A float in `[0.0, 1.0]`. */
export type Scalar = number;

/** A sound amplitude sample in `[-1.0, 1.0]`. */
export type Amplitude = Scalar;

/** A duration in seconds. */
export type Seconds = number;


export type Latex = string;
