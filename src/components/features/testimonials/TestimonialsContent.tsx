"use client";

import { useState } from "react";
import { TestimonialsLayoutSelector, type TestimonialsVariant } from "./TestimonialsLayoutSelector";
import { ClassicLayout } from "./layouts/ClassicLayout";
import { EditorialLayout } from "./layouts/EditorialLayout";

export function TestimonialsContent() {
  const [layout, setLayout] = useState<TestimonialsVariant>("classic");

  return (
    <>
      <TestimonialsLayoutSelector current={layout} onChange={setLayout} />

      {layout === "classic" && <ClassicLayout />}
      {layout === "editorial" && <EditorialLayout />}
    </>
  );
}
