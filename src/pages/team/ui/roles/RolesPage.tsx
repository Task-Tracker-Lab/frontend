'use client';

import { useState } from 'react';
import { FloatingSaveBar } from 'shared/ui';
import { DEFAULTS, RoleKey } from '../../model/roles-mock';
import { RolesList } from 'pages/team/ui/roles/RolesList';
import { Permissions } from 'pages/team/ui/roles/Permissions';

export function RolesPage() {
  const [matrix, setMatrix] = useState(DEFAULTS);
  const [saved, setSaved] = useState(DEFAULTS);
  const [active, setActive] = useState<RoleKey>('Member');

  const dirty = JSON.stringify(matrix) !== JSON.stringify(saved);

  return (
    <>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[260px_1fr]">
        <RolesList className="flex flex-col gap-2" active={active} setActive={setActive} />
        <Permissions className="space-y-4" active={active} />
      </div>

      <FloatingSaveBar
        visible={dirty}
        onSave={() => setSaved(matrix)}
        onDiscard={() => setMatrix(saved)}
      />
    </>
  );
}
