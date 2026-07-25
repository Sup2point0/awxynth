import { iter_windowed } from "#scripts/utils";


describe("iter", () =>
{
  describe("iter-windowed()", () =>
  {
    test("simple", () =>
    {
      {
        let chunked = iter_windowed([1, 2, 3, 4, 5], 2);
        expect(chunked.next().value).toEqual([1, 2]);
        expect(chunked.next().value).toEqual([2, 3]);
        expect(chunked.next().value).toEqual([3, 4]);
        expect(chunked.next().value).toEqual([4, 5]);
        expect(chunked.next().done).toBe(true);
      }
      {
        let chunked = iter_windowed([1, 2, 3, 4, 5], 3);
        expect(chunked.next().value).toEqual([1, 2, 3]);
        expect(chunked.next().value).toEqual([2, 3, 4]);
        expect(chunked.next().value).toEqual([3, 4, 5]);
        expect(chunked.next().done).toBe(true);
      }
      {
        let chunked = iter_windowed([1, 2, 3, 4, 5], 4);
        expect(chunked.next().value).toEqual([1, 2, 3, 4]);
        expect(chunked.next().value).toEqual([2, 3, 4, 5]);
        expect(chunked.next().done).toBe(true);
      }
    });

    test("extreme", () =>
    {
      {
        let chunked = iter_windowed([1, 2, 3, 4, 5], 1);
        expect(chunked.next().value).toEqual([1]);
        expect(chunked.next().value).toEqual([2]);
        expect(chunked.next().value).toEqual([3]);
        expect(chunked.next().value).toEqual([4]);
        expect(chunked.next().value).toEqual([5]);
        expect(chunked.next().done).toBe(true);
      }
      {
        let chunked = iter_windowed([1, 2, 3, 4, 5], 5);
        expect(chunked.next().value).toEqual([1, 2, 3, 4, 5]);
        expect(chunked.next().done).toBe(true);
      }
    });

    test("empty", () =>
    {
      let chunked = iter_windowed([]);
      expect(chunked.next().done).toBe(true);
    });
  });
});
