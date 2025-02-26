import type { FC } from 'react';
import { Suspense } from 'react';
import Loading from "@/components/Loading";
import LoginPage from "@/blocks/user/public/login";

const User: FC = () => {
  return (
    <Suspense fallback={
      <Loading />
    }>
        <LoginPage />
    </Suspense>
  );
}

export default User;
