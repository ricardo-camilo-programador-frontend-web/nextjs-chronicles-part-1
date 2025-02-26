'use client';

import { useEffect } from 'react';
import { Suspense } from 'react';
import Loading from "@/components/Loading";
import { NoDataToShow } from "@/components/NoDataToShow";

export default function DepositPage() {

  const redirectToDashboard = () => {
    window.location.href = '/user/dashboard';
  };

  useEffect(() => {
    redirectToDashboard();
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <NoDataToShow />
    </Suspense>
  );
}