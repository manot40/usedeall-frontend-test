import { MultiSelect, type MultiSelectProps } from '@mantine/core';

type SearchProps = {
  context?: string;
} & MultiSelectProps;

export default function Filter({ context, ...props }: SearchProps) {
  return <MultiSelect searchable clearable {...props} placeholder={`Filter${context ? ` by ${context}` : ''}`} />;
}
