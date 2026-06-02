import { useEffect } from 'react';
import { useProjectStore } from '../model/store';

export function useInitProjectId(projectId: string) {
  const setProjectid = useProjectStore((s) => s.setProjectId);
  const clearProjectId = useProjectStore((s) => s.clearProjectId);

  useEffect(() => {
    setProjectid(projectId);

    return () => {
      clearProjectId();
    };
  }, [clearProjectId, projectId, setProjectid]);
  return null;
}
