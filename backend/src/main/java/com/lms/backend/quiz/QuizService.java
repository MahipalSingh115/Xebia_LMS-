package com.lms.backend.quiz;

import com.lms.backend.quiz.dto.QuizSubmitRequest;
import com.lms.backend.quiz.dto.QuizStatsDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;
import com.lms.backend.student.Student;
import com.lms.backend.student.StudentRepository;

@Service
@SuppressWarnings("null")
public class QuizService {

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private QuizAttemptRepository quizAttemptRepository;

    @Autowired
    private StudentRepository studentRepository;

    @PostConstruct
    public void seedInitialData() {
        // Seeding disabled to clean up dummy data
    }

    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }

    public Optional<Quiz> getQuizById(String id) {
        return quizRepository.findById(id);
    }

    private void validateQuiz(Quiz quiz) {
        if (quiz.getName() == null || quiz.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Quiz Name is required.");
        }
        if ("Published".equalsIgnoreCase(quiz.getStatus())) {
            if (quiz.getQuestions() == null || quiz.getQuestions().isEmpty()) {
                throw new IllegalArgumentException("Cannot publish a quiz with no questions.");
            }
            for (int i = 0; i < quiz.getQuestions().size(); i++) {
                QuizQuestion q = quiz.getQuestions().get(i);
                if (q.getQuestion() == null || q.getQuestion().trim().isEmpty() ||
                    q.getOptionA() == null || q.getOptionA().trim().isEmpty() ||
                    q.getOptionB() == null || q.getOptionB().trim().isEmpty() ||
                    q.getOptionC() == null || q.getOptionC().trim().isEmpty() ||
                    q.getOptionD() == null || q.getOptionD().trim().isEmpty() ||
                    q.getCorrectAnswer() == null || q.getCorrectAnswer().trim().isEmpty()) {
                    throw new IllegalArgumentException("Please complete all fields for Question #" + (i + 1));
                }
            }
        }
    }

    public Quiz createQuiz(Quiz quiz) {
        if (quiz.getId() == null || quiz.getId().trim().isEmpty()) {
            quiz.setId("quiz-" + System.currentTimeMillis());
        }
        if (quiz.getStatus() == null || quiz.getStatus().trim().isEmpty()) {
            quiz.setStatus("Draft");
        }
        validateQuiz(quiz);
        quiz.setCreatedDate(LocalDate.now().format(DateTimeFormatter.ofPattern("MMM d, yyyy")));
        quiz.setQuestionsCount(quiz.getQuestions() != null ? quiz.getQuestions().size() : 0);
        return quizRepository.save(quiz);
    }

    public Optional<Quiz> updateQuiz(String id, Quiz updatedQuiz) {
        return quizRepository.findById(id).map(existing -> {
            if (updatedQuiz.getName() != null) existing.setName(updatedQuiz.getName());
            if (updatedQuiz.getDescription() != null) existing.setDescription(updatedQuiz.getDescription());
            if (updatedQuiz.getCourseId() != null) existing.setCourseId(updatedQuiz.getCourseId());
            if (updatedQuiz.getCourse() != null) existing.setCourse(updatedQuiz.getCourse());
            if (updatedQuiz.getModule() != null) existing.setModule(updatedQuiz.getModule());
            if (updatedQuiz.getSubmodule() != null) existing.setSubmodule(updatedQuiz.getSubmodule());
            if (updatedQuiz.getBatch() != null) existing.setBatch(updatedQuiz.getBatch());
            if (updatedQuiz.getScope() != null) existing.setScope(updatedQuiz.getScope());
            if (updatedQuiz.getDuration() != null) existing.setDuration(updatedQuiz.getDuration());
            if (updatedQuiz.getPassingMarks() != null) existing.setPassingMarks(updatedQuiz.getPassingMarks());
            if (updatedQuiz.getStatus() != null) existing.setStatus(updatedQuiz.getStatus());
            if (updatedQuiz.getQuestions() != null) {
                existing.setQuestions(updatedQuiz.getQuestions());
            }
            validateQuiz(existing);
            return quizRepository.save(existing);
        });
    }

    public boolean deleteQuiz(String id) {
        if (quizRepository.existsById(id)) {
            quizRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<QuizAttempt> getQuizResults(String quizId) {
        return quizAttemptRepository.findByQuizId(quizId);
    }

    public Optional<QuizAttempt> getStudentResultForQuiz(String quizId, String studentId) {
        return quizAttemptRepository.findByQuizIdAndStudentId(quizId, studentId);
    }

    public QuizAttempt submitQuizAttempt(String quizId, QuizSubmitRequest request) {
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new IllegalArgumentException("Quiz not found with ID: " + quizId));

        // Evaluate answers
        List<QuizAttemptAnswer> attemptAnswers = new ArrayList<>();
        int correctCount = 0;

        for (QuizQuestion q : quiz.getQuestions()) {
            // Find student's answer for this question
            String studentAnswer = request.getAnswers().stream()
                    .filter(ans -> ans.getQuestion().trim().equalsIgnoreCase(q.getQuestion().trim()))
                    .map(QuizSubmitRequest.AnswerSubmission::getStudentAnswer)
                    .findFirst()
                    .orElse("");

            boolean isCorrect = studentAnswer.trim().equalsIgnoreCase(q.getCorrectAnswer().trim());
            if (isCorrect) {
                correctCount++;
            }

            attemptAnswers.add(new QuizAttemptAnswer(q.getQuestion(), studentAnswer, q.getCorrectAnswer()));
        }

        int percentage = quiz.getQuestions().isEmpty() ? 0 : (int) Math.round(((double) correctCount / quiz.getQuestions().size()) * 100);
        String verdict = correctCount >= quiz.getPassingMarks() ? "Pass" : "Fail";

        // Remove existing attempts by the same student on this quiz to simulate a retake/single active attempt
        quizAttemptRepository.findByQuizIdAndStudentId(quizId, request.getStudentId())
                .ifPresent(existing -> quizAttemptRepository.delete(existing));

        QuizAttempt attempt = new QuizAttempt();
        attempt.setId("attempt_" + System.currentTimeMillis());
        attempt.setQuizId(quizId);
        attempt.setStudentId(request.getStudentId());
        attempt.setStudentName(request.getStudentName() != null ? request.getStudentName() : "Jane Doe");
        attempt.setCourse(quiz.getCourse());
        attempt.setBatch(quiz.getBatch() != null ? quiz.getBatch() : "B-2024-Q1");
        attempt.setScore(correctCount);
        attempt.setPercentage(percentage);
        attempt.setAttemptDate(LocalDate.now().format(DateTimeFormatter.ofPattern("MMM d, yyyy")));
        attempt.setTimeTaken(request.getTimeTaken() != null ? request.getTimeTaken() : "1 mins");
        attempt.setStatus(verdict);
        attempt.setAnswers(attemptAnswers);

        return quizAttemptRepository.save(attempt);
    }

    public QuizStatsDto getQuizStats() {
        List<Quiz> quizzes = quizRepository.findAll();
        List<QuizAttempt> attempts = quizAttemptRepository.findAll();

        long total = quizzes.size();
        long published = quizzes.stream().filter(q -> "Published".equalsIgnoreCase(q.getStatus())).count();
        long drafts = quizzes.stream().filter(q -> "Draft".equalsIgnoreCase(q.getStatus())).count();
        long imported = quizzes.stream().filter(q -> "Draft".equalsIgnoreCase(q.getStatus()) && q.getQuestionsCount() > 0).count();

        String avgScorePercent = "78%";
        if (!attempts.isEmpty()) {
            double sum = attempts.stream().mapToDouble(QuizAttempt::getPercentage).sum();
            avgScorePercent = Math.round(sum / attempts.size()) + "%";
        }

        return new QuizStatsDto(total, published, drafts, imported, avgScorePercent);
    }

    public List<Quiz> getQuizzesForStudent(String studentId) {
        Optional<Student> studentOpt = studentRepository.findById(studentId);
        if (!studentOpt.isPresent()) {
            return Collections.emptyList();
        }
        
        Student student = studentOpt.get();
        List<Quiz> allQuizzes = quizRepository.findAll();
        
        List<Quiz> filtered = allQuizzes.stream()
                .filter(quiz -> {
                    // Check status is Published
                    if (!"Published".equalsIgnoreCase(quiz.getStatus())) {
                        return false;
                    }

                    String scope = quiz.getScope();
                    if (scope == null || scope.trim().isEmpty() || scope.equalsIgnoreCase("Entire Course")) {
                        return true;
                    }
                    
                    String batchField = quiz.getBatch();
                    if (batchField == null || batchField.trim().isEmpty()) {
                        return false;
                    }
                    
                    List<String> items = Arrays.stream(batchField.split(","))
                            .map(String::trim)
                            .collect(Collectors.toList());
                    
                    if (scope.equalsIgnoreCase("Specific Batches")) {
                        return items.stream().anyMatch(b -> b.equalsIgnoreCase(student.getBatch()));
                    } else if (scope.equalsIgnoreCase("Individual Students")) {
                        return items.stream().anyMatch(name -> name.equalsIgnoreCase(student.getName()));
                    }
                    
                    return false;
                })
                .collect(Collectors.toList());

        for (Quiz q : filtered) {
            Optional<QuizAttempt> attemptOpt = quizAttemptRepository.findByQuizIdAndStudentId(q.getId(), studentId);
            if (attemptOpt.isPresent()) {
                QuizAttempt attempt = attemptOpt.get();
                q.setAttemptStatus("Completed");
                q.setScore(attempt.getScore());
                q.setPercentage(attempt.getPercentage());
                q.setVerdict(attempt.getStatus());
                q.setAttemptDate(attempt.getAttemptDate());
            } else {
                q.setAttemptStatus("Pending");
                q.setScore(null);
                q.setPercentage(0);
                q.setVerdict(null);
                q.setAttemptDate(null);
            }
        }

        return filtered;
    }

    public org.springframework.data.domain.Page<Quiz> getQuizzesForStudentPaginated(String studentId, String query, String status, org.springframework.data.domain.Pageable pageable) {
        List<Quiz> list = getQuizzesForStudent(studentId);
        if (query != null && !query.trim().isEmpty()) {
            String qLower = query.trim().toLowerCase();
            list = list.stream().filter(q -> 
                (q.getName() != null && q.getName().toLowerCase().contains(qLower)) ||
                (q.getCourse() != null && q.getCourse().toLowerCase().contains(qLower))
            ).collect(Collectors.toList());
        }
        if (status != null && !"All".equalsIgnoreCase(status)) {
            list = list.stream().filter(q -> {
                String attStatus = q.getAttemptStatus(); // Completed or Pending
                if ("Pending".equalsIgnoreCase(status)) {
                    return "Pending".equalsIgnoreCase(attStatus);
                } else if ("Completed".equalsIgnoreCase(status) || "Reviewed".equalsIgnoreCase(status)) {
                    return "Completed".equalsIgnoreCase(attStatus);
                }
                return true;
            }).collect(Collectors.toList());
        }
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), list.size());
        List<Quiz> subList = (start <= end && start < list.size()) ? list.subList(start, end) : Collections.emptyList();
        return new org.springframework.data.domain.PageImpl<>(subList, pageable, list.size());
    }
}
