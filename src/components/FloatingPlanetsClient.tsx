'use client';

import dynamic from "next/dynamic";
import { useEffect, useState } from 'react';

const FloatingPlanets = dynamic(() => import("@/components/animations/FloatingPlanets"), {
  ssr: false,
});

export default function FloatingPlanetsClient() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? <FloatingPlanets /> : null;
}
