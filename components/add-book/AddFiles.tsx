import React from "react";
import { Box, Button, Divider, Image, Stack, Text } from "@chakra-ui/react";
import ImageUploading from "react-images-uploading";
import { DeleteIcon, EditIcon, CloseIcon } from "@chakra-ui/icons";
import LogoPdf from "../../icons/LogoPdf";
import Upload from "rc-upload";

const AddFiles = (props: any) => {
  const {
    imageError,
    setBookFile,
    bookFile,
    bookFileError,
    setImages,
    images,
    setImageError,
    setBookFileError
  } = props;
  const maxNumber = 1;
  // const [image, setImage] = React.useState<any>();
  
  const [isLoading, setIsLoading] = React.useState(false);
  const onChangeImage = (imageList: any, addUpdateIndex: any) => {
    // data for submit
    setImages(imageList);
    setImageError(false)
  };

  const uploaderProps: any = {
    customRequest({
      action,
      data,
      file,
      filename,
      headers,
      onError,
      onProgress,
      onSuccess,
      withCredentials,
    }: any) {
      if (onProgress) {
        setIsLoading(true);
      }
      if (file) {
        setIsLoading(false);
        setBookFile(file);
      //  setBookFileError(false);
      }
    },
  };

  return (
    <Stack spacing={10}>
      <Stack>
        <ImageUploading
          multiple={false}
          value={images}
          onChange={onChangeImage}
          maxNumber={maxNumber}
          dataURLKey="data_url"
        >
          {({
            imageList,
            onImageUpload,
            onImageUpdate,
            isDragging,
            dragProps,
            onImageRemove,
          }) => (
            // write your building UI
            <div className="upload__image-wrapper">
              <Button
                colorScheme={"brand"}
                _hover={{ bg: "pink.300" }}
                style={isDragging ? { color: "red" } : undefined}
                onClick={onImageUpload}
                {...dragProps}
              >
                Add Image
              </Button>

              {images && images.length > 0 ? (
                imageList.map((image, index) => (
                  <div key={index}>
                    <Image
                      src={image["data_url"]}
                      alt=""
                      w={"17rem"}
                      mt={"20px"}
                      h={"17rem"}
                    />
                    <Stack
                      spacing={2}
                      direction={"row"}
                      pt={5}
                      align={"center"}
                    >
                      <EditIcon
                        onClick={() => onImageUpdate(index)}
                        fontSize={"2rem"}
                        cursor={"pointer"}
                        color="black"
                        _hover={{ color: "pink.300" }}
                      />

                      <DeleteIcon
                        onClick={() => onImageRemove(index)}
                        fontSize={"2rem"}
                        cursor={"pointer"}
                        color="black"
                        _hover={{ color: "pink.300" }}
                      />
                    </Stack>
                  </div>
                ))
              ) : (
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"
                  alt=""
                  w={"17rem"}
                  h={"17rem"}
                  mt={"20px"}
                />
              )}
            </div>
          )}
        </ImageUploading>
        <Text color={"red"}>{imageError && " please add an image "}</Text>
      </Stack>
      <Divider />
      <Stack>
        <Upload {...uploaderProps}>
          <Button isLoading={isLoading} colorScheme={"brand"}>
            Upload Book
          </Button>
        </Upload>
        <Text color={"red.50"}>{bookFileError && "please add your book !"}</Text>
        {bookFile && (
          <Box>
            <LogoPdf />
            <Stack spacing={2} direction="row" align={"center"}>
              <Box>{bookFile.name}</Box>
              <DeleteIcon
                onClick={() => setBookFile(null)}
                fontSize={"1rem"}
                cursor={"pointer"}
                color="black"
                _hover={{ color: "pink.300" }}
              />
            </Stack>
          </Box>
        )}
        <Divider />
      </Stack>
    </Stack>
  );
};

export default AddFiles;
