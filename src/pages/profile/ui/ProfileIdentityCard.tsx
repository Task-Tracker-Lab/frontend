import { ComponentProps, useEffect } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Field,
  FieldError,
  FieldGroup,
  Input,
  Textarea,
} from 'shared/ui';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProfileAvatarSection } from './ProfileAvatarSection';
import { ProfileUpdateBody, UserHttp, UserQueries } from 'entities/user';
import { z } from 'zod/v4';
import { ProfileFormSchema } from '../model/schemas/profile-form';

type ProfileFormSchemaType = z.infer<typeof ProfileFormSchema>;

function ProfileIdentityCard(props: Omit<ComponentProps<typeof Card>, 'children'>) {
  const query = useQuery(UserQueries.getMe());
  const profile = query.data?.profile;
  const email = query.data?.email;

  const form = useForm<ProfileFormSchemaType>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      bio: '',
    },
  });
  const formValues = useWatch({ control: form.control });

  const updateProfileMutation = useMutation({
    mutationFn: UserHttp.updateUserConfig,
    onSuccess: async () => {
      toast.success('Профиль обновлён');
      await query.refetch();
    },
  });

  useEffect(() => {
    if (!profile) {
      return;
    }

    form.reset({
      firstName: profile.firstName,
      lastName: profile.lastName,
      bio: profile.bio || '',
    });
  }, [form, profile]);

  if (!profile || !email) {
    return (
      <Card {...props}>
        <CardHeader>
          <CardTitle>Профиль</CardTitle>
          <CardDescription>Данные профиля пока недоступны.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const fullName = `${profile.firstName} ${profile.lastName}`;
  const profileFormKeys: Array<keyof ProfileFormSchemaType> = ['firstName', 'lastName', 'bio'];
  const hasProfileChanges = profileFormKeys.some(
    (key) => (formValues[key] ?? '').trim() !== (profile[key] ?? '').trim()
  );

  const onSubmit = (data: ProfileFormSchemaType) => {
    const body: z.infer<typeof ProfileUpdateBody> = {
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      bio: data.bio ? data.bio.trim() : '',
    };

    updateProfileMutation.mutate(body);
  };

  return (
    <Card {...props}>
      <CardHeader className="pb-2">
        <CardTitle>Профиль</CardTitle>
        <CardDescription>Основная информация аккаунта и настройки языка.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-muted/30 flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <ProfileAvatarSection
              avatarUrl={profile.avatarUrl}
              fullName={fullName}
              firstName={profile.firstName}
              lastName={profile.lastName}
              onUploaded={async () => {
                await query.refetch();
              }}
            />
            <div className="space-y-1">
              <p className="text-xl font-semibold">{fullName}</p>
              <p className="text-muted-foreground text-sm sm:text-base">{email}</p>
              <p className="text-muted-foreground max-w-xl text-sm">
                {profile.bio?.trim() || 'Добавьте информацию о себе в профиле'}
              </p>
            </div>
          </div>
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-3 rounded-lg border p-4">
            <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
              Имя и фамилия
            </p>
            <FieldGroup className="grid gap-3 sm:grid-cols-2">
              <Controller
                name="firstName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Input
                      aria-label="firstName"
                      placeholder="Имя"
                      type="text"
                      aria-invalid={fieldState.invalid}
                      aria-required="true"
                      {...field}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="lastName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Input
                      aria-label="lastName"
                      placeholder="Фамилия"
                      type="text"
                      aria-invalid={fieldState.invalid}
                      aria-required="true"
                      {...field}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <div className="space-y-3 sm:col-span-2">
                <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                  О себе
                </p>
                <Controller
                  name="bio"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <Textarea
                        aria-label="bio"
                        placeholder="Расскажите немного о себе"
                        rows={3}
                        aria-invalid={fieldState.invalid}
                        {...field}
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </div>
            </FieldGroup>
            <div className="mt-4 flex justify-end sm:mt-6">
              <Button
                size="sm"
                type="submit"
                disabled={updateProfileMutation.isPending || !hasProfileChanges}
                className="w-full sm:w-auto"
              >
                Сохранить изменения
              </Button>
            </div>
          </div>
          <dl className="bg-muted/20 grid gap-4 rounded-lg border p-4 sm:grid-cols-3">
            <div>
              <dt className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                Часовой пояс
              </dt>
              <dd className="font-medium">{profile.timezone}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                Язык
              </dt>
              <dd className="font-medium">{profile.language}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                Профиль обновлен
              </dt>
              <dd className="font-medium">{profile.updatedAt}</dd>
            </div>
          </dl>
        </form>
      </CardContent>
    </Card>
  );
}

export { ProfileIdentityCard };
