import { authOptions } from '~/lib/auth';
import { SolidAuth } from '@auth/solid-start';

export const GET = async (event: any) => {
  const { GET } = SolidAuth(authOptions);
  return GET(event);
};

export const POST = async (event: any) => {
  const { POST } = SolidAuth(authOptions);
  return POST(event);
};
