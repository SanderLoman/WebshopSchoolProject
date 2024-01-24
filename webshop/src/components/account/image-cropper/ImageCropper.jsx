import React, { useState, useCallback, useEffect, useRef } from "react"
import ReactCrop from "react-image-crop"
import "react-image-crop/dist/ReactCrop.css"

const ImageCropperModal = ({ src, onImageCropped, onClose }) => {
    const [crop, setCrop] = useState({
        aspect: 1,
        unit: "px",
        // These null values prevent errors from being thrown, and it works just the same
        width: null,
        height: null,
        x: null,
        y: null,
    })
    const imgRef = useRef(null)
    const [completedCrop, setCompletedCrop] = useState(null)
    const [croppedImageBlobUrl, setCroppedImageBlobUrl] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    // Handles the loading of the image for cropping
    const onLoad = useCallback((img) => {
        console.log("Image loaded", img)
        imgRef.current = img

        const size = Math.min(img.width, img.height)

        const x = (img.width - size) / 2
        const y = (img.height - size) / 2

        setCrop({
            unit: "px",
            width: size,
            height: size,
            x: x,
            y: y,
            aspect: 1,
        })
    }, [])

    // Handles the creation of the cropped image
    useEffect(() => {
        if (!completedCrop || !imgRef.current) {
            console.log("useEffect skipped - invalid crop or image ref")
            return
        }

        console.log("useEffect activated - creating blob URL")

        setIsLoading(true) // Start loading

        const image = imgRef.current
        const canvas = document.createElement("canvas")
        const crop = completedCrop

        if (crop.width && crop.height) {
            canvas.width = crop.width
            canvas.height = crop.height
            const ctx = canvas.getContext("2d")

            ctx.drawImage(
                image,
                crop.x,
                crop.y,
                crop.width,
                crop.height,
                0,
                0,
                crop.width,
                crop.height,
            )

            console.log("Drawing on canvas complete - calling toBlob")

            canvas.toBlob(
                (blob) => {
                    if (blob) {
                        const blobUrl = URL.createObjectURL(blob)
                        console.log("Blob created, setting URL:", blobUrl)
                        setCroppedImageBlobUrl(blobUrl) // Update the state with the new Blob URL
                    } else {
                        console.error(
                            "Blob could not be created from the canvas.",
                        )
                    }
                    setIsLoading(false) // End loading
                },
                "image/jpeg",
                1,
            )
        } else {
            console.error("Invalid crop size:", crop)
            setIsLoading(false)
        }
    }, [completedCrop])

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-gray-500 bg-opacity-50"
            style={{
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(5px)",
            }}
        >
            <div className="relative w-full max-w-lg max-h-full m-auto bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            Crop Image
                        </h3>
                        <button
                            type="button"
                            onClick={onClose}
                            className="dark:text-white text-black"
                        >
                            Close
                        </button>
                    </div>
                    <div className="p-4 flex items-center justify-center">
                        <ReactCrop
                            onImageLoaded={onLoad}
                            circularCrop
                            aspect={1}
                            minHeight={100}
                            minWidth={100}
                            crop={crop}
                            onChange={(newCrop) => setCrop(newCrop)}
                            onComplete={(c) => {
                                console.log("Crop completed", c)
                                setCompletedCrop(c)
                            }}
                        >
                            <img
                                src={src}
                                alt="PFP"
                                className="border-2 border-gray-200 dark:border-gray-600 select-none"
                            />
                        </ReactCrop>
                    </div>
                    <div className="flex items-center p-4 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button
                            onClick={() => {
                                if (croppedImageBlobUrl) {
                                    onImageCropped(croppedImageBlobUrl)
                                    onClose()
                                }
                            }}
                            disabled={!croppedImageBlobUrl || isLoading} // Disable button if loading or blob URL is not set
                            className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer ${
                                !completedCrop ||
                                !completedCrop.width ||
                                !completedCrop.height
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                            }`}
                        >
                            Use this Image
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImageCropperModal
