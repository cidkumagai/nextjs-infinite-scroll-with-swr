import { useMemo, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { GetServerSideProps, NextPage } from 'next';
import useSWRInfinite from 'swr/infinite';

import { fetcher } from '@/libs/fetcher';
import { getKey, LIMIT } from '@/libs/swrInfinite';
import { Users } from '@/pages/api/users';

type Props = {
  fallbackData: Users;
};

const Top: NextPage<Props> = ({ fallbackData }) => {
  const { ref, inView } = useInView();
  const { data, size, setSize } = useSWRInfinite<Users>(getKey, fetcher, {
    fallbackData: [fallbackData],
    parallel: true,
  });
  const users = useMemo(() => {
    return (
      data
        ?.flatMap(({ result }) => result)
        .map(({ id, name }) => {
          return {
            id,
            name,
          };
        }) || []
    );
  }, [data]);

  useEffect(() => {
    if (!inView) {
      return;
    }

    setSize((prevSize) => prevSize + 1);
  }, [inView]);
  return (
    <div>
      <ul style={{ listStyle: 'none' }}>
        {users &&
          users
            .filter((_, index) => index < LIMIT * size)
            .map(({ id, name }, index) => {
              return (
                <li
                  key={`${id}-${name}`}
                  ref={index + 1 === LIMIT * size ? ref : undefined}
                  style={{ border: '1px solid white', padding: '20px', margin: '10px' }}
                >
                  {name}
                </li>
              );
            })}
      </ul>
    </div>
  );
};

export default Top;

export const getServerSideProps: GetServerSideProps = async () => {
  const apiUrl = 'http://localhost:3000/api/users';
  const response = await fetch(apiUrl);
  const data = await response.json();
  return {
    props: {
      fallbackData: data,
    },
  };
};
