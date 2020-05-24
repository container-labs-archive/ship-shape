import Blob from 'blob';
import createObjectURL from 'create-object-url';

// from http://stackoverflow.com/questions/283956/
const save = (uri, filename) => {
  const link = document.createElement('a');
  if (typeof link.download === 'string') {
    // Firefox requires the link to be in the body
    document.body.appendChild(link);
    link.download = filename;
    link.href = uri;
    link.click();

    // remove the link when done
    document.body.removeChild(link);
  } else {
    location.replace(uri);
  }
};

// https://stackoverflow.com/questions/24007073/open-links-made-by-createobjecturl-in-ie11
function createDownloadLink(anchorSelector, str, fileName){
  if(window.navigator.msSaveOrOpenBlob) {
      var fileData = [str];
      blobObject = new Blob(fileData);
      $(anchorSelector).click(function(){
          window.navigator.msSaveOrOpenBlob(blobObject, fileName);
      });
  } else {
      var url = "data:text/plain;charset=utf-8," + encodeURIComponent(str);
      $(anchorSelector).attr("download", fileName);
      $(anchorSelector).attr("href", url);
  }
}


// TODO: https://www.npmjs.com/package/blob-util
export const saveAs = (fileData) => {
  // if(window.navigator.msSaveOrOpenBlob) {
  //   const blobObject = new Blob([fileData.contents], { type: fileData.mime });
  //   $(anchorSelector).click(function(){
  //       window.navigator.msSaveOrOpenBlob(blobObject, fileData.fileName);
  //   });
  // } else {

  // }

  const blob = new Blob([fileData.contents], { type: fileData.mime });
    const url = createObjectURL(blob);
    save(url, fileData.filename);
};
