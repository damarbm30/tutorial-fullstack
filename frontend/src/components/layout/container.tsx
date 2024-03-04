import { ReactNode } from "react";

export default function Container({ children }: { children?: ReactNode }) {
  return (
    <section className="p-4">
      <div className="rounded-md bg-white p-4">{children}</div>
    </section>
  );
}
