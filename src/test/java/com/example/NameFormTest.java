package com.example;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.nio.file.Path;
import java.time.Duration;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class NameFormTest {

    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeEach
    void setUp() {
        WebDriverManager.chromedriver().setup();

        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless=new");
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-dev-shm-usage");
        options.addArguments("--disable-gpu");
        options.addArguments("--remote-debugging-port=0");

        // Attempt to locate Chromium/Chrome binary across common paths
        String[] candidateBinaries = new String[] {
                "/usr/bin/google-chrome",
                "/usr/bin/google-chrome-stable",
                "/usr/bin/chromium",
                "/usr/bin/chromium-browser"
        };
        for (String candidate : candidateBinaries) {
            if (java.nio.file.Files.isExecutable(java.nio.file.Path.of(candidate))) {
                options.setBinary(candidate);
                break;
            }
        }

        try {
            java.nio.file.Path tempProfile = java.nio.file.Files.createTempDirectory("chrome-user-data-");
            options.addArguments("--user-data-dir=" + tempProfile.toAbsolutePath());
        } catch (java.io.IOException ignored) {
            // If temp dir creation fails, continue without explicit user-data-dir
        }

        driver = new ChromeDriver(options);
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        driver.manage().window().setSize(new org.openqa.selenium.Dimension(1280, 800));
    }

    @AfterEach
    void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

    @Test
    void enterFirstAndLastNameAndClickNext() {
        Path page = Path.of("src", "test", "resources", "name-form.html");
        driver.get(page.toFile().toURI().toString());

        String randomFirstName = "First-" + UUID.randomUUID().toString().substring(0, 8);
        String randomLastName = "Last-" + UUID.randomUUID().toString().substring(0, 8);

        WebElement firstNameInput = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("firstName")));
        WebElement lastNameInput = driver.findElement(By.id("lastName"));
        WebElement nextButton = driver.findElement(By.id("nextButton"));

        firstNameInput.clear();
        firstNameInput.sendKeys(randomFirstName);

        lastNameInput.clear();
        lastNameInput.sendKeys(randomLastName);

        assertEquals(randomFirstName, firstNameInput.getAttribute("value"));
        assertEquals(randomLastName, lastNameInput.getAttribute("value"));

        nextButton.click();

        WebElement status = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("status")));
        assertTrue(status.getText().contains("Next clicked"));
        assertTrue(status.getText().contains(randomFirstName));
        assertTrue(status.getText().contains(randomLastName));
    }
}

