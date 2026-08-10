package com.lms.backend.trainer;

import com.lms.backend.common.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/trainers")
public class TrainerController {

    @Autowired
    private TrainerService trainerService;

    @GetMapping
    public ApiResponse<?> getAllTrainers(
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
            return new ApiResponse<>(trainerService.getTrainers(q, status, sort));
        }
        
        org.springframework.data.domain.Pageable pageable = org.springframework.data.domain.PageRequest.of(page, size, sort);
        return new ApiResponse<>(trainerService.getTrainersPaginated(q, status, pageable));
    }

    @GetMapping("/stats")
    public ApiResponse<Map<String, Object>> getTrainerStats() {
        return new ApiResponse<>(trainerService.getTrainerStats());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Trainer>> getTrainerById(@PathVariable String id) {
        return trainerService.getTrainerById(id)
                .map(trainer -> ResponseEntity.ok(new ApiResponse<>(trainer)))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Trainer>> createTrainer(@RequestBody Trainer trainer) {
        Trainer created = trainerService.createTrainer(trainer);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse<>(created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Trainer>> updateTrainer(@PathVariable String id, @RequestBody Trainer trainer) {
        return trainerService.updateTrainer(id, trainer)
                .map(updated -> ResponseEntity.ok(new ApiResponse<>(updated)))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Boolean>> deleteTrainer(@PathVariable String id) {
        boolean deleted = trainerService.deleteTrainer(id);
        if (deleted) {
            return ResponseEntity.ok(new ApiResponse<>(true));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
