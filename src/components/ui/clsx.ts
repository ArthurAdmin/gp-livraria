// Tiny helper to avoid adding deps just for clsx.
export default function clsx(...parts: Array<string | undefined | null | false>) {
  return parts.filter(Boolean).join(" ");
}

