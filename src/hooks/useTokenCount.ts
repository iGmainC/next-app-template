import { startTransition, useEffect, useState } from 'react';

// import { encodeAsync } from '@/utils/tokenizer';

export const encodeAsync = async (str: string) => {
  const { encode } = await import('gpt-tokenizer');

  return encode(str).length;
};


export const useTokenCount = (input: string = '') => {
  const [value, setNum] = useState(0);
  useEffect(() => {
    startTransition(() => {
      encodeAsync(input)
        .then(setNum)
        .catch(() => {
          // 兜底采用字符数
          setNum(input.length);
        });
    });
  }, [input]);

  return value;
};
