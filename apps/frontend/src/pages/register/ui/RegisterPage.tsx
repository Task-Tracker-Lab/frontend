'use client';
import {RegisterForm} from './RegisterForm';

export default function RegisterPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2"># Task-tracker</h1>
      <h2 className="text-lg font-medium mb-4">С возвращением</h2>
      <RegisterForm />
    </div>
  );
}
