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
      <br />
      <Link href={routes.team.root()}>team</Link>
      <br />
      <Link href={routes.team.profile()}>profile</Link>
      <br />
    </div>
  );
}

export { MainPage };
