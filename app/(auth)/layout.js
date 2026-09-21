import Header from '../_components/Header/Header';

export default function AuthLayout({ children }) {
  return (
    <div>
      <Header />
      <main>{children}</main>;
    </div>
  );
}
