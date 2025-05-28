package org.zerock.apiserver.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.zerock.apiserver.dto.PageRequestDTO;
import org.zerock.apiserver.dto.PageResponseDTO;
import org.zerock.apiserver.dto.ProductDTO;
import org.zerock.apiserver.service.ProductService;
import org.zerock.apiserver.util.CustomFileUtil;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@Log4j2
@RequiredArgsConstructor
@RequestMapping("/api/products")
public class ProductController {

    private final CustomFileUtil fileUtil;

    private final ProductService productService;
//    @PostMapping("/")
//    public Map<String, String> register(ProductDTO productDTO){
//
//        log.info("register: " + productDTO);
//
//        List<MultipartFile> files = productDTO.getFiles();
//        List<String> uploadedFileNames = fileUtil.saveFiles(files);
//
//        productDTO.setUploadedFileNames(uploadedFileNames);
//        log.info(uploadedFileNames);
//        return Map.of("RESULT", "SUCCESS");
//    }

    @GetMapping("/view/{fileName}")
    public ResponseEntity<Resource> viewFileGET(@PathVariable("fileName") String fileName){
        return fileUtil.getFile(fileName);
    }

//    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
//    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @GetMapping("/list")
    public PageResponseDTO<ProductDTO> list(PageRequestDTO pageRequestDTO){
        return productService.getList(pageRequestDTO);
    }


    @PostMapping("/")
    public Map<String, Long> register(ProductDTO productDTO){

        List<MultipartFile> files = productDTO.getFiles();

        List<String> uploadedFileNames = fileUtil.saveFiles(files);

        productDTO.setUploadedFileNames(uploadedFileNames);

        log.info(uploadedFileNames);
        Long pno = productService.register(productDTO);

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        return Map.of("result", pno);

    }

    @GetMapping("/{pno}")
    public ProductDTO read(@PathVariable("pno") Long pno){
        return productService.get(pno);
    }


    @PutMapping("/{pno}")
    public Map<String, String> modify(@PathVariable("pno") Long pno,
                                       ProductDTO productDTO){
        //업로드 저장
        productDTO.setPno(pno);
        //old product
        ProductDTO oldProductDTO = productService.get(pno);

        //file upload
        List<MultipartFile> files = productDTO.getFiles();
        List<String> currentUploadedFileNames = fileUtil.saveFiles(files);

        //keep files
        List<String> uploadedFileNames = productDTO.getUploadedFileNames();
        // 기존에 저장되고 데이터베이스에도 존재하는 파일
        if(currentUploadedFileNames != null && !currentUploadedFileNames.isEmpty()){
            uploadedFileNames.addAll(currentUploadedFileNames);
        }

        productService.modify(productDTO);

        List<String> oldFileNames = oldProductDTO.getUploadedFileNames();
        if(oldFileNames != null && oldFileNames.size() > 0){
            List<String> removeFiles =
            oldFileNames.stream().filter(fileName -> uploadedFileNames.indexOf(fileName) == -1).collect(Collectors.toList());

            fileUtil.deleteFiles(removeFiles);
        }

        return Map.of("RESULT", "SUCCESS");

    }

    @DeleteMapping("/{pno}")
    public Map<String, String> remove(@PathVariable(name="pno") Long pno){
        List<String> oldFileNames = productService.get(pno).getUploadedFileNames();
        productService.remove(pno);
        fileUtil.deleteFiles(oldFileNames);
        return Map.of("RESULT", "SUCCESS");
    }

}
