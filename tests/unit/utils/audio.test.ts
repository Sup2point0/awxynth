import { clip, downsample } from "#scripts/utils";


describe("audio", () =>
{
  describe("clip()", () =>
  {
    test("handles empty", () => {
      expect(clip([])).toEqual([]);
    });

    test("handles identity", () => {
      expect(clip([0.5, 0.5, 0.5])).toEqual([0.5, 0.5, 0.5]);
    });

    test("clips down", () => {
      expect(clip([1.5, 2.0, 50.0])).toEqual([1.0, 1.0, 1.0]);
    });

    test("clips up", () => {
      expect(clip([-1.5, -2.0, -50.0])).toEqual([-1.0, -1.0, -1.0]);
    });

    test("handles extremes", () => {
      expect(clip([-1.0, 0.0, 1.0])).toEqual([-1.0, 0.0, 1.0]);
    });
  });

  const sample1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const sample2 = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5];

  describe("downsample()", () =>
  {
    test("scales length / low", () => {
      for (let rate = 1; rate < 4; rate++) {
        expect(downsample(sample1, rate).length).toBe(sample1.length / rate);
        expect(downsample(sample2, rate).length).toBe(sample2.length / rate);
      }
    });

    test("scales length / high", () => {
      const sample = Array.from({ length: 64_000 }, _ => Math.random());
      
      for (
        let rate = 1;
        rate < 256;
        rate += 1 + Math.round(Math.random())
      ) {
        expect(downsample(sample, rate).length).toBeGreaterThanOrEqual(Math.floor(sample.length / rate))
        expect(downsample(sample, rate).length).toBeLessThanOrEqual(Math.ceil(sample.length / rate))
      }
    });

    test("handles empty", () => {
      for (let rate = 1; rate < 10; rate++) {
        expect(downsample([], rate)).toEqual([]);
      }
    });

    test("handles identity", () => {
      expect(downsample(sample1, 1)).toEqual(sample1);
      expect(downsample(sample2, 1)).toEqual(sample2);
    });

    test("x2", () => {
      expect(downsample(sample1, 2)).toEqual([0.5, 2.5, 4.5, 6.5, 8.5, 10.5]);
      expect(downsample(sample2, 2)).toEqual([0, 1, 2, 3, 4, 5]);
    });

    test("x3", () => {
      expect(downsample(sample1, 3)).toEqual([1, 4, 7, 10]);
      expect(downsample(sample2, 3)).toEqual([1/3, 5/3, 10/3, 14/3]);
    });

    test("x4", () => {
      expect(downsample(sample1, 4)).toEqual([1.5, 5.5, 9.5]);
      expect(downsample(sample2, 4)).toEqual([0.5, 2.5, 4.5]);
    });

    test("x2 x2", () => {
      expect(downsample(downsample(sample1, 2), 2)).toEqual(downsample(sample1, 4));
      expect(downsample(downsample(sample2, 2), 2)).toEqual(downsample(sample2, 4));
    });
  });
});
