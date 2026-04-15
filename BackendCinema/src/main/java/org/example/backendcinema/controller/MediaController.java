package org.example.backendcinema.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

@RestController
public class MediaController {

    @Value("${upload.path}")
    private String uploadPath;

    @GetMapping("/uploads/{filename:.+}")
    public ResponseEntity<Resource> serveMedia(@PathVariable String filename) throws IOException {
        File file = new File(uploadPath + "/" + filename);

        System.out.println("DEBUG: Żądanie pliku: " + filename);

        if (!file.exists()) {
            return ResponseEntity.notFound().build();
        }

        String contentType = Files.probeContentType(file.toPath());
        if (contentType == null) {
            contentType = filename.endsWith(".mov") ? "video/quicktime" : "video/mp4";
        }
        
        Resource resource = new FileSystemResource(file);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.ACCEPT_RANGES, "bytes")
                .header(HttpHeaders.CACHE_CONTROL, "no-cache")
                .body(resource);
    }
}