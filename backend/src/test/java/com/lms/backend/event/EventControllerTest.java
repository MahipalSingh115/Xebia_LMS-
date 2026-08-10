package com.lms.backend.event;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lms.backend.exception.BadRequestException;
import com.lms.backend.exception.GlobalExceptionHandler;
import com.lms.backend.exception.ResourceAlreadyExistsException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import org.springframework.mock.web.MockMultipartFile;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SuppressWarnings("null")
public class EventControllerTest {

    private MockMvc mockMvc;

    @Mock
    private EventService eventService;

    @InjectMocks
    private EventController eventController;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(eventController)
                .setControllerAdvice(new GlobalExceptionHandler())
                .build();
    }

    @Test
    public void testCreateEvent_Success() throws Exception {
        Event event = new Event();
        event.setTitle("Test Event");
        event.setDescription("Test Description");

        Event created = new Event();
        created.setId("e_1");
        created.setTitle("Test Event");
        created.setDescription("Test Description");

        when(eventService.createEvent(any(Event.class))).thenReturn(created);

        mockMvc.perform(post("/api/events")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(event)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.id").value("e_1"))
                .andExpect(jsonPath("$.data.title").value("Test Event"));
    }

    @Test
    public void testGetEvents_Paginated() throws Exception {
        Event event = new Event();
        event.setId("e_1");
        event.setTitle("Test Event");

        Page<Event> page = new PageImpl<>(Collections.singletonList(event), org.springframework.data.domain.PageRequest.of(0, 10), 1);
        when(eventService.getEventsPaginated(any(Pageable.class))).thenReturn(page);

        mockMvc.perform(get("/api/events")
                        .param("page", "0")
                        .param("size", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.content[0].id").value("e_1"));
    }

    @Test
    public void testRegisterStudent_Success() throws Exception {
        EventRegistration reg = new EventRegistration();
        reg.setId("er_1");
        reg.setEventId("e_1");
        reg.setStudentId("s4");

        when(eventService.registerStudent(eq("e_1"), eq("s4"))).thenReturn(reg);

        Map<String, String> body = new HashMap<>();
        body.put("studentId", "s4");

        mockMvc.perform(post("/api/events/e_1/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(body)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.id").value("er_1"))
                .andExpect(jsonPath("$.data.studentId").value("s4"));
    }

    @Test
    public void testRegisterStudent_DuplicateRegistration() throws Exception {
        when(eventService.registerStudent(eq("e_1"), eq("s4")))
                .thenThrow(new ResourceAlreadyExistsException("Student is already registered for this event"));

        Map<String, String> body = new HashMap<>();
        body.put("studentId", "s4");

        mockMvc.perform(post("/api/events/e_1/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(body)))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.message").value("Student is already registered for this event"));
    }

    @Test
    public void testRegisterStudent_PastDeadline() throws Exception {
        when(eventService.registerStudent(eq("e_1"), eq("s4")))
                .thenThrow(new BadRequestException("Registration deadline has passed"));

        Map<String, String> body = new HashMap<>();
        body.put("studentId", "s4");

        mockMvc.perform(post("/api/events/e_1/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(body)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Registration deadline has passed"));
    }

    @Test
    public void testUploadImage_Success() throws Exception {
        MockMultipartFile file = new MockMultipartFile(
                "file", "banner.png", "image/png", "some image content".getBytes()
        );

        mockMvc.perform(multipart("/api/events/upload-image").file(file))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.url").value(org.hamcrest.Matchers.startsWith("/uploads/")));
    }

    @Test
    public void testUploadImage_OversizedFile() throws Exception {
        byte[] largeContent = new byte[5 * 1024 * 1024 + 100];
        MockMultipartFile file = new MockMultipartFile(
                "file", "large.png", "image/png", largeContent
        );

        mockMvc.perform(multipart("/api/events/upload-image").file(file))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("File size exceeds the 5MB limit"));
    }

    @Test
    public void testUploadImage_InvalidType() throws Exception {
        MockMultipartFile file = new MockMultipartFile(
                "file", "doc.txt", "text/plain", "hello".getBytes()
        );

        mockMvc.perform(multipart("/api/events/upload-image").file(file))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Only JPEG, PNG, GIF, and WEBP image files are allowed"));
    }
}
