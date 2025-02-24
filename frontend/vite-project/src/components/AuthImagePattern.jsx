const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
      <div className="max-w-sm text-center">
        {/* Grid of smaller animated squares */}
        <div className="grid grid-cols-3 gap-1 mb-6 w-80 ml-10">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              style={{height:'100px', width:'100px'}}
              className={`w-50 h-50 rounded-lg bg-[#3F4F44] ${i % 2 === 0 ? "animate-pulse" : ""}`}
            />
          ))}
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold mb-3">{title}</h2>

        {/* Subtitle */}
        <p className="text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
