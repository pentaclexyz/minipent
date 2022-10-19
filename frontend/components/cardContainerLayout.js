const CardMiniContainer = ({children}) => {
  return (
    <>
      <div className="grid gap-4 sm:gap-6 md:gap-12 grid-cols-3 sm:grid-cols-6 md:grid-cols-9 lg:grid-cols-12">
        {children}
      </div>
    </>
  );
};

export default CardMiniContainer;
