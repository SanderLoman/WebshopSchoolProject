import React, { useState, useCallback, useRef, useEffect } from "react"
import ReactCrop from "react-image-crop"
import "react-image-crop/dist/ReactCrop.css"

const ImageCropperModal = ({ src, onImageCropped, onClose }) => {
    // Initialize the crop state with a default non-zero width and height.
    const [crop, setCrop] = useState({
        unit: "%",
        aspect: 1,
        width: 0,
        height: 0,
        x: 0,
        y: 0,
    })

    const imgRef = useRef(null)
    const [isLoading, setIsLoading] = useState(false)
    const [croppedImageBlobUrl, setCroppedImageBlobUrl] = useState(null)

    const onCropComplete = useCallback((crop) => {
        console.log("onCropComplete called with crop:", crop)
        console.log("imgRef.current:", imgRef.current)
        if (imgRef.current && crop.width && crop.height) {
            console.log("Calling getCroppedImg")
            setIsLoading(true)
            getCroppedImg(imgRef.current, crop, "newFile.jpeg")
                .then((url) => {
                    console.log("Cropped image URL:", url)
                    setCroppedImageBlobUrl(url)
                    setIsLoading(false)
                })
                .catch((error) => {
                    console.error("Error in cropping the image:", error)
                    setIsLoading(false)
                })
        }
    }, [])

    // Function to crop the image and return a URL
    const getCroppedImg = (image, crop, fileName) => {
        console.log("Entering getCroppedImg")

        const canvas = document.createElement("canvas")
        const scaleX = image.naturalWidth / image.width
        const scaleY = image.naturalHeight / image.height
        canvas.width = crop.width
        canvas.height = crop.height

        const ctx = canvas.getContext("2d")

        console.log(
            `Canvas size: ${canvas.width}x${canvas.height}, Scale: ${scaleX}, ${scaleY}`,
        )

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height,
        )

        return new Promise((resolve, reject) => {
            canvas.toBlob((blob) => {
                if (!blob) {
                    console.error("Canvas is empty")
                    reject(new Error("Canvas is empty"))
                    return
                }
                console.log("Blob created:", blob)
                const blobUrl = URL.createObjectURL(blob)
                console.log("Blob URL:", blobUrl)
                resolve(blobUrl)
            }, "image/jpeg")
        })
    }

    // Debug: Log state changes
    useEffect(() => {
        console.log("isLoading:", isLoading)
        console.log("croppedImageBlobUrl:", croppedImageBlobUrl)
    }, [isLoading, croppedImageBlobUrl])

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-gray-500 bg-opacity-50 max-h-full overflow-y-auto"
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
                            <svg
                                aria-hidden="true"
                                class="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
                        </button>
                    </div>
                    <div className="p-4 flex items-center justify-center">
                        <ReactCrop
                            src={src}
                            crop={crop}
                            circularCrop
                            aspect={1}
                            minHeight={100}
                            minWidth={100}
                            onChange={(newCrop) => setCrop(newCrop)}
                            onComplete={onCropComplete}
                        >
                            <img
                                src={src}
                                ref={imgRef}
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
                            // disabled={!croppedImageBlobUrl || isLoading}
                            className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
                                !croppedImageBlobUrl || isLoading
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
