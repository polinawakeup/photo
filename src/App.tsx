import { useState } from 'react'
import './App.css'
import fileToDataUrl from './utils/fileToDataUrl';

interface Photo {
  dataURL: string;
}

function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);

  const handleSelect = async (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files) {
      const files = Array.from(evt.target.files);
      const urls = await Promise.all(files.map(o => fileToDataUrl(o)));
      
      setPhotos(prevState => [...prevState, ...urls.map(u => ({ dataURL: u }))])
    }
  }

  function handleDelete(id: string): void {
    setPhotos(prevState => prevState.filter(photo => photo.dataURL !== id));
  }

  return (
    <>
      <div className='input_container'>
        <div className='overlay'>Click to select</div>
        <input type="file" className="hiddenInput" onChange={handleSelect}/>
      </div>
      <div className='gallery'>
        {photos.map((photo, index) => (
          <div className='preview_container'>
            <img
              src={photo.dataURL}
              alt={`Photo ${index + 1}`}
              key={index}
              className="preview"
            />
            <button
              className='delete'
              onClick={() => handleDelete(photo.dataURL)}>
            ×</button>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
