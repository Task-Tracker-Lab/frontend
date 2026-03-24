import Image from 'next/image';
import { LogoImage } from 'shared/assets';

export function AppLogo() {
  return (
    <div className="flex items-center mb-20 gap-3">
      <Image src={LogoImage} alt="logo" />
      <h1 className="text-2xl font-bold">TaskTracker Lab</h1>
    </div>
  );
}
