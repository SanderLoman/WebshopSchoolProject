import React, { useState, useCallback } from "react"
import ReactCrop from "react-image-crop"
import "react-image-crop/dist/ReactCrop.css"

const ImageCropperModal = ({ src, onImageCropped, onClose }) => {
    // testing around with this
    const [crop, setCrop] = useState()
    const [croppedImageUrl, setCroppedImageUrl] = useState(null)
    const [imageRef, setImageRef] = useState(null)

    const onCropComplete = useCallback(
        (crop) => {
            if (imageRef && crop.width && crop.height) {
                const croppedImageUrl = getCroppedImg(imageRef, crop)
                setCroppedImageUrl(croppedImageUrl)
                console.log(croppedImageUrl)
            }
        },
        [imageRef],
    )

    const onImageLoaded = useCallback((image) => {
        setImageRef(image)
    }, [])

    const getCroppedImg = (image, crop) => {
        try {
            const canvas = document.createElement("canvas")
            const scaleX = image.naturalWidth / image.width
            const scaleY = image.naturalHeight / image.height
            canvas.width = crop.width
            canvas.height = crop.height
            const ctx = canvas.getContext("2d")

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

            return canvas.toDataURL("image/jpeg")
        } catch (error) {
            console.error("Error creating cropped image URL:", error)
        }
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(5px)",
            }}
        >
            <div className="relative w-full max-w-lg max-h-full m-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            Crop Image
                        </h3>
                        <button type="button" onClick={onClose}>
                            {/* Close button icon */}
                        </button>
                    </div>
                    <div className="p-4 mx-auto w-full">
                        <ReactCrop
                            crop={crop}
                            circularCrop
                            keepSelection
                            aspect={1}
                            minWidth={150}
                            ruleOfThirds
                            onImageLoaded={onImageLoaded}
                            onComplete={onCropComplete}
                            onChange={(newCrop) => {
                                setCrop(newCrop)
                                console.log(newCrop)
                            }}
                        >
                            <img
                                src={src}
                                alt="PFP"
                                className="rounded-xl border-2 border-gray-200 dark:border-gray-600"
                            />
                        </ReactCrop>
                    </div>

                    <div className="flex items-center p-4 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button
                            onClick={() => onImageCropped(croppedImageUrl)}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
