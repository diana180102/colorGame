

// eslint-disable-next-line react/prop-types
function Input({className, type, ...delegated}) {
    
    const classname = className;
    
    return ( 
        <input {...delegated} type={type} className={`${classname} ${"rounded-md border border-[#D4D4D4] py-2 px-3"}`} />
      );
}

export default Input;