import * as React from "react";
 
import ImageUploading from "react-images-uploading";
// { ImageUploadingPropsType, ImageListType, ImageType } is type for typescript
 
const maxNumber = 10;
const maxMbFileSize = 5 * 1024 * 1024; // 5Mb
 
class ImageUpload extends React.Component {
  constructor(){
    super();
    this.state = {
      dataUrl: ""
    }
  }
  onChange = (imageList) => {
    // data for submit
    this.setState({dataUrl: imageList[0].dataURL});
    console.log(imageList);
  };
  render() {
    return (
      <div>
      <ImageUploading
        onChange={this.onChange}
        maxNumber={maxNumber}
        multiple
        maxFileSize={maxMbFileSize}
        acceptType={["jpg", "gif", "png"]}
      >
        {({ imageList, onImageUpload, onImageRemoveAll }) => 
          (
          // write your building UI
          <div>
            <button onClick={onImageUpload}>Upload images</button>
            <button onClick={onImageRemoveAll}>Remove all images</button>
 
            {imageList.map((image) => (
              <div key={image.key}>
                <img src={image.dataURL} />
                <button onClick={image.onUpdate}>Update</button>
                <button onClick={image.onRemove}>Remove</button>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
      <div>
        {this.state.dataUrl ? <img src={this.state.dataUrl}/>: ''}
      </div>
    </div>
    );
  }
}

export default ImageUpload;