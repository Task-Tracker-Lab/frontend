import { Link } from 'shared/ui';
import { routes } from 'shared/config';

interface MainPageProps {
  className?: string;
}

function MainPage({ className }: MainPageProps) {
  return (
    <div className={className}>
      <h1>main page</h1>
      <Link href={routes.auth.signup()}>Signup</Link>
      <br />
      <Link href={routes.auth.signin()}>Signin</Link>
    </div>
  );
}

export { MainPage };
