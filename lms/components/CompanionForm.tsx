"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, type Resolver, useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { subjects } from "@/constants"
import { Textarea } from "@/components/ui/textarea"
// import {createCompanion} from "@/lib/actions/companion.actions";

const formSchema = z.object({
    name: z.string().min(1, { message: 'Companion is required.'}),
    subject: z.string().min(1, { message: 'Subject is required.'}),
    topic: z.string().min(1, { message: 'Topic is required.'}),
    voice: z.string().min(1, { message: 'Voice is required.'}),
    style: z.string().min(1, { message: 'Style is required.'}),
    duration: z.coerce.number().min(1, { message: 'Duration is required.'}),
})

type CompanionFormValues = z.infer<typeof formSchema>

const formResolver = zodResolver(formSchema) as Resolver<CompanionFormValues>

const CompanionForm = () => {
    const form = useForm<CompanionFormValues>({
        resolver: formResolver,
        defaultValues: {
            name: '',
            subject: '',
            topic: '',
            voice: '',
            style: '',
            duration: 15,
        },
    })

    const onSubmit = async () => {
        // handle submit
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FieldGroup>
                <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="companion-name">
                                Companion name
                            </FieldLabel>
                            <FieldContent>
                                <Input
                                    id="companion-name"
                                    placeholder="Enter the companion name"
                                    {...field}
                                />
                                <FieldError errors={[fieldState.error]} />
                            </FieldContent>
                        </Field>
                    )}
                />

                <Controller
                    name="subject"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="companion-subject">
                                Subject
                            </FieldLabel>
                            <FieldContent>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger className="input capitalize">
                                        <SelectValue placeholder="Select the subject" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {subjects.map((subject) => (
                                            <SelectItem
                                                value={subject}
                                                key={subject}
                                                className="capitalize"
                                            >
                                                {subject}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FieldError errors={[fieldState.error]} />
                            </FieldContent>
                        </Field>
                    )}
                />

                <Controller
                    name="topic"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="companion-topic">
                                What should the companion help with?
                            </FieldLabel>
                            <FieldContent>
                                <Textarea
                                    id="companion-topic"
                                    placeholder="Ex. Derivates & Integrals"
                                    {...field}
                                    className="min-h-30 resize-none"
                                />
                                <FieldDescription>
                                    Describe the topic in a few sentences.
                                </FieldDescription>
                                <FieldError errors={[fieldState.error]} />
                            </FieldContent>
                        </Field>
                    )}
                />

                <Controller
                    name="voice"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="companion-voice">
                                Voice
                            </FieldLabel>
                            <FieldContent>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger className="input">
                                        <SelectValue placeholder="Select the voice" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="male">Male</SelectItem>
                                        <SelectItem value="female">Female</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FieldError errors={[fieldState.error]} />
                            </FieldContent>
                        </Field>
                    )}
                />

                <Controller
                    name="style"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="companion-style">
                                Style
                            </FieldLabel>
                            <FieldContent>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger className="input">
                                        <SelectValue placeholder="Select the style" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="formal">Formal</SelectItem>
                                        <SelectItem value="casual">Casual</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FieldError errors={[fieldState.error]} />
                            </FieldContent>
                        </Field>
                    )}
                />

                <Controller
                    name="duration"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="companion-duration">
                                Estimated session duration in minutes
                            </FieldLabel>
                            <FieldContent>
                                <Input
                                    id="companion-duration"
                                    type="number"
                                    placeholder="15"
                                    {...field}
                                />
                                <FieldError errors={[fieldState.error]} />
                            </FieldContent>
                        </Field>
                    )}
                />
            </FieldGroup>

            <Button type="submit" className="w-full cursor-pointer">
                Build Your Companion
            </Button>
        </form>
    )
}

export default CompanionForm