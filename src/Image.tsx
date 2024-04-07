import React from "react";
import {ImageType} from "./typings.ts";
import ImageUploading from "./ImageUploading.tsx";

interface IImageProps {
    styles?: string;
}

export const Image: React.FC<IImageProps> = ({ styles }) => {

    const [image, setImage] = React.useState<ImageType | null>(null);


    const onChange = (imageList: ImageType[]) => {
        setImage(imageList[0] || null);
        console.log('Number', Number(true))
    };

    return (
        <ImageUploading
            value={image ? [image] : []}
            onChange={onChange}
        >
            {({
                  onImageUpdate,

              }) => (
                <section className={styles}>
                    <div className='polygon' >
                        <h2>Name</h2>
                    </div>

                            <button
                                onClick={() => onImageUpdate(0)}
                            />

                    <img src={image?.dataURL || 'vite.svg'} alt='photo'/>
                </section>
            )}
        </ImageUploading>
    )
}