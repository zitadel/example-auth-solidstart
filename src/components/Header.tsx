import { SignOutButton } from './SignOutButton';
import { Show } from 'solid-js';

type HeaderProps = {
  isAuthenticated: boolean;
};

export function Header(props: HeaderProps) {
  return (
    <header class="border-b border-gray-200 bg-white">
      <div class="mx-auto max-w-7xl px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <img
              src="/app-logo.svg"
              alt="App Icon"
              width="40"
              height="40"
              class="h-8 w-8"
            />
            <h1 class="text-xl font-semibold text-gray-900">
              Demo Application
            </h1>
          </div>
          <Show when={props.isAuthenticated}>
            {' '}
            {/* <- And this line */}
            <SignOutButton />
          </Show>
        </div>
      </div>
    </header>
  );
}
