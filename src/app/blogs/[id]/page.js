import axios from 'axios';
import Image from 'next/image';

const BlogPage = async ({ params }) => {
    const { id } = params;

    let blog = null;

    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/blogs/${id}`, {
            params: {
                populate: '*',
            },
        });
        blog = res.data.data || null;
    } catch (error) {
        console.error(error);
    }

    if (!blog) {
        return <p>Blog not found</p>;
    }

    return (
        <section class="text-gray-600 body-font">
            <div class="container px-5 py-24 mx-auto flex flex-col">
                <div class="lg:w-4/6 mx-auto">
                    <div className="flex justify-center text-center w-full py-2">
                        <h2 className="tracking-widest text-xl title-font font-medium text-indigo-400 mb-1">{blog.attributes.category.data.attributes.name}</h2>
                    </div>
                    <div className="flex justify-center text-center w-full py-6">
                        <h1 className='text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight'>{blog.attributes.title}</h1>
                    </div>
                    <div class="rounded-lg h-64 overflow-hidden">
                        {blog.attributes.featured && (
                            <Image src={process.env.NEXT_PUBLIC_STRAPI_API_URL + blog.attributes.featured.data.attributes.url} alt={blog.attributes.title} width={600} height={400} class="object-cover object-center h-full w-full" />
                        )}
                    </div>
                    <div class="flex flex-col sm:flex-row mt-10">
                        <div class="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                            <div class="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10" viewBox="0 0 24 24">
                                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </div>
                            <div class="flex flex-col items-center text-center justify-center">
                                <h2 class="font-medium title-font mt-4 text-gray-900 text-lg">{blog.attributes.author.data.attributes.name}</h2>
                                <div class="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
                                <p class="text-base">{blog.attributes.author.data.attributes.email}</p>
                            </div>
                        </div>
                        <div class="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                            <p class="leading-relaxed text-lg mb-4">{blog.attributes.body}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlogPage;
