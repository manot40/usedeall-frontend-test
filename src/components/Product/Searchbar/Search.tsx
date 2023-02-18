import { useState, useCallback, useEffect } from 'react';

import { TextInput, type TextInputProps } from '@mantine/core';

import debounce from 'lodash/debounce';
import { IconSearch } from '@tabler/icons-react';

type SearchProps = {
  onChange?: (q: string) => void;
} & Omit<TextInputProps, 'onChange'>;

export default function Search({ onChange, ...props }: SearchProps) {
  const [value, setValue] = useState(props.value || '');

  useEffect(() => {
    if (props.value !== value) setValue(props.value || '');
    // eslint-disable-next-line
  }, [props.value]);

  // eslint-disable-next-line
  const debouncedOnChange = useCallback(
    debounce((q: string) => onChange && onChange(q), 500),
    []
  );

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      debouncedOnChange(e.target.value);
    },
    [debouncedOnChange]
  );

  return (
    <TextInput
      {...props}
      icon={<IconSearch size={14} />}
      value={value}
      onChange={handleSearch}
      placeholder="Search Product"
    />
  );
}
