# About File Sharing

File Sharing by <a href="https://www.13xlabs.com/" target="_blank">13X Labs</a> is the simplest way to send your files around the world. <br/> This is Demo Project.

## Features
- Share and receive files using IPFS.
- Upload or drag-and-drop individual files or entire directories
- Preview files in-browser (browser-supported formats only) before sharing or downloading
- Generates a QR code for share links for easy distribution
- 100% mobile-friendly


## Run development

First, run the development server:

```bash
npm run dev
```

## Upload Files 

Upload any files to IPFS (Demo server storj-ipfs.com)

```bash
uploadImage = (e) => { 
    let url = 'https://demo.storj-ipfs.com/api/v0/add'
    if (e.target.files && e.target.files[0]) {
      let file = e.target.files[0];

      let formData = new FormData();
      formData.append("file", file);
      axios.post(url, formData, {
        headers: {
          'Content-Type': `multipart/form-data; boundary= ${file._boundary}`,
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          let precentage = Math.floor((loaded * 100) / total);
          console.log("options");
          console.log(precentage);
          if (precentage <= 100) {
            this.setState({
              precentageUpload: precentage
            })
          }
        }
      }).then((response) => {
        console.log(response)
        this.setState({
          urlImage: response.data.Hash
        })
      }).catch((error) => {
        console.error(error)
      });
    }
  }
```