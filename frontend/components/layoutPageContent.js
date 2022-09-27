const LayoutPageContent = ({children}) => {
  return (
    <section className={"rounded-2xl bg-white/20 p-4 md:p-6"}>
      <div className={"md:grid md:grid-cols-12 md:gap-x-8 whitespace-pre-wrap"}>
          {children}
      </div>
    </section>
  );
};

export default LayoutPageContent;
