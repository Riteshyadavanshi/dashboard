interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return <div className="bg-[#F1F2F7] min-h-screen w-screen flex justify-center items-center ">{children}</div>;
};

export default AuthLayout;
