import { clip } from "#scripts/utils";


describe("audio", () =>
{
  describe("clip", () =>
  {
    test("identity", () => {
      expect(clip([0.5, 0.5, 0.5])).toEqual([0.5, 0.5, 0.5]);
    });
    test("clips down", () => {
      expect(clip([1.5, 2.0, 50.0])).toEqual([1.0, 1.0, 1.0]);
    });
    test("clips up", () => {
      expect(clip([-1.5, -2.0, -50.0])).toEqual([-1.0, -1.0, -1.0]);
    });
    test("extreme", () => {
      expect(clip([-1.0, 0.0, 1.0])).toEqual([-1.0, 0.0, 1.0]);
    });
    test("empty", () => {
      expect(clip([])).toEqual([]);
    });
  });
});
