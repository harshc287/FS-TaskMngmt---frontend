const PageWrapper = ({ children }) => {
  return (
    <div className="min-h-screen bg-black">
      {children}
    </div>
  );
};

export default PageWrapper;