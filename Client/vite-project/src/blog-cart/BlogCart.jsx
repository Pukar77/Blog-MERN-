import React, { useEffect, useState } from "react";

function BlogCart() {
  const getToken = () => {
    return localStorage.getItem("accesstoken");
  };

  const deleteApi = async (id) => {
    const token = getToken();

    let response = await fetch(
      `http://localhost:8000/api/deleteblog/delete/${id}`,
      {
        method: "delete",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    let data = await response.json();
    console.log(data);
  };
  const showConfirm = (id) => {
    let z = confirm("Are you sure you want to delete this blog");
    if (z) {
      deleteApi(id);
    }
  };

  const [blogList, setBlogList] = useState([]);

  const displayBlog = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/guest/welcome", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setBlogList(data.allBlogs); // Set the fetched data to `blogList`.
      // console.log("all blogs is ", blogList);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    displayBlog();
  }, []);

  const deleteBlog = async () => {};

  return (
    <>
      <div className="flex flex-wrap gap-9 justify-center">
        {blogList && blogList.length > 0
          ? blogList.map((blog, index) => {
              return (
                <div key={index} className="">
                  <div>
                    {" "}
                    <div className="w-80 overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200 ">
                      <figure>
                        <img
                          src={blog.url}
                          alt="card image"
                          className="aspect-video w-full"
                        />
                      </figure>
                      <div className="p-6">
                        <header className="mb-4 flex gap-4">
                          <a
                            href="#"
                            className="relative inline-flex h-12 w-12 items-center justify-center rounded-full text-white"
                          >
                            <img
                              src="https://i.pravatar.cc/48?img=25"
                              alt="user name"
                              title="user name"
                              width="48"
                              height="48"
                              className="max-w-full rounded-full"
                            />
                          </a>
                          <div>
                            <h3 className="text-xl font-medium text-slate-700">
                              {blog.title}
                            </h3>
                            <p className="text-sm text-slate-400">
                              {blog.updatedAt}
                            </p>
                          </div>
                        </header>
                        <p>{blog.text}</p>
                      </div>
                      =
                      <div className="flex justify-end gap-2 p-2 pt-0">
                        <button className="inline-flex h-10 items-center justify-center gap-2 justify-self-center whitespace-nowrap rounded px-5 text-sm font-medium tracking-wide text-emerald-500 transition duration-300 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:text-emerald-300 disabled:shadow-none disabled:hover:bg-transparent">
                          <span>Read more</span>
                        </button>

                        <button
                          onClick={() => showConfirm(blog._id)}
                          className="inline-flex h-10 items-center justify-center gap-2 justify-self-center whitespace-nowrap rounded px-5 text-sm font-medium tracking-wide text-red-500 transition duration-300 hover:bg-red-200 hover:text-red-800 focus:text-red-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:text-emerald-300 disabled:shadow-none disabled:hover:bg-transparent"
                        >
                          Delete blog
                        </button>

                        <button className="inline-flex h-10 items-center justify-center gap-2 justify-self-center whitespace-nowrap rounded px-5 text-sm font-medium tracking-wide text-emerald-500 transition duration-300 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:text-emerald-300 disabled:shadow-none disabled:hover:bg-transparent">
                          <span>Like</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          : "Error Fetching BLog"}
      </div>
      {/* {blogList.map((blog, value) => {
        return (
          <div key={value}>
          
          <div className="w-80 overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200">
          
              <figure>
                <img
                  src="https://picsum.photos/id/1081/800/600"
                  alt="card image"
                  className="aspect-video w-full"
                />
              </figure>
             
              <div className="p-6">
                <header className="mb-4 flex gap-4">
                  <a
                    href="#"
                    className="relative inline-flex h-12 w-12 items-center justify-center rounded-full text-white"
                  >
                    <img
                      src="https://i.pravatar.cc/48?img=25"
                      alt="user name"
                      title="user name"
                      width="48"
                      height="48"
                      className="max-w-full rounded-full"
                    />
                  </a>
                  <div>
                    <h3 className="text-xl font-medium text-slate-700">
                      {blod.title}
                    </h3>
                    <p className="text-sm text-slate-400">
                      {blogList.createdat}
                    </p>
                  </div>
                </header>
                <p>{blogList.text}</p>
              </div>
           =
              <div className="flex justify-end gap-2 p-2 pt-0">
                <button className="inline-flex h-10 items-center justify-center gap-2 justify-self-center whitespace-nowrap rounded px-5 text-sm font-medium tracking-wide text-emerald-500 transition duration-300 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:text-emerald-300 disabled:shadow-none disabled:hover:bg-transparent">
                  <span>Read more</span>
                </button>
              </div>
            </div>
        
          </div>
        );
      })} */}
    </>
  );
}

export default BlogCart;
