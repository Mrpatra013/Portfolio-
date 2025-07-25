'use client';

import dynamic from "next/dynamic";
import { StarFieldProps } from "@/types/StarFieldProps";
import { useEffect, useState } from 'react';

const StarField = dynamic(() => import("@/components/animations/StarField"), {
  ssr: false,
});

export default function StarFieldClient(props: StarFieldProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? <StarField {...props} /> : null;
}
