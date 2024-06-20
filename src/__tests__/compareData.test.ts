import { compareData } from "../utils";

describe('compareData', () => {
  const obj1 = { a: 1, b: 2, c: 3 }; // client data
  const obj2 = { a: 1, b: 22, d: 4 }; // company data

  it('should return differences between two objects', () => {
    const differences = compareData(obj1, obj2);
    expect(differences).toEqual([
      { key: 'b', "clientHas": 2, "companyHas": 22, },
      { key: 'c', "clientHas": 3, "companyHas": undefined, },
      { key: 'd', "clientHas": undefined, "companyHas": 4, },
    ]);
  });
});
