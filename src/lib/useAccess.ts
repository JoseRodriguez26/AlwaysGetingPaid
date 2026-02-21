"use client";

import { useState, useEffect } from "react";

export function useAccess() {
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/access/check")
      .then((res) => res.json())
      .then((data) => {
        setHasAccess(data.hasAccess ?? false);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return { hasAccess, loading };
}
