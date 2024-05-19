'use client';

import { verifyOTPAction } from '@/actions/verifyOTP';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@bitspace/ui/button';
import { cn } from '@bitspace/ui/cn';
import { Form, FormControl, FormField, FormItem } from '@bitspace/ui/form';
import { Input } from '@bitspace/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@bitspace/ui/input-otp';
import { useAction } from 'next-safe-action/hooks';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createClient } from '@/supabase/browser';
import { Spinner } from '@/components/Spinner/Spinner';

const formSchema = z.object({
    value: z.string().min(1)
});

type Props = {
    className?: string;
};

export default function OTPSignIn({ className }: Props) {
    const verifyOtp = useAction(verifyOTPAction);
    const [isLoading, setLoading] = useState(false);
    const [isSent, setSent] = useState(false);
    const [email, setEmail] = useState('');
    const supabase = createClient();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            value: ''
        }
    });

    async function onSubmit({ value }: z.infer<typeof formSchema>) {
        setLoading(true);

        setEmail(value);

        await supabase.auth.signInWithOtp({
            email,
            options: { emailRedirectTo: 'https://bitspace.sh/dashboard' }
        });

        setSent(true);
        setLoading(false);
    }

    async function onComplete(token: string) {
        verifyOtp.execute({
            type: 'email',
            token,
            email
        });
    }

    if (isSent) {
        return (
            <div
                className={cn(
                    'flex flex-col space-y-4 items-center',
                    className
                )}
            >
                <InputOTP
                    maxLength={6}
                    onComplete={onComplete}
                    disabled={verifyOtp.status === 'executing'}
                    render={({ slots }) => (
                        <InputOTPGroup>
                            {slots.map((slot, index) => (
                                <InputOTPSlot
                                    key={index.toString()}
                                    {...slot}
                                    className="w-[62px] h-[62px]"
                                />
                            ))}
                        </InputOTPGroup>
                    )}
                />

                <button
                    onClick={() => setSent(false)}
                    type="button"
                    className="text-sm"
                >
                    Try again
                </button>
            </div>
        );
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className={cn('flex flex-col space-y-4', className)}>
                    <FormField
                        control={form.control}
                        name="value"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder="Enter email"
                                        {...field}
                                        autoCapitalize="false"
                                        autoCorrect="false"
                                        spellCheck="false"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="active:scale-[0.98] rounded-xl bg-primary px-6 py-4 text-secondary font-medium flex space-x-2 h-[40px] w-full"
                    >
                        {isLoading ? (
                            <Spinner className="h-4 w-4" />
                        ) : (
                            <span>Continue</span>
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
