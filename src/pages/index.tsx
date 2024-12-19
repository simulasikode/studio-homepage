import Head from "next/head";

const UnderConstruction = () => {
  return (
    <>
      <Head>
        <title>Simulasi Studio</title>
        <meta
          name="description"
          content="Our website is under construction. Stay tuned for updates about our fine art screen printing studio."
        />
        <link rel="icon" href="/favicon.ico" type="image/png" />
      </Head>
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <h1 className="text-4xl font-bold  mb-4">Pre-Press</h1>
        <p className="text-lg mb-6 text-center">
          We’re working hard to launch our website. Stay tuned for updates about
          our fine art screen printing studio.
        </p>
        <div className="flex space-x-4">
          <a
            href="mailto:screen.printing@simulasi.studio"
            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700"
          >
            Contact Us
          </a>
          <button
            className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300"
            onClick={() => alert("Thank you for your patience!")}
          >
            Notify Me
          </button>{" "}
        </div>
      </div>
    </>
  );
};

export default UnderConstruction;
