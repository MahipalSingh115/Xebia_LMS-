package com.lms.backend.batch;

import com.lms.backend.common.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/batches")
public class BatchController {

    @Autowired
    private BatchService batchService;

    @GetMapping
    public ApiResponse<?> getBatches(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "name") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir,
            @RequestParam(defaultValue = "false") boolean all) {
        
        org.springframework.data.domain.Sort sort = sortDir.equalsIgnoreCase("desc")
                ? org.springframework.data.domain.Sort.by(sortBy).descending()
                : org.springframework.data.domain.Sort.by(sortBy).ascending();
        
        if (all) {
            return new ApiResponse<>(batchService.getBatches(q, status, sort));
        }
        
        org.springframework.data.domain.Pageable pageable = org.springframework.data.domain.PageRequest.of(page, size, sort);
        return new ApiResponse<>(batchService.getBatchesPaginated(q, status, pageable));
    }

    @GetMapping("/stats")
    public ApiResponse<Map<String, Object>> getBatchStats() {
        return new ApiResponse<>(batchService.getBatchStats());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Batch>> getBatchById(@PathVariable String id) {
        return batchService.getBatchById(id)
                .map(batch -> ResponseEntity.ok(new ApiResponse<>(batch)))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Batch>> createBatch(@RequestBody Batch batch) {
        Batch created = batchService.createBatch(batch);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse<>(created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Batch>> updateBatch(@PathVariable String id, @RequestBody Batch batch) {
        return batchService.updateBatch(id, batch)
                .map(updated -> ResponseEntity.ok(new ApiResponse<>(updated)))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Boolean>> deleteBatch(@PathVariable String id) {
        boolean deleted = batchService.deleteBatch(id);
        if (deleted) {
            return ResponseEntity.ok(new ApiResponse<>(true));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
