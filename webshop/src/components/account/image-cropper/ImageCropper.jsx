import React, { useState, useCallback, useEffect, useRef } from "react"
import ReactCrop from "react-image-crop"
import "react-image-crop/dist/ReactCrop.css"

const ImageCropperModal = ({ src, onImageCropped, onClose }) => {
    const [crop, setCrop] = useState({
        aspect: 1,
    })
    const [completedCrop, setCompletedCrop] = useState(null)
    const imgRef = useRef(null)
    const [croppedImageBlobUrl, setCroppedImageBlobUrl] = useState(null)

    // Handles the loading of the image for cropping
    const onLoad = useCallback((img) => {
        imgRef.current = img

        // Determine the size of the largest square that can fit in the image
        const size = Math.min(img.width, img.height)

        // Center the square crop area
        const x = (img.width - size) / 2
        const y = (img.height - size) / 2

        // Set the initial crop state
        setCrop({
            unit: "px", // You can use 'px' for absolute sizes
            width: size,
            height: size,
            x: x,
            y: y,
            aspect: 1, // Keeps the crop area square
        })
    }, [])

    // Handles the creation of the cropped image
    useEffect(() => {
        if (!completedCrop || !imgRef.current) {
            return
        }

        const image = imgRef.current
        const canvas = document.createElement("canvas")
        const crop = completedCrop

        canvas.width = crop.width
        canvas.height = crop.height
        const ctx = canvas.getContext("2d")

        // Drawing the image on canvas
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

        // Converting the canvas to a Blob and setting the Blob URL
        canvas.toBlob(
            (blob) => {
                const blobUrl = URL.createObjectURL(blob)
                setCroppedImageBlobUrl(blobUrl) // Update the state with the new Blob URL
            },
            "image/jpeg",
            1,
        )
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
                    <div className="p-4 bg-white dark:bg-gray-700 mx-auto">
                        <ReactCrop
                            onImageLoaded={onLoad}
                            circularCrop
                            aspect={1}
                            minHeight={100}
                            minWidth={100}
                            crop={crop}
                            onChange={(newCrop) => setCrop(newCrop)}
                            onComplete={(c) => setCompletedCrop(c)}
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
                            onClick={() =>
                                croppedImageBlobUrl &&
                                onImageCropped(croppedImageBlobUrl)
                            }
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

// !!!
// RECENT CODE
// !!!

// import React, { useState, useCallback, useEffect, useRef } from "react"
// import ReactCrop from "react-image-crop"
// import "react-image-crop/dist/ReactCrop.css"

// const ImageCropperModal = ({ src, onImageCropped, onClose }) => {
//     const [crop, setCrop] = useState({ aspect: 1, width: 75, x: 25, y: 25 })
//     const [completedCrop, setCompletedCrop] = useState(null)
//     const imgRef = useRef(null)

//     const onLoad = useCallback((img) => {
//         imgRef.current = img
//     }, [])

//     useEffect(() => {
//         if (!completedCrop || !imgRef.current) {
//             return
//         }

//         const image = imgRef.current
//         const canvas = document.createElement("canvas")
//         const crop = completedCrop

//         canvas.width = crop.width
//         canvas.height = crop.height
//         const ctx = canvas.getContext("2d")

//         ctx.drawImage(
//             image,
//             crop.x,
//             crop.y,
//             crop.width,
//             crop.height,
//             0,
//             0,
//             crop.width,
//             crop.height,
//         )

//         canvas.toBlob(
//             (blob) => {
//                 onImageCropped(URL.createObjectURL(blob))
//             },
//             "image/jpeg",
//             1,
//         )
//     }, [completedCrop])

//     return (
//         <div
//             className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-gray-500 bg-opacity-50"
//             style={{
//                 backgroundColor: "rgba(0, 0, 0, 0.1)",
//                 backdropFilter: "blur(5px)",
//             }}
//         >
//             <div className="relative w-full max-w-lg max-h-full m-auto bg-white rounded-lg shadow dark:bg-gray-700">
//                 <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
//                     <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
//                         <h3 className="text-xl font-medium text-gray-900 dark:text-white">
//                             Crop Image
//                         </h3>
//                         <button
//                             type="button"
//                             onClick={onClose}
//                             className="dark:text-white text-black"
//                         >
//                             Close
//                         </button>
//                     </div>
//                     <div className="p-4 flex items-center justify-center">
//                         <ReactCrop
//                             src={src}
//                             onImageLoaded={onLoad}
//                             crop={crop}
//                             onChange={(newCrop) => setCrop(newCrop)}
//                             onComplete={(c) => setCompletedCrop(c)}
//                         >
//                             {/* <ReactCrop
//                             crop={crop}
//                             circularCrop
//                             keepSelection
//                             aspect={1}
//                             minWidth={100}
//                             minHeight={100}
//                             onImageLoaded={onImageLoaded}
//                             onComplete={onCropComplete}
//                             onChange={(newCrop) => {
//                                 setCrop(newCrop)
//                                 console.log(newCrop)
//                             }}
//                         > */}
//                             <img
//                                 src={src}
//                                 alt="PFP"
//                                 className="border-2 border-gray-200 dark:border-gray-600 select-none"
//                             />
//                         </ReactCrop>
//                     </div>

//                     <div className="flex items-center p-4 border-t border-gray-200 rounded-b dark:border-gray-600">
//                         <button
//                             onClick={() => onImageCropped(croppedImageUrl)}
//                             className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//                         >
//                             Use this Image
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ImageCropperModal

// !!!
// OLD CODE
// !!!

// import React, { useState, useCallback } from "react"
// import ReactCrop from "react-image-crop"
// import "react-image-crop/dist/ReactCrop.css"

// const ImageCropperModal = ({ src, onImageCropped, onClose }) => {
//     const [crop, setCrop] = useState({
//         unit: "%",
//         width: 75,
//         height: 75,
//         x: 25,
//         y: 25,
//     })

//     const [croppedImageUrl, setCroppedImageUrl] = useState(null)
//     const [imageRef, setImageRef] = useState(null)

//     const onCropComplete = useCallback(
//         (crop) => {
//             if (imageRef && crop.width && crop.height) {
//                 const croppedImageUrl = getCroppedImg(imageRef, crop)
//                 setCroppedImageUrl(croppedImageUrl)
//                 console.log(croppedImageUrl)
//             }
//         },
//         [imageRef],
//     )

//     const onImageLoaded = useCallback((image) => {
//         setImageRef(image)
//     }, [])

//     const getCroppedImg = (image, crop) => {
//         try {
//             const canvas = document.createElement("canvas")
//             const scaleX = image.naturalWidth / image.width
//             const scaleY = image.naturalHeight / image.height
//             canvas.width = crop.width
//             canvas.height = crop.height
//             const ctx = canvas.getContext("2d")

//             ctx.drawImage(
//                 image,
//                 crop.x * scaleX,
//                 crop.y * scaleY,
//                 crop.width * scaleX,
//                 crop.height * scaleY,
//                 0,
//                 0,
//                 crop.width,
//                 crop.height,
//             )

//             return canvas.toDataURL("image/jpeg")
//         } catch (error) {
//             console.error("Error creating cropped image URL:", error)
//         }
//     }

//     return (
//         <div
//             className="fixed inset-0 z-50 flex items-center justify-center p-4"
//             style={{
//                 backgroundColor: "rgba(0, 0, 0, 0.1)",
//                 backdropFilter: "blur(5px)",
//             }}
//         >
//             <div className="relative w-full max-w-lg max-h-full m-auto">
//                 <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
//                     <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
//                         <h3 className="text-xl font-medium text-gray-900 dark:text-white">
//                             Crop Image
//                         </h3>
//                         <button
//                             type="button"
//                             onClick={onClose}
//                             className="dark:text-white text-black"
//                         >
//                             Close
//                         </button>
//                     </div>
//                     <div className="p-4 flex items-center justify-center">
//                         <ReactCrop
//                             crop={crop}
//                             circularCrop
//                             keepSelection
//                             aspect={1}
//                             minWidth={100}
//                             minHeight={100}
//                             onImageLoaded={onImageLoaded}
//                             onComplete={onCropComplete}
//                             onChange={(newCrop) => {
//                                 setCrop(newCrop)
//                                 console.log(newCrop)
//                             }}
//                         >
//                             <img
//                                 src={src}
//                                 alt="PFP"
//                                 className="border-2 border-gray-200 dark:border-gray-600 select-none"
//                             />
//                         </ReactCrop>
//                     </div>

//                     <div className="flex items-center p-4 border-t border-gray-200 rounded-b dark:border-gray-600">
//                         <button
//                             onClick={() => onImageCropped(croppedImageUrl)}
//                             className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//                         >
//                             Use this Image
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ImageCropperModal
