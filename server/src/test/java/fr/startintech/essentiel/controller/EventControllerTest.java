package fr.startintech.essentiel.controller;

import fr.startintech.essentiel.data.model.Event;
import fr.startintech.essentiel.data.repository.EventRepository;
import fr.startintech.essentiel.utils.JsonUtils;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.apache.commons.lang3.RandomStringUtils.randomAlphabetic;
import static org.apache.commons.lang3.RandomStringUtils.randomNumeric;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class EventControllerTest {
    @Autowired // Inject MockMvc
    private MockMvc mvc;

    @Autowired // Inject repository
    private EventRepository repository;

    private static final String API_ROOT = "/api/event";

    /**
     * After each test, clear data
     */
    @AfterEach
    public void resetDb() {
        repository.deleteAll();
    }

    /**
     * Check if we can get created Event when getting all Events
     * @throws Exception
     */
    @Test
    public void givenEvents_whenGetEvents_thenStatus200() throws Exception {
        String eventName = randomAlphabetic(10);
        Event event = new Event();
        event.setName(eventName);
        repository.save(event);
        mvc.perform(get("/api/event")
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content()
                        .contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].name", is(eventName)));
    }

    /**
     * Check if get all events works
     * @throws Exception
     */
    @Test
    public void whenGetAllEvents_thenOK() throws Exception {
        final Event eventTest1 = createTestEvent();
        final Event eventTest2 = createTestEvent();
        mvc.perform(get(API_ROOT).contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("*", hasSize(greaterThanOrEqualTo(2))))
                .andExpect(jsonPath("$[0].name", is(eventTest1.getName())))
                .andExpect(jsonPath("$[1].name", is(eventTest2.getName())));
    }

    /**
     * Check if get an event by name works
     * @throws Exception
     */
    @Test
    public void whenGetEventsByName_thenOK() throws Exception {
        final Event eventTest = createTestEvent();
        mvc.perform(get(API_ROOT + "/name/" + eventTest.getName()))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("*", hasSize(greaterThan(0))));
    }


    /**
     * Check if get an event by id works
     * @throws Exception
     */
    @Test
    public void whenGetCreatedEventById_thenOK() throws Exception {
        final Event eventTest = createTestEvent();
        mvc.perform(get(API_ROOT + "/" + eventTest.getId()))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("*", hasSize(greaterThan(0))))
                .andExpect(jsonPath("$.name", is(eventTest.getName())));
    }

    /**
     * Check that get not existing Event return 404 code
     * @throws Exception
     */
    @Test
    public void whenGetNotExistEventById_thenNotFound() throws Exception {
        mvc.perform(get(API_ROOT + "/" + randomNumeric(4)))
                .andExpect(status().isNotFound());
    }

    /**
     * Check that when creating Event return CREATED code
     * @throws Exception
     */
    // POST
    @Test
    public void whenCreateNewEvent_thenCreated() throws Exception {
        Event eventToCreate = new Event();
        eventToCreate.setName(randomAlphabetic(10));
        mvc.perform(post(API_ROOT).contentType(MediaType.APPLICATION_JSON).content(JsonUtils.toJson(eventToCreate)))
                .andExpect(status().isCreated());
    }

    /**
     * Check that when creating invalid Event return 400 code
     * @throws Exception
     */
    @Test
    public void whenInvalidEvent_thenError() throws Exception {
        Event eventToCreate = new Event();
        eventToCreate.setName(null);
        mvc.perform(post(API_ROOT).contentType(MediaType.APPLICATION_JSON).content(JsonUtils.toJson(eventToCreate)))
                .andExpect(status().isBadRequest());
    }

    /**
     * Check if updating Event works
     * @throws Exception
     */
    @Test
    public void whenUpdateCreatedEvent_thenUpdated() throws Exception {
        final Event eventTest = createTestEvent();
        eventTest.setName(randomAlphabetic(10));
        mvc.perform(put(API_ROOT + "/" + eventTest.getId()).contentType(MediaType.APPLICATION_JSON).content(JsonUtils.toJson(eventTest)))
                .andExpect(status().isOk());
        mvc.perform(get(API_ROOT + "/" + eventTest.getId()))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("*", hasSize(greaterThan(0))))
                .andExpect(jsonPath("$.name", is(eventTest.getName())));
    }

    /**
     * Check if deleting Event works
     * @throws Exception
     */
    @Test
    public void whenDeleteCreatedEvent_thenOk() throws Exception {
        final Event eventTest = createTestEvent();
        mvc.perform(delete(API_ROOT + "/" + eventTest.getId()))
                .andExpect(status().isOk());
        mvc.perform(get(API_ROOT + "/" + eventTest.getId()))
                .andExpect(status().isNotFound());
    }

    /**
     * Generate a Event with a random name
     * @return Event created
     */
    private Event createTestEvent() {
        Event event = new Event();
        event.setName(randomAlphabetic(20));
        repository.save(event);
        return repository.findByName(event.getName());
    }
}