

// eslint-disable-next-line react/prop-types
function Button({ className, children, ...delegated }) {
  
  const classNames = className;

  return (
    <button className={`${classNames} ${"rounded-md"}`} {...delegated}>
      {children}
    </button>
  );
}

export default Button;
