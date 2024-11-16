import dynamic from "next/dynamic";
import React from "react";

const DataAndPrivacy = dynamic(
  () => import("@/components/page-components/data-and-privacy/DataAndPrivacy"),
  {
    ssr: false,
  }
);
export default function page() {
  return (
    <div>
      <DataAndPrivacy />
    </div>
  );
}
