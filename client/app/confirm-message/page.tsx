"use client";
import { Suspense} from "react";
import ConfirmMessageClient from "./pageMessageClient";

function ConfirmPage() {


  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfirmMessageClient />
    </Suspense>
  );
}

ConfirmPage.propTypes = {};

export default ConfirmPage;
