import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { describe, it } from "node:test";

describe("desktop mega-menu alignment", () => {
  it("centers the bounded panel against the header container", async () => {
    const navigation = await source("src/components/navigation/DesktopNavigation.tsx");
    const header = await source("src/components/layout/SiteHeader.tsx");
    assert.match(header, /relative mx-auto max-w-7xl/);
    assert.match(navigation, /className="static ml-auto hidden lg:block"/);
    assert.match(navigation, /absolute left-1\/2[^\n]*-translate-x-1\/2/);
    assert.match(navigation, /w-\[min\(72rem,calc\(100vw-3rem\)\)\]/);
    assert.doesNotMatch(navigation, /className="relative ml-auto hidden lg:block"/);
  });
});

async function source(path: string) {
  return readFile(new URL(`../${path}`, import.meta.url), "utf8");
}
