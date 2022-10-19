const CardMiniContainer = ({children}) => {
  return (
    <>
      <div className="grid gap-8 sm:gap-12 md:gap-20 grid-cols-1 sm:grid-cols-2 md:grid-cols-9 lg:grid-cols-12">
        {children}
      </div>
    </>
  );
};

export default CardMiniContainer;
