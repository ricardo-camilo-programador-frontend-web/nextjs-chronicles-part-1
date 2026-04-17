import { Suspense } from 'react';
import Loading from "@/components/Loading";
import { NoDataToShow } from "@/components/NoDataToShow";

export default function SupportPage() {
  return (
    <Suspense fallback={<Loading />}>
      <NoDataToShow />
    </Suspense>
  );
}