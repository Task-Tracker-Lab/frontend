'use client';
import React, { ComponentProps, InputEvent, KeyboardEvent, useRef } from 'react';
import { Card, CardContent, Checkbox } from 'shared/ui';
import { useActiveFieldStore } from '../model/useActiveFieldStore';
import { useClickOutside } from '../lib/useClickOutside';
import { useCreateTask } from '../model/useCreateTask';
import { TTask } from 'entities/task';

interface Props
  extends
    Omit<ComponentProps<typeof Card>, 'children' | 'id'>,
    Pick<TTask.CreateTaskBody, 'boardId' | 'columnId'> {}

function CreateTaskField_({ boardId, columnId, ...props }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const refTextArea = useRef<HTMLTextAreaElement>(null);
  const { close, activeId } = useActiveFieldStore();
  const { mutateAsync } = useCreateTask();

  const clearTextArea = () => {
    const elem = refTextArea.current;
    if (elem) {
      elem.value = '';
    }
  };

  const handleSubmit = (body: TTask.CreateTaskBody) => {
    // TODO: что-то сделать с данными
    clearTextArea();
    mutateAsync({ body });
  };

  const updateHeight = (e: InputEvent) => {
    const textarea = e.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };
  const onInput = (e: InputEvent) => {
    updateHeight(e);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    const textarea = e.target as HTMLTextAreaElement;

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit({ title: textarea.value, columnId, boardId });
    }
  };

  useClickOutside(`create-task-${columnId}`, close);

  if (activeId !== columnId) return null;

  return (
    <Card id={`create-task-${columnId}`} ref={ref} className="min-h-20" {...props}>
      <CardContent className="flex items-start gap-1">
        <Checkbox className="p-1" disabled />
        <textarea
          ref={refTextArea}
          autoFocus
          onInput={onInput}
          onKeyDown={onKeyDown}
          className="text-14 placeholder:text-placeholder m-0 h-auto min-h-0 w-full resize-none overflow-y-hidden p-0 leading-4 shadow-none outline-none focus:shadow-none"
          placeholder="Введите название задачи..."
        ></textarea>
      </CardContent>
    </Card>
  );
}

export const CreateTaskField = React.memo(CreateTaskField_);
