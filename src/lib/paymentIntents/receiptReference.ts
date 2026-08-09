const REFERENCE_ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
const REFERENCE_LENGTH = 10;

/** A stable display code, never an authoritative or guaranteed-unique ID. */
export function receiptReferenceCode(receiptId: string): string {
  let left = 0x811c9dc5;
  let right = 0x9e3779b9;
  for (const byte of new TextEncoder().encode(receiptId)) {
    left = Math.imul(left ^ byte, 0x01000193) >>> 0;
    right = Math.imul(right ^ byte, 0x85ebca6b) >>> 0;
  }

  let encoded = "";
  for (let index = 0; index < REFERENCE_LENGTH / 2; index += 1) {
    encoded += REFERENCE_ALPHABET[(left >>> (index * 5)) & 31];
    encoded += REFERENCE_ALPHABET[(right >>> (index * 5)) & 31];
  }
  return `ZP-${encoded}`;
}
