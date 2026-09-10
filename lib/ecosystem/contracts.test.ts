import { describe, expect, it } from "vitest";

import {
  deserializeScientificObject,
  serializeScientificObject,
  type ScientificObject,
} from "./contracts";

describe("Scientific Object transfer envelope", () => {
  it("round-trips structured payload and provenance", () => {
    const object: ScientificObject<{ value: number }> = {
      id: "object-1",
      projectId: "project-1",
      kind: "calculation",
      schemaVersion: "1.0",
      title: "Integral result",
      sourceApp: "math",
      currentRevision: 1,
      revision: {
        objectId: "object-1",
        revision: 1,
        payload: { value: 42 },
        provenance: { sourceApp: "math", executionTarget: "this-device" },
      },
    };

    const envelope = deserializeScientificObject(serializeScientificObject(object));

    expect(envelope.object.id).toBe("object-1");
    expect(envelope.revisions[0].payload).toEqual({ value: 42 });
    expect(envelope.revisions[0].provenance.executionTarget).toBe("this-device");
  });

  it("rejects incompatible envelopes", () => {
    expect(() => deserializeScientificObject('{"transferSchemaVersion":"0.1"}')).toThrow(
      "INVALID_SCIENTIFIC_OBJECT_TRANSFER_ENVELOPE",
    );
  });
});
