import { TTeam } from 'entities/team';
import { useFormContext, useFormState } from 'react-hook-form';
import { FloatingSaveBar } from 'shared/ui';
import { useUpdateTeam } from '../../api/useUpdateTeam';
import { type TeamSettingsFormValues } from '../../model/settings';

export function SaveBar({ team }: { team: TTeam.TeamDetailsResponse }) {
  const form = useFormContext();
  const { isDirty } = useFormState({ control: form.control });

  const updateTeam = useUpdateTeam();

  const onSubmit = (data: TeamSettingsFormValues) => {
    const body: TTeam.UpdateTeamBody = {
      name: data.name?.trim(),
      slug: data.slug?.trim(),
      description: data.description?.trim(),
    };
    updateTeam.mutateAsync(body);
  };

  return (
    <FloatingSaveBar
      visible={isDirty}
      onSave={form.handleSubmit(onSubmit)}
      onDiscard={() => form.reset(team)}
      pending={updateTeam.isPending}
    />
  );
}
