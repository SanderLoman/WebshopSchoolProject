import React, { useEffect, useState } from "react"
import Slider from "react-slick"
import photo1 from "../assets/photo1.jpeg"
import photo2 from "../assets/photo2.jpeg"
import photo3 from "../assets/photo3.jpeg"
import photo4 from "../assets/photo4.jpeg"
import photo5 from "../assets/photo5.jpeg"
import photo6 from "../assets/photo6.jpeg"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "./Hero.css"

const Hero = () => {
    const [secondSliderAutoplay, setSecondSliderAutoplay] = useState(false)
    const [key, setKey] = useState(0)

    useEffect(() => {
        const timer = setTimeout(() => {
            setSecondSliderAutoplay(true)
            setKey((prevKey) => prevKey + 1)
        }, 1500)

        return () => clearTimeout(timer)
    }, [])

    const commonSettings = {
        dots: false,
        arrows: false,
        infinite: true,
        pauseOnHover: true,
        autoplaySpeed: 3000,
        draggable: true,
        // fade: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    }

    const firstSliderSettings = {
        ...commonSettings,
        autoplay: true,
    }

    const secondSliderSettings = {
        ...commonSettings,
        autoplay: secondSliderAutoplay,
    }

    return (
        <section className="bg-gray-100 dark:bg-[#1d242c] h-screen">
            <div className="grid max-w-screen-xl px-4 py-52 mx-auto lg:gap-8 xl:gap-0 lg:py-20 lg:grid-cols-12 h-full">
                <div className="mr-auto lg:place-self-center lg:col-span-7">
                    <h1 className="max-w-2xl text-center lg:text-left mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
                        Your Fashion Journey Starts Here.
                    </h1>
                    <p className="max-w-2xl text-center lg:text-left mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                        Discover the latest trends and elevate your style with
                        our curated collection. Quality, comfort, and chic
                        designs await you.
                    </p>
                    <a
                        href="#"
                        className="flex w-max mx-auto lg:mx-0 px-5 py-3 text-base font-medium text-center border rounded-lg text-white ring-4 border-blue-700 bg-blue-700 active:ring-0 transition-all duration-75 ease-in-out"
                    >
                        Go Shopping! →
                    </a>
                </div>
                <div className="hidden lg:grid grid-cols-2 gap-2 lg:mt-0 lg:col-span-5 lg:h-full justify-center items-center rounded-xl">
                    {/* <!-- Top Left (Invisible) --> */}
                    <div className="invisible"></div>

                    {/* <!-- Top Right --> */}
                    <div className="visible bg-transparent drop-shadow-2xl shadow-2xl dark:border-white dark:shadow-gray-900 h-max rounded-xl">
                        <Slider className="-mb-2" {...firstSliderSettings}>
                            <div className="h-full">
                                <img
                                    src={photo1}
                                    alt=""
                                    className="rounded-xl"
                                />
                            </div>
                            <div className="h-full">
                                <img
                                    src={photo2}
                                    alt=""
                                    className="rounded-xl"
                                />
                            </div>
                            <div className="h-full">
                                <img
                                    src={photo3}
                                    alt=""
                                    className="rounded-xl"
                                />
                            </div>
                        </Slider>
                    </div>

                    {/* <!-- Bottom Left --> */}
                    <div className="visible bg-transparentv drop-shadow-2xl shadow-2xl dark:border-white dark:shadow-gray-900 rounded-xl h-max">
                        <Slider
                            key={key}
                            className="-mb-2"
                            {...secondSliderSettings}
                        >
                            <div className="h-full">
                                <img
                                    src={photo4}
                                    alt=""
                                    className="rounded-xl"
                                />
                            </div>
                            <div className="h-full">
                                <img
                                    src={photo5}
                                    alt=""
                                    className="rounded-xl"
                                />
                            </div>
                            <div className="h-full">
                                <img
                                    src={photo6}
                                    alt=""
                                    className="rounded-xl"
                                />
                            </div>
                        </Slider>
                    </div>

                    {/* <!-- Bottom Right (Invisible) --> */}
                    <div className="invisible"></div>
                </div>
            </div>
        </section>
    )
}

export default Hero
