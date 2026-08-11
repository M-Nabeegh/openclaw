import { describe, expect, it } from "vitest";
import { parseDiscordComponentParam } from "./components.js";

describe("Discord component parameter parsing", () => {
  it("parses JSON object and array strings", () => {
    expect(parseDiscordComponentParam('{"text":"hello"}')).toEqual({ text: "hello" });
    expect(parseDiscordComponentParam('[{"type":10,"content":"hello"}]')).toEqual([
      { type: 10, content: "hello" },
    ]);
  });

  it("keeps existing values and invalid strings unchanged", () => {
    const object = { text: "hello" };
    const array = [{ type: 10 }];
    const functionValue = () => [];
    expect(parseDiscordComponentParam(object)).toBe(object);
    expect(parseDiscordComponentParam(array)).toBe(array);
    expect(parseDiscordComponentParam(null)).toBeNull();
    expect(parseDiscordComponentParam(42)).toBe(42);
    expect(parseDiscordComponentParam(functionValue)).toBe(functionValue);
    expect(parseDiscordComponentParam("not-json")).toBe("not-json");
    expect(parseDiscordComponentParam("null")).toBeNull();
  });
});
