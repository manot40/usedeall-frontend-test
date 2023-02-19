import { useState, useCallback, useEffect } from 'react';

import { TextInput, Tooltip, type TextInputProps } from '@mantine/core';

import { rangeSearch } from '@/utils';
import debounce from 'lodash/debounce';
import { useDisclosure } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';

type SearchProps = {
  onChange?: (p: QueryPayload) => void;
} & Omit<TextInputProps, 'onChange'>;

export default function Search({ onChange, ...props }: SearchProps) {
  const [value, setValue] = useState(props.value + '' || '');
  const [tipOpened, tipHandler] = useDisclosure(false);

  useEffect(() => {
    if (props.value !== value)
      setValue((prev) => {
        const split = prev.split(' ');
        const withRange = split.filter((v) => v.includes(':'));
        const withoutRange = split.filter((v) => !v.includes(':'));
        return `${withRange.join(' ')} ${withoutRange.join(' ')}`.trim();
      });
    // eslint-disable-next-line
  }, [props.value]);

  // eslint-disable-next-line
  const debouncedOnChange = useCallback(
    debounce((p: QueryPayload) => onChange && onChange(p), 500),
    []
  );

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      debouncedOnChange(rangeSearch(e.target.value));
    },
    [debouncedOnChange]
  );

  return (
    <Tooltip opened={!value && tipOpened} label='Tip: Filter by number range using "price:gte:20 stock:lte:10"'>
      <TextInput
        {...props}
        icon={<IconSearch size={14} />}
        value={value}
        onBlur={tipHandler.close}
        onFocus={tipHandler.open}
        onChange={handleSearch}
        placeholder="Search Product"
      />
    </Tooltip>
  );
}

type QueryPayload = Record<string, string | number>;
