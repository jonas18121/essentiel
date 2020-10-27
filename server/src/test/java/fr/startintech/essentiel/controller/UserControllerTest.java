package fr.startintech.essentiel.controller;

import fr.startintech.essentiel.data.model.User;
import fr.startintech.essentiel.data.repository.UserRepository;
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
class UserControllerTest {
    @Autowired // Inject MockMvc
    private MockMvc mvc;

    @Autowired // Inject repository
    private UserRepository repository;

    private static final String API_ROOT = "/api/user";

    /**
     * After each test, clear data
     */
    @AfterEach
    public void resetDb() {
        repository.deleteAll();
    }

    /**
     * Check if we can get created User when getting all Users
     * @throws Exception
     */
    @Test
    public void givenUsers_whenGetUsers_thenStatus200() throws Exception {
        String userEmail = randomAlphabetic(10);
        User user = new User();
        user.setEmail(userEmail);
        repository.save(user);
        mvc.perform(get("/api/user")
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content()
                        .contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].email", is(userEmail)));
    }

    /**
     * Check if get all users works
     * @throws Exception
     */
    @Test
    public void whenGetAllUsers_thenOK() throws Exception {
        final User userTest1 = createTestUser();
        final User userTest2 = createTestUser();
        mvc.perform(get(API_ROOT).contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("*", hasSize(greaterThanOrEqualTo(2))))
                .andExpect(jsonPath("$[0].email", is(userTest1.getEmail())))
                .andExpect(jsonPath("$[1].email", is(userTest2.getEmail())));
    }

    /**
     * Check if get an user by email works
     * @throws Exception
     */
    @Test
    public void whenGetUsersByEmail_thenOK() throws Exception {
        final User userTest = createTestUser();
        mvc.perform(get(API_ROOT + "/email/" + userTest.getEmail()))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("*", hasSize(greaterThan(0))));
    }


    /**
     * Check if get an user by id works
     * @throws Exception
     */
    @Test
    public void whenGetCreatedUserById_thenOK() throws Exception {
        final User userTest = createTestUser();
        mvc.perform(get(API_ROOT + "/" + userTest.getId()))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("*", hasSize(greaterThan(0))))
                .andExpect(jsonPath("$.email", is(userTest.getEmail())));
    }

    /**
     * Check that get not existing User return 404 code
     * @throws Exception
     */
    @Test
    public void whenGetNotExistUserById_thenNotFound() throws Exception {
        mvc.perform(get(API_ROOT + "/" + randomNumeric(4)))
                .andExpect(status().isNotFound());
    }

    /**
     * Check that when creating User return CREATED code
     * @throws Exception
     */
    // POST
    @Test
    public void whenCreateNewUser_thenCreated() throws Exception {
        User userToCreate = new User();
        userToCreate.setEmail(randomAlphabetic(10));
        mvc.perform(post(API_ROOT).contentType(MediaType.APPLICATION_JSON).content(JsonUtils.toJson(userToCreate)))
                .andExpect(status().isCreated());
    }

    /**
     * Check that when creating invalid User return 400 code
     * @throws Exception
     */
    @Test
    public void whenInvalidUser_thenError() throws Exception {
        User userToCreate = new User();
        userToCreate.setEmail(null);
        mvc.perform(post(API_ROOT).contentType(MediaType.APPLICATION_JSON).content(JsonUtils.toJson(userToCreate)))
                .andExpect(status().isBadRequest());
    }

    /**
     * Check if updating User works
     * @throws Exception
     */
    @Test
    public void whenUpdateCreatedUser_thenUpdated() throws Exception {
        final User userTest = createTestUser();
        userTest.setEmail(randomAlphabetic(10));
        mvc.perform(put(API_ROOT + "/" + userTest.getId()).contentType(MediaType.APPLICATION_JSON).content(JsonUtils.toJson(userTest)))
                .andExpect(status().isOk());
        mvc.perform(get(API_ROOT + "/" + userTest.getId()))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("*", hasSize(greaterThan(0))))
                .andExpect(jsonPath("$.email", is(userTest.getEmail())));
    }

    /**
     * Check if deleting User works
     * @throws Exception
     */
    @Test
    public void whenDeleteCreatedUser_thenOk() throws Exception {
        final User userTest = createTestUser();
        mvc.perform(delete(API_ROOT + "/" + userTest.getId()))
                .andExpect(status().isOk());
        mvc.perform(get(API_ROOT + "/" + userTest.getId()))
                .andExpect(status().isNotFound());
    }

    /**
     * Generate a User with a random email
     * @return User created
     */
    private User createTestUser() {
        User user = new User();
        user.setEmail(randomAlphabetic(20));
        repository.save(user);
        return repository.findByEmail(user.getEmail());
    }
}