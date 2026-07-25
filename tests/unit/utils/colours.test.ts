import { invert } from "#scripts/utils";


describe("colours", () =>
{
  describe("invert", () =>
  {
    test("simple", () =>
    {
      expect(invert("#102030")).toBe("#efdfcf");
      expect(invert("#efdfcf")).toBe("#102030");
      
      for (let col of ["#123456", "#654321", "#decade"]) {
        expect(invert(invert(col))).toBe(col);
      }
    });
    
    test("simple / extreme", () =>
    {
      expect(invert("#000000")).toBe("#ffffff");
      expect(invert("#ffffff")).toBe("#000000");
      
      for (let col of ["#ff0090", "#4090ff", "#00ff00"]) {
        expect(invert(invert(col))).toBe(col);
      }
    });
  });
});
