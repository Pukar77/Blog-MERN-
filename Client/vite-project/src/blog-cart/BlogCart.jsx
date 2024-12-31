import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function BlogCart() {
  const getToken = () => {
    return localStorage.getItem("accesstoken");
  };
  const navigate = useNavigate();

  const [blogList, setBlogList] = useState([]);

  const likeapi = async (id) => {
    try {
      const token = getToken();
      const response = await fetch(
        `http://localhost:8000/api/home/like/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

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

  const gotoreadmore = (blog) => {
    navigate("/readmore", { state: { blog } });
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
                        <button
                          onClick={() => {
                            gotoreadmore(blog);
                          }}
                          className="inline-flex h-10 items-center justify-center gap-2 justify-self-center whitespace-nowrap rounded px-5 text-sm font-medium tracking-wide text-emerald-500 transition duration-300 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:text-emerald-300 disabled:shadow-none disabled:hover:bg-transparent"
                        >
                          <span>Read more</span>
                        </button>

                        <button
                          onClick={() => {
                            likeapi(blog._id);
                          }}
                          className="inline-flex h-10 items-center justify-center gap-2 justify-self-center whitespace-nowrap rounded px-5 text-sm font-medium tracking-wide text-emerald-500 transition duration-300 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:text-emerald-300 disabled:shadow-none disabled:hover:bg-transparent"
                        >
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
