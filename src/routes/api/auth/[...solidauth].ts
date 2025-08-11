import { authOptions } from '~/lib/auth';
import { SolidAuth } from '@auth/solid-start';
import { RequestEvent } from 'solid-js/web';

// noinspection JSUnusedGlobalSymbols
export const GET = async (event: RequestEvent) => {
  const { GET } = SolidAuth(authOptions);
  return GET(event);
};

// noinspection JSUnusedGlobalSymbols
export const POST = async (event: RequestEvent) => {
  const { POST } = SolidAuth(authOptions);
  return POST(event);
};
