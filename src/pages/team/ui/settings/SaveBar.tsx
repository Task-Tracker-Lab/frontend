import { TTeam } from 'entities/team';
import { useFormContext, useFormState } from 'react-hook-form';
import { FloatingSaveBar } from 'shared/ui';
import { useUpdateTeam } from '../../api/useUpdateTeam';
import { type TeamSettingsFormValues } from '../../model/settings';

export function SaveBar({ team }: { team: TTeam.TeamDetailsResponse }) {
  const form = useFormContext();
  const { isDirty, dirtyFields } = useFormState({ control: form.control });

  const updateTeam = useUpdateTeam({
    onSuccess: () => {
      form.reset(form.getValues());
    },
  });

  const onSubmit = (data: TeamSettingsFormValues) => {
    const body: TTeam.UpdateTeamBody = {
      ...(dirtyFields.name && { name: data.name?.trim() }),
      ...(dirtyFields.slug && { slug: data.slug?.trim() }),
      ...(dirtyFields.description && { description: data.description?.trim() }),
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
