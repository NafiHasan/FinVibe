
import NavigationBar from './NavigationBar'
import {useLocation} from 'react-router-dom';
import '../styles/MakePost.css'
import { useState } from 'react';

function MakePost(){
    const location = useLocation();

    let username = location.state.username

    return(
        <div>
            <NavigationBar username = {username}/>

            <MakePostBody username = {username}/>
        </div>
    )
}

function MakePostBody(props) {
    function createPost(){

    }

    const [selectedImages, setSelectedImages] = useState([]);

    const onSelectFile = (event) => {
      const selectedFiles = event.target.files;
      const selectedFilesArray = Array.from(selectedFiles);

      const imagesArray = selectedFilesArray.map((file) => {
        return URL.createObjectURL(file);
      });

      setSelectedImages((previousImages) => previousImages.concat(imagesArray));

      // FOR BUG IN CHROME
      event.target.value = "";
    };

    function deleteHandler(image) {
      setSelectedImages(selectedImages.filter((e) => e !== image));
      URL.revokeObjectURL(image);
    }

    return (
        <div className='makePostBody'>
            <div className='left'>
                <input type='text' className='postTextBox'></input>
            </div>


            <div className='right'>
                <div>
                            <input
                      type="file"
                      name="images"
                      onChange={onSelectFile}
                      multiple
                      accept="image/png , image/jpeg, image/webp"
                    />
              
                </div>
                <button onClick={createPost}>Post</button>
            </div>


        </div>
    )
}

export default MakePost