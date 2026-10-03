import type { ReactNode } from "react";

export default function HonestNote({ children }: { children: ReactNode }) {
  return <aside className="honest-note"><span aria-hidden="true">ⓘ</span><div><b>Honest note</b><p>{children}</p></div></aside>;
}
