const ActivateInfo = () => {
  return (
    <div className="flex items-center justify-center p-5 bg-grey-100 py-[10%]">
      <div className="max-w-lg p-8 text-center text-gray-800 bg-white shadow-xl lg:max-w-xl rounded-3xl lg:p-12 text-base">
        <h3 className="text-xl">Thanks for signing up for RAFCART !</h3>
        <div className="flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-24 h-24 text-green-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
            />
          </svg>
        </div>

        <p className='text-lg font-medium mt-2'>
          An activation link has been sent to your email for completing your registration process.
        </p>
      </div>
    </div>
  );
};

export default ActivateInfo;
