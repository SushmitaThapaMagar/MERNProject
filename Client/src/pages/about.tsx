"use client";

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main content */}
      <main className="flex-grow px-8 py-12 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-indigo-800 mb-6">
          About Us
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed text-center mb-10">
          Welcome to{" "}
          <span className="font-semibold text-orange-600">Shop Cart Nepal</span>
          , your one-stop destination for all your shopping needs. We are
          dedicated to bringing high-quality products and an exceptional online
          shopping experience to our customers across Nepal.
        </p>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-3">
              Our Mission
            </h2>
            <p className="text-gray-600">
              To provide an easy, secure, and enjoyable online shopping
              experience where customers can access quality products at the best
              prices, right at their fingertips.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-3">
              Our Vision
            </h2>
            <p className="text-gray-600">
              To become Nepal’s most trusted online shopping platform, offering
              a wide variety of products and excellent customer service.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutUs;
