import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Modal from "./Modal";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 7,
    slidesToSlide: 7  , // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
    slidesToSlide: 4, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
};

export default function Main({ data }) {

  return (
    <>
      {Object.entries(data).map(([key, value], index) => (
        <div
          key={index}
          className="w-4/5 mx-auto bg-slate-500 mt-8 p-3 rounded-md mb-5"
        >
          <h1 className="text-xl mb-2 ">
            {String(key).charAt(0).toUpperCase() +
              String(key).slice(1).replace("_", " ")}
          </h1>
          <Carousel infinite={true} swipeable={false} responsive={responsive}>
            {value.map((item, index) => (
              <div key={index} className=" rounded-l p-0.5">
                <img
                  src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                  className="w-full h-42 rounded-lg"
                  alt={item.title}
                />
                <section className="text-start">
                <h1 className="font-semibold ">{item.title}</h1>
                <p className="text-sm">Release : {item.release_date}</p>
                {/* <p>{item.overview}</p> */}
              </section>
              </div>
            ))}
          </Carousel>
        </div>
      ))}
    </>
  );
}

{
  /* <h1>{text}</h1>
  <Carousel infinite={true} swipeable={false} responsive={responsive}>
    {recomendation.map((item, index) => (
      <div key={index} className="bg-white rounded-xl p-2 mr-3">
        <img
          src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
          className="w-full h-42 rounded-lg"
          alt={item.Title}
        />
        <section className="text-start">
          <h1 className="font-semibold ">{item.title}</h1>
          <p className="text-sm">Realese : {item.release_date}</p>
          <p>{item.overview}</p>
        </section>
      </div>
    ))}
  </Carousel> */
}
