import type { NextApiRequest, NextApiResponse } from 'next';

export type User = {
  id: number;
  name: string;
};

export type Users = {
  result: User[]
}

const Users: User[] = [...Array(1000)].map((_, index) => {
  return {
    id: index + 1,
    name: `user-${index + 1}`,
  };
});

export default function handler(req: NextApiRequest, res: NextApiResponse<Users>) {
  res.status(200);
  res.json({result: Users});
}
