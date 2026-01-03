"use client";
import { Suspense} from "react";
import ConfirmPageClient from "./pageClient";

function ConfirmPage() {


  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfirmPageClient />
    </Suspense>
  );
}

ConfirmPage.propTypes = {};

export default ConfirmPage;
