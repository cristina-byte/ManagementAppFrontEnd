import { BlobServiceClient, ContainerClient} from '@azure/storage-blob';


const sasToken = 'sv=2021-06-08&ss=b&srt=sco&sp=rwdlaciytfx&se=2023-01-28T18:29:44Z&st=2023-01-19T10:29:44Z&spr=https&sig=srKlbgDZdRPo9UGmh2R6A06EdXaRHAXR1gvdtq649QM%3D';
const storageAccountName = 'volunteerstorage'; 


// Feature flag - disable storage feature to app if not configured
export const isStorageConfigured = () => {
  return (!storageAccountName || !sasToken) ? false : true;
}


const checkIfBlobExists=async(containerClient,blobName)=>{

  for await (const blob of containerClient.listBlobsFlat()) {
    console.log(blob.name)
    console.log(blobName)
    if(blob.name==blobName)
    return true
  }
return false
}


const createBlobInContainer = async (containerClient, file) => {
  // create blobClient for container
  const blobClient = containerClient.getBlockBlobClient(file.name);

  // set mimetype as determined from browser with file upload control
  const options = { blobHTTPHeaders: { blobContentType: file.type } };

  // upload file
  await blobClient.uploadData(file, options);
}


const uploadFileToBlob = async (file,containerName) => {
  if (!file) return null;

  const blobService = new BlobServiceClient(
    `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
  );

  const containerClient = blobService.getContainerClient(containerName);
  await containerClient.createIfNotExists({
    access: 'container',
  });

  // upload file
  await createBlobInContainer(containerClient, file);

  var exist=await checkIfBlobExists(containerClient,file.name)

  if(exist)
  return `https://${storageAccountName}.blob.core.windows.net/${containerName}/${file.name}`
  else
  return "https://emresolutions.com/assets/imgs/no-image.jpg"
};


export default uploadFileToBlob;