'use client';

import React, { useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import * as z from 'zod';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

import { createTodo } from './actions';

const FormSchema = z.object({
  title: z.string().min(1, {
    message: 'Title is required.',
  }),
});

type FormSchemaType = z.infer<typeof FormSchema>;

function CreateForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
    },
  });

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    startTransition(async () => {
      try {
        const result = await createTodo(data.title, window.location.host);

        const parsedResult = JSON.parse(result) as { error?: { message: string }; data?: { title: string } };

        if (parsedResult.error?.message) {
          toast({
            variant: 'destructive',
            title: 'Failed to create todo',
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">{parsedResult.error.message}</code>
              </pre>
            ),
          });
        } else if (parsedResult.data) {
          toast({
            title: 'Todo created successfully.',
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">{parsedResult.data.title} is created</code>
              </pre>
            ),
          });
          form.reset();
        }
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Failed to create todo',
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">An unexpected error occurred.</code>
            </pre>
          ),
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="todo title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full flex gap-2">
          Create
          <AiOutlineLoading3Quarters className={cn(' animate-spin', { hidden: !isPending })} />
        </Button>
      </form>
    </Form>
  );
}

export default CreateForm;
