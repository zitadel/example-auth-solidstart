import { Router } from '@solidjs/router';
import { FileRoutes } from '@solidjs/start/router';
import { Suspense } from 'solid-js';
import './app.css';

// noinspection JSUnusedGlobalSymbols
export default function App() {
  return (
    <Router
      root={(props) => (
        <div class="flex min-h-screen flex-col bg-gray-50">
          <Suspense>{props.children}</Suspense>
        </div>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
