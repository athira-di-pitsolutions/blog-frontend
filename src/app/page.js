import axios from 'axios';
import Link from 'next/link';

const Home = async () => {
  let blogs = [];
  let error = null;

  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/blogs`, {
      params: {
        populate: '*',
      },
    });
    blogs = res.data.data;
  } catch (err) {
    error = err;
  }

  if (error) {
    return <div>An error occurred: {error.message}</div>;
  }

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex justify-center text-center w-full py-6">
          <h1 className='text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight'>Blog Home</h1>
        </div>
        <div className="flex flex-wrap -m-4">
          {blogs.map(blog => (
            <div className="p-4 lg:w-1/3" key={blog.id}>
              <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">{blog.attributes.category.data.attributes.name}</h2>
                <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">{blog.attributes.title}</h1>
                <Link href={`/blogs/${blog.id}`} className="text-indigo-500 inline-flex items-center">Read
                  <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

  );
};

export default Home;
