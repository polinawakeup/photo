function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
  
    fileReader.addEventListener('load', evt => {
      resolve(evt.currentTarget.result as string);
    });
    
    fileReader.addEventListener('error', evt => {
      reject(new Error((evt.currentTarget as FileReader).error?.toString()));
    });
    
    fileReader.readAsDataURL(file);
  });
}

export default fileToDataUrl;