import './App.css'
import ImageUploading, {ErrorsType, ImageListType} from "./ImageUploading.tsx";
import {useState} from "react";
import {ExportInterface} from "./typings.ts";

const App = () => {
    const [images, setImages] = useState<ImageListType>([]);
    const maxNumber = 69;

    const onChange = (imageList: ExportInterface['imageList']) => {
        // data for submit
        console.log('Images', imageList);
        setImages(imageList);
    };

    const onError = (errors: ErrorsType, files?: ImageListType) => {
        console.log('Error', errors, files);
    };

    return (
        <div className="App">
            <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                onError={onError}
                maxNumber={maxNumber}
                dataURLKey="data_url"
            >
                {({
                      imageList,
                      onImageUpload,
                      onImageRemoveAll,
                      onImageUpdate,
                      onImageRemove,
                      dragProps,
                      errors,
                  }: ExportInterface) => (
                    <div className="upload__image-wrapper">
                        <button
                            type="button"
                            onClick={onImageUpload}
                            {...dragProps}
                        >
                            Click or Drop here
                        </button>
                        &nbsp;
                        <button type="button" onClick={onImageRemoveAll}>
                            Remove all images
                        </button>
                        {imageList.map((image, index) => (
                            <div key={`image-${index}`} className="image-item">
                                {typeof image.data_url === 'string' && (
                                    <img src={image.data_url} alt="" width="100" />
                                )}
                                <div className="image-item__btn-wrapper">
                                    <button type="button" onClick={() => onImageUpdate(index)}>
                                        Update
                                    </button>
                                    <button type="button" onClick={() => onImageRemove(index)}>
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                        {errors && (
                            <div>
                                {errors.maxNumber && (
                                    <span>Number of selected images exceed maxNumber</span>
                                )}
                                {errors.acceptType && (
                                    <span>Your selected file type is not allow</span>
                                )}
                                {errors.maxFileSize && (
                                    <span>Selected file size exceed maxFileSize</span>
                                )}
                                {errors.resolution && (
                                    <span>
                    Selected file is not match your desired resolution
                  </span>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </ImageUploading>
        </div>
    );
};

export default App;
