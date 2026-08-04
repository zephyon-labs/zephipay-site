import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { describe, it } from "node:test";

describe("desktop mega-menu alignment", () => {
  it("centers the bounded panel against the header container", async () => {
    const navigation = await source("src/components/navigation/DesktopNavigation.tsx");
    const header = await source("src/components/layout/SiteHeader.tsx");
    const styles = await source("src/app/globals.css");
    assert.match(header, /relative mx-auto max-w-7xl/);
    assert.match(navigation, /absolute inset-x-0[^\n]*flex justify-center/);
    assert.match(navigation, /className="ml-auto hidden lg:block"/);
    assert.match(navigation, /w-\[min\(72rem,calc\(100vw-3rem\)\)\]/);
    assert.doesNotMatch(navigation, /static ml-auto hidden lg:block|left-1\/2|-translate-x-1\/2/);
    assert.match(styles, /@keyframes zephipay-menu-enter[\s\S]*translateY\(-5px\)[\s\S]*translateY\(0\)/);
    assert.doesNotMatch(styles, /transform: translate\(-50%, -(?:5px)\)|transform: translate\(-50%, 0\)/);
  });
});

async function source(path: string) {
  return readFile(new URL(`../${path}`, import.meta.url), "utf8");
}
