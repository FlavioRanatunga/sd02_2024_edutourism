package com.EduExplore.System.controller;



import com.google.api.services.drive.Drive;
import com.google.api.services.drive.model.File;
import com.google.api.client.http.FileContent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

@RestController
@RequestMapping("/upload")
@CrossOrigin
public class FileUploadController {
    private static final Logger logger = LoggerFactory.getLogger(FileUploadController.class);

    @Autowired
    private Drive driveService;

    // The folder ID of 'EduExplore' folder
    private static final String EDU_EXPLORE_FOLDER_ID = "1lNR41rkiaJi4KDP8cL58Bus81jhPSvML";

    @PostMapping("/img")
    public String uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            // Create a temporary file for uploading
            Path tempFilePath = Files.createTempFile(null, null);
            file.transferTo(tempFilePath.toFile());

            // Set file metadata with the parent folder ID
            File fileMetadata = new File();
            fileMetadata.setName(file.getOriginalFilename());
            fileMetadata.setMimeType(file.getContentType());
            fileMetadata.setParents(java.util.Collections.singletonList(EDU_EXPLORE_FOLDER_ID));

            // Upload the file to Google Drive
            FileContent mediaContent = new FileContent(file.getContentType(), tempFilePath.toFile());
            File uploadedFile = driveService.files().create(fileMetadata, mediaContent)
                    .setFields("id, webViewLink") // Include webViewLink in response
                    .execute();

            String webViewLink = uploadedFile.getWebViewLink(); // Get the direct view link
            logger.info("File uploaded successfully. View link: " + webViewLink);
            String reactImagelink = "https://drive.google.com/thumbnail?id="+uploadedFile.getId();
            return reactImagelink; // Return the view link to the client
        } catch (IOException e) {
            e.printStackTrace();
            return "Error uploading file";
        }
    }
}
