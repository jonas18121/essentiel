package fr.startintech.essentiel.controller;

import fr.startintech.essentiel.data.model.Structure;
import fr.startintech.essentiel.data.repository.StructureRepository;
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
class StructureControllerTest {
    @Autowired // Inject MockMvc
    private MockMvc mvc;

    @Autowired // Inject repository
    private StructureRepository repository;

    private static final String API_ROOT = "/api/structure";

    /**
     * After each test, clear data
     */
    @AfterEach
    public void resetDb() {
        repository.deleteAll();
    }

    /**
     * Check if we can get created Structure when getting all Structures
     * @throws Exception
     */
    @Test
    public void givenStructures_whenGetStructures_thenStatus200() throws Exception {
        String structureName = randomAlphabetic(10);
        Structure structure = new Structure();
        structure.setName(structureName);
        repository.save(structure);
        mvc.perform(get("/api/structure")
                .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content()
                        .contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].name", is(structureName)));
    }

    /**
     * Check if get all structures works
     * @throws Exception
     */
    @Test
    public void whenGetAllStructures_thenOK() throws Exception {
        final Structure structureTest1 = createTestStructure();
        final Structure structureTest2 = createTestStructure();
        mvc.perform(get(API_ROOT).contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("*", hasSize(greaterThanOrEqualTo(2))))
                .andExpect(jsonPath("$[0].name", is(structureTest1.getName())))
                .andExpect(jsonPath("$[1].name", is(structureTest2.getName())));
    }

    /**
     * Check if get an structure by name works
     * @throws Exception
     */
    @Test
    public void whenGetStructuresByName_thenOK() throws Exception {
        final Structure structureTest = createTestStructure();
        mvc.perform(get(API_ROOT + "/name/" + structureTest.getName()))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("*", hasSize(greaterThan(0))));
    }


    /**
     * Check if get an structure by id works
     * @throws Exception
     */
    @Test
    public void whenGetCreatedStructureById_thenOK() throws Exception {
        final Structure structureTest = createTestStructure();
        mvc.perform(get(API_ROOT + "/" + structureTest.getId()))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("*", hasSize(greaterThan(0))))
                .andExpect(jsonPath("$.name", is(structureTest.getName())));
    }

    /**
     * Check that get not existing Structure return 404 code
     * @throws Exception
     */
    @Test
    public void whenGetNotExistStructureById_thenNotFound() throws Exception {
        mvc.perform(get(API_ROOT + "/" + randomNumeric(4)))
                .andExpect(status().isNotFound());
    }

    /**
     * Check that when creating Structure return CREATED code
     * @throws Exception
     */
    // POST
    @Test
    public void whenCreateNewStructure_thenCreated() throws Exception {
        Structure structureToCreate = new Structure();
        structureToCreate.setName(randomAlphabetic(10));
        mvc.perform(post(API_ROOT).contentType(MediaType.APPLICATION_JSON).content(JsonUtils.toJson(structureToCreate)))
                .andExpect(status().isCreated());
    }

    /**
     * Check that when creating invalid Structure return 400 code
     * @throws Exception
     */
    @Test
    public void whenInvalidStructure_thenError() throws Exception {
        Structure structureToCreate = new Structure();
        structureToCreate.setName(null);
        mvc.perform(post(API_ROOT).contentType(MediaType.APPLICATION_JSON).content(JsonUtils.toJson(structureToCreate)))
                .andExpect(status().isBadRequest());
    }

    /**
     * Check if updating Structure works
     * @throws Exception
     */
    @Test
    public void whenUpdateCreatedStructure_thenUpdated() throws Exception {
        final Structure structureTest = createTestStructure();
        structureTest.setName(randomAlphabetic(10));
        mvc.perform(put(API_ROOT + "/" + structureTest.getId()).contentType(MediaType.APPLICATION_JSON).content(JsonUtils.toJson(structureTest)))
                .andExpect(status().isOk());
        mvc.perform(get(API_ROOT + "/" + structureTest.getId()))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("*", hasSize(greaterThan(0))))
                .andExpect(jsonPath("$.name", is(structureTest.getName())));
    }

    /**
     * Check if deleting Structure works
     * @throws Exception
     */
    @Test
    public void whenDeleteCreatedStructure_thenOk() throws Exception {
        final Structure structureTest = createTestStructure();
        mvc.perform(delete(API_ROOT + "/" + structureTest.getId()))
                .andExpect(status().isOk());
        mvc.perform(get(API_ROOT + "/" + structureTest.getId()))
                .andExpect(status().isNotFound());
    }

    /**
     * Generate a Structure with a random name
     * @return Structure created
     */
    private Structure createTestStructure() {
        Structure structure = new Structure();
        structure.setName(randomAlphabetic(20));
        repository.save(structure);
        return repository.findByName(structure.getName());
    }
}