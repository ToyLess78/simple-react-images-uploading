# simple-react-images-uploading



## Installation

**npm**

```bash
npm install --save react-images-uploading
```

**yarn**

```bash
yarn add react-images-uploading
```

## Usage

You can check out the basic demo here:

- Javascript: [https://codesandbox.io/s/react-images-uploading-demo-u0khz](https://codesandbox.io/s/react-images-uploading-demo-u0khz)
- Typescript: [https://codesandbox.io/s/react-images-uploading-demo-typescript-fr2zm](https://codesandbox.io/s/react-images-uploading-demo-typescript-fr2zm)
- Server Side rendering (NextJS): [https://codesandbox.io/s/react-images-uploading-ssr-j1qq2](https://codesandbox.io/s/react-images-uploading-ssr-j1qq2)

**Basic**

```tsx
import React from 'react';
import ImageUploading from 'react-images-uploading';

export function App() {
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  return (
    <div className="App">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <button
              style={isDragging ? { color: 'red' } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </button>
            &nbsp;
            <button onClick={onImageRemoveAll}>Remove all images</button>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image['data_url']} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
}
```

**Validation**

```ts
...
  {({ imageList, onImageUpload, onImageRemoveAll, errors }) => (
    errors && <div>
      {errors.maxNumber && <span>Number of selected images exceed maxNumber</span>}
      {errors.acceptType && <span>Your selected file type is not allow</span>}
      {errors.maxFileSize && <span>Selected file size exceed maxFileSize</span>}
      {errors.resolution && <span>Selected file is not match your desired resolution</span>}
    </div>
  )}
...
```

**Drag and Drop**

```tsx
...
  {({ imageList, dragProps, isDragging }) => (
    <div {...dragProps}>
      {isDragging ? "Drop here please" : "Upload space"}
      {imageList.map((image, index) => (
        <img key={index} src={image.data_url} />
      ))}
    </div>
  )}
...
```

## Props

| parameter         | type                                | options                                   | default | description                                                           |
| ----------------- | ----------------------------------- | ----------------------------------------- | ------- | --------------------------------------------------------------------- |
| value             | array                               |                                           | []      | List of images                                                        |
| onChange          | function                            | (imageList, addUpdateIndex) => void       |         | Called when add, update or delete action is called                    |
| dataURLKey        | string                              |                                           | dataURL | Customized field name that base64 of selected image is assigned to    |
| multiple          | boolean                             |                                           | false   | Set `true` for multiple chooses                                       |
| maxNumber         | number                              |                                           | 1000    | Number of images user can select if mode = `multiple`                 |
| onError           | function                            | (errors, files) => void                   |         | Called when it has errors                                             |
| acceptType        | array                               | ['jpg', 'gif', 'png']                     | []      | The file extension(s) to upload                                       |
| maxFileSize       | number                              |                                           |         | Max image size (Byte) and it is used in validation                    |
| resolutionType    | string                              | 'absolute' \| 'less' \| 'more' \| 'ratio' |         | Using for image validation with provided width & height               |
| resolutionWidth   | number                              | > 0                                       |         |                                                                       |
| resolutionHeight  | number                              | > 0                                       |         |                                                                       |
| inputProps        | React.HTMLProps\<HTMLInputElement\> |                                           |         |                                                                       |
| allowNonImageType | boolean                             |                                           | false   | Using for uploading non-image type purpose (E.g. txt, pdf, heic, ...) |

### Note

**resolutionType**

| value    | description                                                              |
| :------- | :----------------------------------------------------------------------- |
| absolute | image's width === resolutionWidth && image's height === resolutionHeight |
| ratio    | (resolutionWidth / resolutionHeight) === (image width / image height)    |
| less     | image's width < resolutionWidth && image's height < resolutionHeight     |
| more     | image's width > resolutionWidth && image's height > resolutionHeight     |

## Exported options

| parameter        | type                                      | description                                                         |
| :--------------- | :---------------------------------------- | :------------------------------------------------------------------ |
| imageList        | array                                     | List of images to render.                                           |
| onImageUpload    | function                                  | Called when an element is clicks and triggers to open a file dialog |
| onImageRemoveAll | function                                  | Called when removing all images                                     |
| onImageUpdate    | (updateIndex: number) => void             | Called when updating an image at `updateIndex`.                     |
| onImageRemove    | (deleteIndex: number \| number[]) => void | Called when removing one or list image.                             |
| errors           | object                                    | Exported object of validation                                       |
| dragProps        | object                                    | Native element props for drag and drop feature                      |
| isDragging       | boolean                                   | "true" if an image is being dragged                                 |



